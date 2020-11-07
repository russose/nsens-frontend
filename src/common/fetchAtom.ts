import { CONFIG_FETCHING, USER_DISPLAY, USER_GUI_CONFIG } from "./config";
import { IAtom, newAtom, empty_value_atom, AtomID } from "./types";
import { fetch_data, fetch_data_wikidata } from "./fetch";

const path_empty_image = USER_DISPLAY.paths.item_empty_image;
const wikidata_language = USER_GUI_CONFIG.USER_WIKIDATA_LANG;
const nb_images = CONFIG_FETCHING.amount_data_fetched_images;
const max_size_api = CONFIG_FETCHING.max_size_api;

function chunk(array: any[], size: number) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

function buildListStringSeparated(array: string[]): string {
  let list_of_string = "";
  Object.values(array).forEach((item: string) => {
    if (item !== undefined) {
      list_of_string = list_of_string + item + "|";
    }
  });
  if (list_of_string === "") {
    return "";
  } else {
    list_of_string = list_of_string.slice(0, -1);
  }
  return list_of_string;
}

export async function getItemsFromWikidata(
  itemId: string,
  ROOT_URL: string
  // nb_images: number
): Promise<IAtom[]> {
  //
  async function ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipediaParallel(
    list_of_PageTitle_string: string[]
  ): Promise<IAtom[][]> {
    const myBigPromise = await Promise.all(
      list_of_PageTitle_string.map((PageTitle_string: string) => {
        return ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia(
          PageTitle_string,
          ROOT_URL,
          -1,
          "titles"
        );
      })
    );
    return myBigPromise;
  }

  if (itemId === undefined) {
    return [];
  }

  const sparqlQuery = `SELECT ?propLabel ?EntityLabel ?Entity (count (*) as ?EntityClasseLabel) WHERE {
  
    BIND(wd:${itemId} AS ?var).
    
    #?var wdt:P31 ?Classe.
    ?var ?p ?Entity.
    ?Entity wdt:P31 ?EntityClasse.
    
    #To get Label of the prop
    ?prop wikibase:directClaim ?p.
      
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${wikidata_language}". }
  } group by ?propLabel ?EntityLabel ?Entity order by desc(?propLabel)`;

  const result = await fetch_data_wikidata(sparqlQuery);

  if (result === undefined) {
    return [];
  }

  const mapping_label = new Map<string, string>();
  const mapping_prop = new Map<string, string>();
  const mapping_label_prop = new Map<string, string>();

  Object.values(result).forEach((item: any) => {
    if (
      item["Entity"] !== undefined &&
      item["EntityLabel"] !== undefined &&
      item["propLabel"] !== undefined
    ) {
      const key_list = item["Entity"]["value"].split("/");
      const key = key_list[key_list.length - 1];
      const label = item["EntityLabel"]["value"];
      const prop = item["propLabel"]["value"];
      mapping_label.set(key, label);
      mapping_prop.set(key, prop);
      mapping_label_prop.set(label, prop);
    }
  });

  const mapping_label_chunked = chunk(
    Array.from(mapping_label.values()),
    max_size_api
  );
  const list_of_PageTitle_string = mapping_label_chunked.map(
    (PageTitle_string: string[]) => {
      return buildListStringSeparated(PageTitle_string);
    }
  );

  const items_chunked: IAtom[][] = await ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipediaParallel(
    list_of_PageTitle_string
  );
  let items_flat: IAtom[] = [].concat(...items_chunked);

  items_flat = items_flat.map((item: IAtom) => {
    const prop_from_id = mapping_prop.get(item["id"]);
    const prop_from_label = mapping_label_prop.get(item["title"]);
    let prop: string;
    if (prop_from_id !== undefined) {
      prop = prop_from_id;
    } else if (prop_from_label !== undefined) {
      prop = prop_from_label;
    } else {
      return undefined;
    }
    item["related"] = itemId + "|" + prop;
    return item;
  });

  items_flat = items_flat.filter((item) => {
    return item !== undefined;
  });

  return items_flat;
}

// export async function ItemsFromIdsCleanImagesFromWikipedia(
//   list_of_PageIds: AtomID[],
//   ROOT_URL: string
// ): Promise<IAtom[]> {
//   const list_of_Pages_string = buildListStringSeparated(list_of_PageIds);
//   const atomsList = await getAtomsFromWikipedia(list_of_Pages_string, ROOT_URL);
//   let atomsListWithImages = await enrichImagesBatchFromWikipediaEN(atomsList);
//   atomsListWithImages = removeBadImages(atomsListWithImages);
//   atomsListWithImages = await enrichImagesOneByOneFromWikiCommonPediaParallel(
//     atomsListWithImages,
//     CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_EN
//   );

//   return atomsListWithImages;
// }

export async function ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia(
  pattern_or_titles: string,
  ROOT_URL: string,
  nb_items: number, //can be any value for "titles" since not used
  mode: "search" | "random" | "titles"
): Promise<IAtom[]> {
  const list_of_PageIds = await idsFromSearchOrRandomOrTitlesFromWikipedia(
    pattern_or_titles,
    ROOT_URL,
    nb_items,
    mode
  );

  // const atomsListWithImages = ItemsFromIdsCleanImagesFromWikipedia(
  //   list_of_PageIds,
  //   ROOT_URL
  // );
  const list_of_Pages_string = buildListStringSeparated(list_of_PageIds);
  const atomsList = await getAtomsFromWikipedia(list_of_Pages_string, ROOT_URL);
  let atomsListWithImages = await enrichImagesBatchFromWikipediaEN(atomsList);
  atomsListWithImages = removeBadImages(atomsListWithImages);
  atomsListWithImages = await enrichImagesOneByOneFromWikiCommonPediaParallel(
    atomsListWithImages,
    CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_EN
  );

  return atomsListWithImages;
}

/**
 * Articles
 */

export async function fetchArticle(
  pattern: string,
  ROOT_URL: string
): Promise<string> {
  const PARAMS = {
    action: "query",
    format: "json",
    utf8: 1,
    titles: pattern,
    prop: "extracts",
  };
  const data = await fetch_data(ROOT_URL, PARAMS, false);

  if (data["query"] === undefined || data["query"]["pages"] === undefined) {
    return "No article";
  }

  let article: string = "";
  Object.values(data["query"]["pages"]).forEach((item: any) => {
    article = item["extract"];
  });

  if (article === undefined) {
    return "Article not found";
  } else {
    return article;
  }
}

/**
 * Get Items
 */

async function idsFromSearchOrRandomOrTitlesFromWikipedia(
  pattern_or_titles: string, //Not used for "random", can be any value
  ROOT_URL: string,
  nb_atoms: number, //Not used for "titles", can be any value
  mode: "search" | "random" | "titles"
): Promise<string[]> {
  let PARAMS;

  if (mode === "search") {
    PARAMS = {
      action: "query",
      format: "json",
      list: "search",
      utf8: 1,
      srenablerewrites: 1,
      srsearch: pattern_or_titles,
      srlimit: nb_atoms.toString(),
      srnamespace: "0",
      //srprop: "",
      //srnamespace: "4",
    };
  } else if (mode === "random") {
    PARAMS = {
      action: "query",
      format: "json",
      list: "random",
      utf8: 1,
      rnnamespace: "0",
      rnlimit: nb_atoms.toString(),
    };
  } else if (mode === "titles") {
    PARAMS = {
      action: "query",
      format: "json",
      titles: pattern_or_titles,
      utf8: 1,
    };
  } else {
    return undefined;
  }

  const data = await fetch_data(ROOT_URL, PARAMS, false);

  if (mode === "search") {
    if (data["query"] === undefined || data["query"]["search"] === undefined) {
      // return "";
      return [];
    }
  } else if (mode === "random") {
    if (data["query"] === undefined || data["query"]["random"] === undefined) {
      // return "";
      return [];
    }
  } else {
    //mode === "titles"
    if (data["query"] === undefined || data["query"]["pages"] === undefined) {
      // return "";
      return [];
    }
  }

  //Build api string (concatenated)
  let list_of_Pages_list: string[];
  if (mode === "search") {
    list_of_Pages_list = data["query"]["search"].map((item: any) => {
      if (item["pageid"] !== undefined) {
        return item["pageid"];
      } else {
        return undefined;
      }
    });
  } else if (mode === "random") {
    list_of_Pages_list = data["query"]["random"].map((item: any) => {
      if (item["id"] !== undefined) {
        return item["id"];
      } else {
        return undefined;
      }
    });
  } else {
    //mode === "titles"
    list_of_Pages_list = Object.values(data["query"]["pages"]).map(
      (item: any) => {
        if (item["pageid"] !== undefined) {
          return item["pageid"];
        } else {
          return undefined;
        }
      }
    );
  }

  return list_of_Pages_list;
}

async function getAtomsFromWikipedia(
  list_of_Pages_ids: string,
  ROOT_URL: string
  // nb_images: number
): Promise<IAtom[]> {
  //Get wp information from list of IDs (wikibase_item, image, thumbnail). Use English version with more image
  const PARAMS_2 = {
    action: "query",
    format: "json",
    prop: "pageprops|langlinks|pageimages|imageinfo",
    pageids: list_of_Pages_ids,
    utf8: 1,
    lllang: "en",
    lllimit: nb_images.toString(),
    //imlimit: (3 * nb_images).toString(),
    piprop: "original|thumbnail",
    pilicense: "free",
    iiprop: "url|size|mediatype|dimensions",
  };

  const data2 = await fetch_data(ROOT_URL, PARAMS_2, false);

  if (data2["query"] === undefined) {
    return [];
  }

  //Extract relevant information to keep
  const list_information_atoms: IAtom[] = [];
  Object.values(data2["query"]["pages"]).forEach((item: any) => {
    if (item["pageprops"] !== undefined) {
      const id = item["pageprops"]["wikibase_item"];
      const atom = newAtom(id);
      atom.wikibase_item = item["pageprops"]["wikibase_item"];
      atom.pageid_wp = item["pageid"];
      atom.title = item["title"];
      if (item["langlinks"] !== undefined) {
        atom.title_en = item["langlinks"][0]["*"];
      } else {
        //console.log("error in getting english title");
      }
      if (item["original"] !== undefined) {
        atom.image_url = item["original"]["source"];
        atom.image_height = item["original"]["height"];
        atom.image_width = item["original"]["width"];
      }
      if (item["thumbnail"] !== undefined) {
        atom.thumbnail_url = item["thumbnail"]["source"];
      }
      list_information_atoms.push(atom);
    }
  });

  return list_information_atoms;
}

/**
 * Images
 */

function removeBadImages(list_information_atoms: IAtom[]): IAtom[] {
  const list_information_atoms_updated: IAtom[] = [];
  list_information_atoms.forEach((item) => {
    const item_updated = item;
    if (
      item.image_url === empty_value_atom ||
      item.image_width > 2 * CONFIG_FETCHING.max_width_image ||
      !["jpg", "JPG", "png", "PNG", "tif", "TIF", "svg", "SVG"].includes(
        item.image_url.slice(-3)
      )
    ) {
      item_updated.image_url = path_empty_image;
    }
    list_information_atoms_updated.push(item_updated);
  });
  return list_information_atoms_updated;
}

async function enrichImagesBatchFromWikipediaEN(
  list_information_atoms: IAtom[]
): Promise<IAtom[]> {
  if (
    list_information_atoms === undefined ||
    list_information_atoms.length === 0
  ) {
    return list_information_atoms;
  }

  //Build que list of items without images (for querry)
  const list_of_title_en_string_list = list_information_atoms.map((item) => {
    if (
      item["title_en"] !== empty_value_atom &&
      (item["image_url"] === empty_value_atom ||
        item["image_width"] > CONFIG_FETCHING.max_width_image)
    ) {
      return item["title_en"];
    } else {
      return undefined;
    }
  });

  const list_of_title_en_string = buildListStringSeparated(
    list_of_title_en_string_list
  );
  if (list_of_title_en_string === "") {
    return list_information_atoms;
  }

  //Obtenir les images de Wikipedia EN
  const PARAMS = {
    action: "query",
    format: "json",
    prop: "pageimages",
    utf8: 1,
    titles: list_of_title_en_string,
    piprop: "original|thumbnail",
    pilicense: "free",
  };
  const data = await fetch_data(
    CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_EN,
    PARAMS,
    false
  );

  if (data["query"]["pages"] === undefined) {
    return list_information_atoms;
  }
  const atoms_where_image_found: IAtom[] = [];
  Object.values(data["query"]["pages"]).forEach((item: any) => {
    //Find the atom to update in list_information_atoms
    const atom = list_information_atoms.filter((atom) => {
      return atom.title_en === item["title"];
    })[0];

    if (atom !== undefined) {
      if (item["thumbnail"] !== undefined) {
        atom.thumbnail_url = item["thumbnail"]["source"];
      }
      if (item["original"] !== undefined) {
        atom.image_url = item["original"]["source"];
        atom.image_height = item["original"]["height"];
        atom.image_width = item["original"]["width"];
        atoms_where_image_found.push(atom);
        //console.log("image trouvé sur EN pour:", atom.title, atom.image_url);
      } else {
        //console.log("no image for:", item["title"]);
      }
    }
  });

  const list_information_atoms_updated = list_information_atoms.map((item) => {
    let item_updated = item;

    for (const item_image_completed of atoms_where_image_found) {
      if (item_image_completed.title_en === item.title_en) {
        item_updated = item_image_completed;
        break;
      }
    }
    return item_updated;
  });
  return list_information_atoms_updated;
}

async function enrichOneImageFromWikiCommonPedia(
  item: IAtom,
  ROOT_URL: string
): Promise<IAtom> {
  const item_updated = item;

  if (item.image_url !== path_empty_image) {
    return item;
  }

  //Obtenir les images de WikiCommon ou Wikipedia une par une (generator)
  const PARAMS = {
    action: "query",
    format: "json",
    prop: "pageimages|imageinfo",
    utf8: 1,
    titles: item.title_en, //+ "|Category:" + item.title_en,
    generator: "images",
    redirects: 1,
    piprop: "thumbnail",
    pilicense: "free",
    iiprop: "url|size|mediatype|dimensions",
    gimlimit: "5",
  };
  const data = await fetch_data(ROOT_URL, PARAMS, false);

  if (data["query"] !== undefined) {
    //https://commons.wikimedia.org/w/api.php?origin=*&action=query&format=json&prop=pageimages%7Cimageinfo&utf8=1&titles=proton&generator=images&redirects=1&piprop=thumbnail&pilicense=free&iiprop=url%7Csize%7Cmediatype%7Cdimensions&gimlimit=20

    const images: any[] = Object.values(data["query"]["pages"]);

    for (const image of images) {
      if (image["imageinfo"] !== undefined) {
        const imageinfo = image["imageinfo"][0];

        if (
          imageinfo["width"] < CONFIG_FETCHING.max_width_image &&
          imageinfo["width"] > CONFIG_FETCHING.min_width_image &&
          imageinfo["size"] < 700000 && //500ko
          imageinfo["mediatype"] === "BITMAP"
        ) {
          item_updated.image_url = imageinfo["url"];
          item_updated.image_height = imageinfo["height"];
          item_updated.image_width = imageinfo["width"];
          //item.image_type = imageinfo["mediatype"];

          item_updated.thumbnail_url = image["thumbnail"]["source"];

          //console.log("image trouvée par générateur pour:", item.title);

          break;
        }
      }
    }
  }

  return item_updated;
}

async function enrichImagesOneByOneFromWikiCommonPediaParallel(
  list_information_atoms: IAtom[],
  ROOT_URL: string
): Promise<IAtom[]> {
  if (list_information_atoms.length === 0) {
    return list_information_atoms;
  }

  const myBigPromise = await Promise.all(
    list_information_atoms.map((item: IAtom) => {
      return enrichOneImageFromWikiCommonPedia(item, ROOT_URL);
    })
  );

  return myBigPromise;
}
