import { CONFIG_FETCHING, USER_DISPLAY } from "./config";
import { IAtom, newAtom, empty_value_atom } from "./types";
import { fetch_data } from "./fetch";

const path_empty_image = USER_DISPLAY.paths.item_empty_image;

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
      item_updated.image_url = path_empty_image;
    }
    list_information_atoms_updated.push(item_updated);
  });
  return list_information_atoms_updated;
}

export async function searchItemsFetchDataCleanImages(
  searchPattern: string,
  ROOT_URL: string,
  nb_items: number
): Promise<IAtom[]> {
  const atomsList = await searchAtomsFromWikipedia(
    searchPattern,
    ROOT_URL,
    nb_items
  );
  let atomsListWithImages = await enrichImagesBatchFromWikipediaEN(atomsList);
  atomsListWithImages = removeBadImages(atomsListWithImages);
  //console.time("First");
  atomsListWithImages = await enrichImagesOneByOneFromWikiCommonPediaParralel(
    atomsListWithImages,
    CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_EN
  );
  //console.timeEnd("First");

  return atomsListWithImages;
}

export async function randomItemsFetchDataCleanImages(
  ROOT_URL: string,
  nb_items: number
): Promise<IAtom[]> {
  const atomsList = await randomAtomsFromWikipedia(ROOT_URL, nb_items);
  let atomsListWithImages = await enrichImagesBatchFromWikipediaEN(atomsList);
  atomsListWithImages = removeBadImages(atomsListWithImages);
  //console.time("First");
  atomsListWithImages = await enrichImagesOneByOneFromWikiCommonPediaParralel(
    atomsListWithImages,
    CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_EN
  );
  //console.timeEnd("First");

  return atomsListWithImages;
}

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

export async function searchAtomsFromWikipedia(
  pattern: string,
  ROOT_URL: string,
  nb_atoms: number
): Promise<IAtom[]> {
  const PARAMS = {
    action: "query",
    format: "json",
    list: "search",
    utf8: 1,
    srenablerewrites: 1,
    srsearch: pattern,
    srlimit: nb_atoms.toString(),
    srnamespace: "0",
    //srprop: "",
    //srnamespace: "4",
  };
  const data = await fetch_data(ROOT_URL, PARAMS, false);

  if (data["query"] === undefined || data["query"]["search"] === undefined) {
    return [];
  }

  //Extract list of wp IDs and build api string
  let list_of_PageIds_string = "";
  Object.values(data["query"]["search"]).forEach((item: any) => {
    list_of_PageIds_string = list_of_PageIds_string + item["pageid"] + "|";
  });
  list_of_PageIds_string = list_of_PageIds_string.slice(0, -1);

  if (list_of_PageIds_string === "") {
    return [];
  }

  //Get wp information from list of IDs (wikibase_item, image, thumbnail). Use English version with more image
  const PARAMS_2 = {
    action: "query",
    format: "json",
    prop: "pageprops|langlinks|pageimages|imageinfo",
    pageids: list_of_PageIds_string,
    utf8: 1,
    lllang: "en",
    lllimit: nb_atoms.toString(),
    //imlimit: (3 * nb_atoms).toString(),
    piprop: "original|thumbnail",
    pilicense: "free",
    iiprop: "url|size|mediatype|dimensions",
  };
  const data2 = await fetch_data(ROOT_URL, PARAMS_2, false);

  //Extract relevant information to keep
  const list_information_atoms: IAtom[] = [];
  Object.values(data2["query"]["pages"]).forEach((item: any) => {
    //const atom = newAtom(item["pageid"]);
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

/****************************************************************** */

export async function randomAtomsFromWikipedia(
  ROOT_URL: string,
  nb_atoms: number
): Promise<IAtom[]> {
  const PARAMS = {
    action: "query",
    format: "json",
    list: "random",
    utf8: 1,
    rnnamespace: "0",
    rnlimit: nb_atoms.toString(),
  };

  const data = await fetch_data(ROOT_URL, PARAMS, false);

  if (data["query"] === undefined || data["query"]["random"] === undefined) {
    return [];
  }

  //Extract list of wp IDs and build api string
  let list_of_PageIds_string = "";
  Object.values(data["query"]["random"]).forEach((item: any) => {
    list_of_PageIds_string = list_of_PageIds_string + item["id"] + "|";
  });
  list_of_PageIds_string = list_of_PageIds_string.slice(0, -1);

  if (list_of_PageIds_string === "") {
    return [];
  }

  //Get wp information from list of IDs (wikibase_item, image, thumbnail). Use English version with more image
  const PARAMS_2 = {
    action: "query",
    format: "json",
    prop: "pageprops|langlinks|pageimages|imageinfo",
    pageids: list_of_PageIds_string,
    utf8: 1,
    lllang: "en",
    lllimit: nb_atoms.toString(),
    //imlimit: (3 * nb_atoms).toString(),
    piprop: "original|thumbnail",
    pilicense: "free",
    iiprop: "url|size|mediatype|dimensions",
  };
  const data2 = await fetch_data(ROOT_URL, PARAMS_2, false);

  //Extract relevant information to keep
  const list_information_atoms: IAtom[] = [];
  Object.values(data2["query"]["pages"]).forEach((item: any) => {
    //const atom = newAtom(item["pageid"]);
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

/****************************************************************** */

export async function enrichImagesBatchFromWikipediaEN(
  list_information_atoms: IAtom[]
): Promise<IAtom[]> {
  if (list_information_atoms.length === 0) {
    return list_information_atoms;
  }

  //Build que list of items without images (for querry)
  let list_of_title_en_string = "";
  list_information_atoms.forEach((item: IAtom) => {
    if (
      item["title_en"] !== empty_value_atom &&
      (item["image_url"] === empty_value_atom ||
        item["image_width"] > CONFIG_FETCHING.max_width_image)
    ) {
      list_of_title_en_string =
        list_of_title_en_string + item["title_en"] + "|";

      // console.log(item.title, item.image_width);
    }
  });
  list_of_title_en_string = list_of_title_en_string.slice(0, -1);

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

export async function enrichOneImageFromWikiCommonPedia(
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

  return item_updated;
}

export async function enrichImagesOneByOneFromWikiCommonPediaParralel(
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

// A ne pas utiliser, Qwant nous bloque!
// async function enrichImagesFromQwant(
//   list_information_atoms: IAtom[]
// ): Promise<IAtom[]> {
//   if (list_information_atoms.length === 0) {
//     return list_information_atoms;
//   }

//   //Obtenir les images de Quant
//   const PARAMS = {
//     count: 1,
//     q: "to_be_defined",
//     t: "images",
//     licence: "public",
//     size: "medium",
//     safesearch: 1,
//     locale: "en_US",
//     uiv: 4,
//   };

//   list_information_atoms.forEach(async (item: IAtom) => {
//     PARAMS.q = item.title_en;
//     try {
//       const data = await fetch_data(
//         "https://api.qwant.com/api/search/images",
//         PARAMS,
//         false
//       );

//       item["image_url"] = data["data"]["result"]["items"][0]["media"];
//       console.log(item["image_url"]);
//     } catch (err) {
//       console.log("error in fetching image for:", PARAMS.q);
//       console.log(err);
//     }
//   });

//   return list_information_atoms;
// }
