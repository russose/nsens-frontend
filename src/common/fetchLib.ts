import { CONFIG_FETCHING } from "./config";
import { IAtom, newAtom, empty_value_atom } from "./types";
import { fetchRelatedWikipedia, fetch_data } from "./fetch";

const amount_data_fetched_images = CONFIG_FETCHING.amount_data_fetched_images;

export function my_sparqlQuery_related_old(
  itemId: string,
  wikidata_language: string
): string {
  return `SELECT ?propLabel ?EntityLabel ?Entity (count (*) as ?EntityClasseLabel) WHERE {

    BIND(wd:${itemId} AS ?var).

    #?var wdt:P31 ?Classe.
    ?var ?p ?Entity.
    ?Entity wdt:P31 ?EntityClasse.

    #To get Label of the prop
    ?prop wikibase:directClaim ?p.

    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${wikidata_language}". }
  } group by ?propLabel ?EntityLabel ?Entity order by desc(?propLabel)`;
}

export function my_sparqlQuery_related(
  itemId: string,
  wikidata_language: string
): string {
  const sparqlQuery: string = `SELECT ?var ?propLabel ?Entity ?EntityLabel (count (*) as ?EntityClasseLabel) WHERE {
  
    BIND(wd:${itemId} AS ?var).
    
    #?var wdt:P31 ?Classe.
    ?var ?p ?Entity.
    ?Entity wdt:P31 ?EntityClasse.
    
    #To get Label of the prop
    ?prop wikibase:directClaim ?p.
    
    ?Entity rdfs:label ?EntityLabel
    FILTER (LANG(?EntityLabel) = "${wikidata_language}" && ?prop not in (wd:P31,wd:P910,wd:P5008,wd:P735,wd:P5125,wd:P485,wd:P1343,wd:P1424,wd:P21) )
            
    SERVICE wikibase:label { bd:serviceParam wikibase:language "${wikidata_language}". }
  }
  group by ?var ?propLabel ?Entity ?EntityLabel order by desc(?propLabel)`;

  return sparqlQuery;
}

export function chunk(array: any[], size: number) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

export function buildListStringSeparated(array: string[]): string {
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

/**
 * Related Items
 */

export async function ItemsRelatedFromWikipediaRaw(
  title: string,
  itemid: string,
  amount: number,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string
): Promise<IAtom[]> {
  if (title === undefined) {
    return [];
  }

  try {
    const data: any = await fetchRelatedWikipedia(title, ROOT_URL_REST_API);
    if (data["pages"] === undefined) {
      return [];
    }

    const list_of_PageIds_: string[] = Object.values(data["pages"]).map(
      (item: any) => {
        if (item["pageid"] !== undefined) {
          return String(item["pageid"]);
        } else {
          return undefined;
        }
      }
    );

    const list_of_PageIds = list_of_PageIds_.slice(0, amount);

    if (list_of_PageIds.length === 0) {
      return [];
    }

    const list_of_Pages_string = buildListStringSeparated(list_of_PageIds);
    let atomsList = await getAtomsFromWikipedia(
      list_of_Pages_string,
      ROOT_URL_ACTION_API
    );

    atomsList = atomsList.map((item: IAtom) => {
      let item_updated = item;
      item_updated["related"] = itemid + "|" + "wikipedia";
      return item_updated;
    });

    return atomsList;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

/**
 * Get Items
 */

export async function idsFromSearchOrRandomOrTitlesFromWikipedia(
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

  try {
    const data = await fetch_data(ROOT_URL, PARAMS, false);

    if (mode === "search") {
      if (
        data["query"] === undefined ||
        data["query"]["search"] === undefined
      ) {
        // return "";
        return [];
      }
    } else if (mode === "random") {
      if (
        data["query"] === undefined ||
        data["query"]["random"] === undefined
      ) {
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
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function getAtomsFromWikipedia(
  list_of_Pages_ids: string,
  ROOT_URL: string
  // nb_images: number
): Promise<IAtom[]> {
  try {
    //Get wp information from list of IDs (wikibase_item, image, thumbnail). Use English version with more image
    const PARAMS_2 = {
      action: "query",
      format: "json",
      prop: "pageprops|langlinks|pageimages|imageinfo",
      pageids: list_of_Pages_ids,
      utf8: 1,
      lllang: "en",
      // imlimit: nb_images.toString(),
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
          atom.title = item["title"];
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
  } catch (error) {
    // console.log(error);
    return [];
  }
}

/**
 * Images
 */

export function removeBadImages(list_information_atoms: IAtom[]): IAtom[] {
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
      item_updated.image_url = empty_value_atom;
    }
    list_information_atoms_updated.push(item_updated);
  });
  return list_information_atoms_updated;
}

export async function enrichImagesBatchFromWikipediaEN(
  list_information_atoms: IAtom[]
): Promise<IAtom[]> {
  if (
    list_information_atoms === undefined ||
    list_information_atoms.length === 0
  ) {
    return list_information_atoms;
  }

  //Build list of items without images (for querry)
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

  try {
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

    const list_information_atoms_updated = list_information_atoms.map(
      (item) => {
        let item_updated = item;

        for (const item_image_completed of atoms_where_image_found) {
          if (item_image_completed.title_en === item.title_en) {
            item_updated = item_image_completed;
            break;
          }
        }
        return item_updated;
      }
    );
    return list_information_atoms_updated;
  } catch (error) {
    // console.log(error);
    return list_information_atoms;
  }
}

/**
 * Get Images improved one by one
 */

//From Wikipedia Related
export async function enrichOneImageFromRelatedWikipedia(
  item: IAtom,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string
): Promise<IAtom> {
  if (item.image_url !== empty_value_atom) {
    return item;
  }

  const items_related: IAtom[] = await ItemsRelatedFromWikipediaRaw(
    item.title,
    item.id,
    amount_data_fetched_images,
    ROOT_URL_REST_API,
    ROOT_URL_ACTION_API
  );

  const items_related_images_url: string[] = removeBadImages(items_related)
    .map((item: IAtom) => {
      return item.image_url;
    })
    .filter((url) => {
      return url !== empty_value_atom;
    });

  try {
    if (items_related_images_url.length !== 0) {
      item.image_url = items_related_images_url[0];
    }
  } catch (error) {
    // console.log(error);
    return item;
  }

  return item;
}

export async function enrichOneImageFromRelatedWikipediaParallel(
  list_information_atoms: IAtom[],
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string
): Promise<IAtom[]> {
  if (list_information_atoms.length === 0) {
    return list_information_atoms;
  }

  const myBigPromise = await Promise.all(
    list_information_atoms.map((item: IAtom) => {
      return enrichOneImageFromRelatedWikipedia(
        item,
        ROOT_URL_REST_API,
        ROOT_URL_ACTION_API
      );
    })
  );

  return myBigPromise;
}

//from WikiCommon
export async function enrichOneImageFromWikiCommonPedia(
  item: IAtom,
  ROOT_URL: string
): Promise<IAtom> {
  const item_updated = item;

  if (item.image_url !== empty_value_atom) {
    return item;
  }

  try {
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
  } catch (error) {
    // console.log(error);
    return item;
  }

  return item_updated;
}

// export async function enrichImagesOneByOneFromWikiCommonPediaParallel(
//   list_information_atoms: IAtom[],
//   ROOT_URL: string
// ): Promise<IAtom[]> {
//   if (list_information_atoms.length === 0) {
//     return list_information_atoms;
//   }

//   const myBigPromise = await Promise.all(
//     list_information_atoms.map((item: IAtom) => {
//       return enrichOneImageFromWikiCommonPedia(item, ROOT_URL);
//     })
//   );

//   return myBigPromise;
// }
