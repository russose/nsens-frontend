import { configFetching } from "../config/globals";
import { ConfigLanguage, IAtom, JSONDataT } from "../config/globals";
import { filterAtomListFromPatterns, newAtom } from "./utils";
import { fetch_data_wiki_rest, fetch_data_wikipedia_action } from "./fetch";
import { ROOT_URL_WIKIPEDIA_ACTION } from "../config/configURLs";

const amount_data_fetched_related_for_images =
  configFetching.amount_data_fetched_related_for_images;
const ROOT_URL_WIKIPEDIA_EN = ROOT_URL_WIKIPEDIA_ACTION(ConfigLanguage.en);

const width_image_thumbnail = configFetching.width_image_thumbnail;

/**
 * Interfaces
 */

export async function filterAndImproveImages(
  atomsList: IAtom[],
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  const atomsList_filtered = filterAtomListFromPatterns(
    atomsList,
    exclusion_patterns
  );
  const atomsListWithImages = await improveImageFromWikipediaParallel(
    atomsList_filtered,
    ROOT_URL_ACTION_API,
    ROOT_URL_REST_API,
    lang
  );
  return atomsListWithImages;
}

//Mostviewed from QUERY API NOT WORKING WELL, RETURNING OFTEN emply [] => Desactivated
export async function ItemsFromSearchOrRandomOrTitlesOrMostviewedCleanImagesFromWikipedia(
  pattern_or_titles: string,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  nb_items: number,
  mode: "search" | "titles",
  //  | "random" | "mostviewed"
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  const list_of_PageIds = await idsFromSearchOrRandomOrTitlesFromWikipedia(
    pattern_or_titles,
    ROOT_URL_ACTION_API,
    nb_items,
    mode
  );

  const list_of_Pages_string = buildListStringSeparated(list_of_PageIds);
  const atomsList = await getAtomsFromWikipediaAction(
    list_of_Pages_string,
    ROOT_URL_ACTION_API,
    lang
  );

  // const atomsList_filtered = filterAtomListFromPatterns(
  //   atomsList,
  //   exclusion_patterns
  // );

  // const atomsListWithImages = await improveImageFromWikipediaParallel(
  //   atomsList_filtered,
  //   ROOT_URL_ACTION_API,
  //   ROOT_URL_REST_API,
  //   lang
  // );

  const atomsListWithImages = await filterAndImproveImages(
    atomsList,
    ROOT_URL_REST_API,
    ROOT_URL_ACTION_API,
    lang,
    exclusion_patterns
  );

  // let atomsListWithImages = await enrichImagesBatchFromWikipediaEN(
  //   atomsList_filtered
  // );
  // atomsListWithImages = removeBadImages(atomsListWithImages);

  // atomsListWithImages = await enrichOneImageFromRelatedWikipediaParallel(
  //   atomsListWithImages,
  //   ROOT_URL_REST_API,
  //   ROOT_URL_ACTION_API,
  //   lang
  // );

  return atomsListWithImages;
}

export async function ItemsFeaturedCleanImagesFromWikipedia(
  year: string,
  month: string,
  day: string,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  const atomsList = await getFeaturedAtomsFromWikipedia(
    year,
    month,
    day,
    ROOT_URL_REST_API,
    lang
  );

  // let atomsListWithImages = await enrichImagesBatchFromWikipediaEN(
  //   atomsList_filtered
  // );
  // atomsListWithImages = removeBadImages(atomsListWithImages);

  // atomsListWithImages = await enrichOneImageFromRelatedWikipediaParallel(
  //   atomsListWithImages,
  //   ROOT_URL_REST_API,
  //   ROOT_URL_ACTION_API,
  //   lang
  // );

  const atomsListWithImages = await filterAndImproveImages(
    atomsList,
    ROOT_URL_REST_API,
    ROOT_URL_ACTION_API,
    lang,
    exclusion_patterns
  );

  // const atomsList_filtered = filterAtomListFromPatterns(
  //   atomsList,
  //   exclusion_patterns
  // );
  // const atomsListWithImages = await improveImageFromWikipediaParallel(
  //   atomsList_filtered,
  //   ROOT_URL_ACTION_API,
  //   ROOT_URL_REST_API,
  //   lang
  // );

  return atomsListWithImages;
}

/**
 * Library
 */

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

//Mostviewed from QUERY API NOT WORKING WELL, RETURNING OFTEN emply []
export async function idsFromSearchOrRandomOrTitlesFromWikipedia(
  pattern_or_titles: string, //Not used for "random", can be any value
  ROOT_URL_ACTION_API: string,
  nb_atoms: number, //Not used for "titles", can be any value
  mode: "search" | "titles"
  //| "random" |"mostviewed"
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
  } else if (mode === "titles") {
    PARAMS = {
      action: "query",
      format: "json",
      titles: pattern_or_titles,
      utf8: 1,
    };
  }
  // else if (mode === "random") {
  //   PARAMS = {
  //     action: "query",
  //     format: "json",
  //     list: "random",
  //     utf8: 1,
  //     rnnamespace: "0",
  //     rnlimit: nb_atoms.toString(),
  //   };
  // } else if (mode === "mostviewed") {
  //   PARAMS = {
  //     action: "query",
  //     format: "json",
  //     list: "mostviewed",
  //     pvimlimit: nb_atoms.toString(),
  //     utf8: 1,
  //   };
  // }
  else {
    return undefined;
  }

  try {
    const data = await fetch_data_wikipedia_action(
      ROOT_URL_ACTION_API,
      PARAMS,
      false
    );

    if (mode === "search") {
      if (
        data["query"] === undefined ||
        data["query"]["search"] === undefined
      ) {
        return [];
      }
    } else if (mode === "titles") {
      if (data["query"] === undefined || data["query"]["pages"] === undefined) {
        // return "";
        return [];
      }
    }
    // else if (mode === "random") {
    //   if (
    //     data["query"] === undefined ||
    //     data["query"]["random"] === undefined
    //   ) {
    //     return [];
    //   }
    // } else if (mode === "mostviewed") {
    //   if (
    //     data["query"] === undefined ||
    //     data["query"]["mostviewed"] === undefined
    //   ) {
    //     return [];
    //   }
    // }
    else {
      return [];
    }

    let list_of_Pages_list: string[];
    if (mode === "search") {
      list_of_Pages_list = data["query"]["search"].map((item: JSONDataT) => {
        if (item["pageid"] !== undefined) {
          return item["pageid"];
        } else {
          return undefined;
        }
      });
    } else if (mode === "titles") {
      list_of_Pages_list = Object.values(data["query"]["pages"]).map(
        (item: JSONDataT) => {
          if (item["pageid"] !== undefined) {
            return item["pageid"];
          } else {
            return undefined;
          }
        }
      );
    }
    // else if (mode === "random") {
    //   list_of_Pages_list = data["query"]["random"].map((item: JSONDataT) => {
    //     if (item["id"] !== undefined) {
    //       return item["id"];
    //     } else {
    //       return undefined;
    //     }
    //   });
    // } else if (mode === "mostviewed") {
    //   const list_of_Pages_title_list = data["query"]["mostviewed"].map(
    //     (item: JSONDataT) => {
    //       if (item["title"] !== undefined) {
    //         return item["title"];
    //       } else {
    //         return undefined;
    //       }
    //     }
    //   );
    //   //Transform list of titles in list of ids
    //   //To be done!
    //   const list_of_PageTitles_string = buildListStringSeparated(
    //     list_of_Pages_title_list
    //   );

    //   list_of_Pages_list = await idsFromSearchOrRandomOrTitlesFromWikipedia(
    //     list_of_PageTitles_string,
    //     ROOT_URL_ACTION_API,
    //     nb_atoms,
    //     "titles"
    //   );
    // }

    return list_of_Pages_list;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function getAtomsFromWikipediaAction(
  list_of_Pages_ids: string,
  ROOT_URL_ACTION_API: string,
  lang: ConfigLanguage
  // nb_images: number
): Promise<IAtom[]> {
  try {
    //Get wp information from list of IDs (wikibase_item, image, thumbnail).
    const PARAMS = {
      action: "query",
      format: "json",
      prop: "pageprops|langlinks|pageimages|imageinfo",
      pageids: list_of_Pages_ids,
      utf8: 1,
      lllang: "en",
      lllimit: 60,
      // imlimit: nb_images.toString(),
      //imlimit: (3 * nb_images).toString(),
      piprop: "original|thumbnail",
      pilicense: "free",
      iiprop: "url|size|mediatype|dimensions",
    };

    const data = await fetch_data_wikipedia_action(
      ROOT_URL_ACTION_API,
      PARAMS,
      false
    );

    if (data["query"] === undefined) {
      return [];
    }

    //Extract relevant information to keep
    const list_information_atoms: IAtom[] = [];
    Object.values(data["query"]["pages"]).forEach((item: JSONDataT) => {
      if (item["pageprops"] !== undefined) {
        const id = item["pageprops"]["wikibase_item"];
        const atom = newAtom(id, lang);
        atom.wikibase_item = item["pageprops"]["wikibase_item"];
        atom.pageid_wp = item["pageid"];
        atom.title = item["title"];
        if (item["langlinks"] !== undefined) {
          atom.title_en = item["langlinks"][0]["*"];
        } else {
          atom.title_en = "";
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

    //remettre la liste dans l'ordre
    const pages_ids_map = new Map<number, IAtom>();
    list_information_atoms.forEach((atom) => {
      pages_ids_map.set(atom.pageid_wp, atom);
    });
    const list_of_Pages_ids_copy = new String(list_of_Pages_ids); //deep copy mandatory
    const pageid_wp_list: string[] = list_of_Pages_ids_copy.split("|");
    const list_information_atoms_ordered: IAtom[] = pageid_wp_list.map(
      (wp_id: string) => {
        return pages_ids_map.get(parseInt(wp_id, 10));
      }
    );

    return list_information_atoms_ordered;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

/**
 * Images NEW
 */

interface IImage {
  title: string;
  url: string;
  size: number;
  height: number;
  width: number;
  thumburl: string;
  thumbheight: number;
  thumbwidth: number;
}

export async function getAllPageImagesReducedFromWikipediaAction(
  title: string,
  width: number,
  ROOT_URL_ACTION_API: string
): Promise<IImage[]> {
  try {
    //
    const PARAMS = {
      action: "query",
      format: "json",
      prop: "imageinfo",
      titles: title,
      // redirects: 1,
      generator: "images",
      utf8: 1,
      // pilicense: "free",
      iiprop: "url|size|mediatype|dimensions",
      iiurlwidth: width.toString(),
      // gimlimit: amount_data_fetched_images.toString(),
      gimlimit: "50",
    };

    const data = await fetch_data_wikipedia_action(
      ROOT_URL_ACTION_API,
      PARAMS,
      false
    );

    if (data["query"] === undefined) {
      return [];
    }

    //Extract relevant information to keep
    const list_information_images: IImage[] = [];
    Object.values(data["query"]["pages"]).forEach((item: JSONDataT) => {
      if (item["imageinfo"] !== undefined) {
        const image: IImage = {
          title: item["title"],
          url: item["imageinfo"][0]["url"],
          size: item["imageinfo"][0]["size"],
          height: item["imageinfo"][0]["height"],
          width: item["imageinfo"][0]["width"],
          thumburl: item["imageinfo"][0]["thumburl"],
          thumbheight: item["imageinfo"][0]["thumbheight"],
          thumbwidth: item["imageinfo"][0]["thumbwidth"],
        };
        list_information_images.push(image);
      }
    });

    return list_information_images;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function improveImageFromWikipedia(
  item: IAtom,
  ROOT_URL_ACTION_API: string,
  ROOT_URL_REST_API: string,
  lang: ConfigLanguage
): Promise<IAtom> {
  if (item === undefined) {
    return item;
  }

  function isValidImage(image: IImage): boolean {
    // ["jpg", "JPG", "png", "PNG", "tif", "TIF", "svg", "SVG"]
    // const extension = image.title.slice(-3);

    // if ((extension === "svg" || extension === "SVG") && image.width < 800) {
    //   return false;
    // }
    if (image.width < 200) {
      return false;
    }
    return true;
  }

  function findImageFromUrl(
    images: IImage[],
    itemUrl: string
  ): IImage | undefined {
    if (images === undefined || images.length === 0) {
      return undefined;
    }

    const image_list = images.filter((image) => {
      return image.url === itemUrl;
    });

    if (image_list.length === undefined || image_list.length === 0) {
      return undefined;
    } else {
      return image_list[0];
    }
  }

  function findBiggestImage(images: IImage[]): IImage | undefined {
    if (images === undefined || images.length === 0) {
      return undefined;
    }

    //Filter svg
    const images_filtered: IImage[] = images.filter((image) => {
      const extension = image.title.slice(-3);
      return !(extension === "svg" || extension === "SVG");
    });

    if (images_filtered.length === 0) {
      return undefined;
    }

    const images_sorted_size: IImage[] = images_filtered.sort((a, b) => {
      if (a.size > b.size) {
        //a est avant à b
        return -1;
      } else {
        //a est après à b
        return 1;
      }
    });
    const best_image = images_sorted_size[0];
    if (!isValidImage(best_image)) {
      return undefined;
    }
    return best_image;
  }

  let best_image: IImage;
  const images = await getAllPageImagesReducedFromWikipediaAction(
    item.title,
    width_image_thumbnail,
    ROOT_URL_ACTION_API
  );

  best_image = findImageFromUrl(images, item.image_url);

  let images_en: IImage[] = [];
  if (best_image === undefined && item.title_en !== "") {
    //Try with Wikipedia_EN with more front image
    const ids_en: string[] = await idsFromSearchOrRandomOrTitlesFromWikipedia(
      item.title_en,
      ROOT_URL_WIKIPEDIA_EN,
      -1,
      "titles"
    );
    const atomsList = await getAtomsFromWikipediaAction(
      ids_en[0],
      ROOT_URL_WIKIPEDIA_EN,
      ConfigLanguage.en
    );
    const item_en: IAtom = atomsList[0];

    images_en = await getAllPageImagesReducedFromWikipediaAction(
      item_en.title,
      width_image_thumbnail,
      ROOT_URL_WIKIPEDIA_EN
    );
    best_image = findImageFromUrl(images_en, item_en.image_url);
  }

  if (best_image === undefined && images.length > 0) {
    best_image = findBiggestImage(images);
  }

  if (best_image === undefined && images_en.length > 0) {
    best_image = findBiggestImage(images_en);
  }
  if (best_image === undefined) {
    //Finalyze with related items
    const items_related: IAtom[] = await ItemsRelatedFromWikipediaRaw(
      item.title,
      amount_data_fetched_related_for_images,
      ROOT_URL_REST_API,
      ROOT_URL_ACTION_API,
      lang
    );

    for (const item_related of items_related) {
      // if (best_image === undefined) {
      const images_related = await getAllPageImagesReducedFromWikipediaAction(
        item_related.title,
        width_image_thumbnail,
        ROOT_URL_ACTION_API
      );
      best_image = findImageFromUrl(images_related, item_related.image_url);
      // }
      if (best_image !== undefined) {
        break;
      }
    }
  }

  if (best_image === undefined) {
    item.image_url = "";
    item.image_height = 1;
    item.image_width = 1;
    return item;
  }

  // Replace item image by the smaller optimyzed version
  item.image_url = best_image.thumburl;
  item.image_height = best_image.thumbheight;
  item.image_width = best_image.thumbwidth;

  return item;
}

export async function improveImageFromWikipediaParallel(
  list_information_atoms: IAtom[],
  ROOT_URL_ACTION_API: string,
  ROOT_URL_REST_API: string,
  lang: ConfigLanguage
): Promise<IAtom[]> {
  if (list_information_atoms.length === 0) {
    return list_information_atoms;
  }

  const myBigPromise = await Promise.all(
    list_information_atoms.map((item: IAtom) => {
      return improveImageFromWikipedia(
        item,
        ROOT_URL_ACTION_API,
        ROOT_URL_REST_API,
        lang
      );
    })
  );

  return myBigPromise;
}

/**
 * Images OLD
 */

// export function removeBadImages(list_information_atoms: IAtom[]): IAtom[] {
//   const list_information_atoms_updated: IAtom[] = [];
//   list_information_atoms.forEach((item) => {
//     const item_updated = item;
//     if (
//       item.image_url === empty_value_atom ||
//       // item.image_width > 2 * CONFIG_FETCHING.max_width_image ||
//       item.image_width > configFetching.max_width_image ||
//       !["jpg", "JPG", "png", "PNG", "tif", "TIF", "svg", "SVG"].includes(
//         item.image_url.slice(-3)
//       )
//     ) {
//       item_updated.image_url = empty_value_atom;
//     }
//     list_information_atoms_updated.push(item_updated);
//   });
//   return list_information_atoms_updated;
// }

// /**
//  * Get Images improved one by one
//  */

// //From Wikipedia Related
// export async function enrichOneImageFromRelatedWikipedia(
//   item: IAtom,
//   ROOT_URL_REST_API: string,
//   ROOT_URL_ACTION_API: string,
//   lang: ConfigLanguage
// ): Promise<IAtom> {
//   if (item.image_url !== empty_value_atom) {
//     return item;
//   }

//   const items_related: IAtom[] = await ItemsRelatedFromWikipediaRaw(
//     item.title,
//     // item.id,
//     amount_data_fetched_related_for_images,
//     ROOT_URL_REST_API,
//     ROOT_URL_ACTION_API,
//     lang
//   );

//   const items_related_images_url: string[] = removeBadImages(items_related)
//     .map((item: IAtom) => {
//       return item.image_url;
//     })
//     .filter((url) => {
//       return url !== empty_value_atom;
//     });

//   try {
//     if (items_related_images_url.length !== 0) {
//       item.image_url = items_related_images_url[0];
//     }
//   } catch (error) {
//     // console.log(error);
//     return item;
//   }

//   return item;
// }

// export async function enrichImagesBatchFromWikipediaEN(
//   list_information_atoms: IAtom[]
// ): Promise<IAtom[]> {
//   if (
//     list_information_atoms === undefined ||
//     list_information_atoms.length === 0
//   ) {
//     return list_information_atoms;
//   }

//   //Build list of items without images (for querry)
//   const list_of_title_en_string_list = list_information_atoms.map((item) => {
//     if (
//       item["title_en"] !== empty_value_atom &&
//       (item["image_url"] === empty_value_atom ||
//         item["image_width"] > configFetching.max_width_image)
//     ) {
//       return item["title_en"];
//     } else {
//       return undefined;
//     }
//   });

//   const list_of_title_en_string = buildListStringSeparated(
//     list_of_title_en_string_list
//   );
//   if (list_of_title_en_string === "") {
//     return list_information_atoms;
//   }

//   try {
//     //Obtenir les images de Wikipedia EN
//     const PARAMS = {
//       action: "query",
//       format: "json",
//       prop: "pageimages",
//       utf8: 1,
//       titles: list_of_title_en_string,
//       piprop: "original|thumbnail",
//       pilicense: "free",
//     };
//     const data = await fetch_data_wikipedia_action(
//       ROOT_URL_WIKIPEDIA_EN,
//       PARAMS,
//       false
//     );

//     if (data["query"]["pages"] === undefined) {
//       return list_information_atoms;
//     }
//     const atoms_where_image_found: IAtom[] = [];
//     Object.values(data["query"]["pages"]).forEach((item: JSONDataT) => {
//       //Find the atom to update in list_information_atoms
//       const atom = list_information_atoms.filter((atom) => {
//         return atom.title_en === item["title"];
//       })[0];

//       if (atom !== undefined) {
//         if (item["thumbnail"] !== undefined) {
//           atom.thumbnail_url = item["thumbnail"]["source"];
//         }
//         if (item["original"] !== undefined) {
//           atom.image_url = item["original"]["source"];
//           atom.image_height = item["original"]["height"];
//           atom.image_width = item["original"]["width"];
//           atoms_where_image_found.push(atom);
//           //console.log("image trouvé sur EN pour:", atom.title, atom.image_url);
//         } else {
//           //console.log("no image for:", item["title"]);
//         }
//       }
//     });

//     const list_information_atoms_updated = list_information_atoms.map(
//       (item) => {
//         let item_updated = item;

//         for (const item_image_completed of atoms_where_image_found) {
//           if (item_image_completed.title_en === item.title_en) {
//             item_updated = item_image_completed;
//             break;
//           }
//         }
//         return item_updated;
//       }
//     );
//     return list_information_atoms_updated;
//   } catch (error) {
//     // console.log(error);
//     return list_information_atoms;
//   }
// }

// export async function enrichOneImageFromRelatedWikipediaParallel(
//   list_information_atoms: IAtom[],
//   ROOT_URL_REST_API: string,
//   ROOT_URL_ACTION_API: string,
//   lang: ConfigLanguage
// ): Promise<IAtom[]> {
//   if (list_information_atoms.length === 0) {
//     return list_information_atoms;
//   }

//   const myBigPromise = await Promise.all(
//     list_information_atoms.map((item: IAtom) => {
//       return enrichOneImageFromRelatedWikipedia(
//         item,
//         ROOT_URL_REST_API,
//         ROOT_URL_ACTION_API,
//         lang
//       );
//     })
//   );

//   return myBigPromise;
// }

/**
 * Related Items
 */

export async function ItemsRelatedFromWikipediaRaw(
  title: string,
  // itemid: string,
  amount: number,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: ConfigLanguage
): Promise<IAtom[]> {
  if (title === undefined) {
    return [];
  }

  try {
    const data: JSONDataT = await fetch_data_wiki_rest(
      title,
      ROOT_URL_REST_API + "page/related/"
    );
    if (data["pages"] === undefined) {
      return [];
    }

    const list_of_PageIds_: string[] = Object.values(data["pages"]).map(
      (item: JSONDataT) => {
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
    let atomsList = await getAtomsFromWikipediaAction(
      list_of_Pages_string,
      ROOT_URL_ACTION_API,
      lang
    );

    return atomsList;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

/**
 * Featured Items
 */
export async function getFeaturedAtomsFromWikipedia(
  year: string,
  month: string,
  day: string,
  ROOT_URL_REST_API: string,
  lang: ConfigLanguage
): Promise<IAtom[]> {
  try {
    const data: JSONDataT = await fetch_data_wiki_rest(
      year + "/" + month + "/" + day,
      ROOT_URL_REST_API + "feed/featured/"
    );

    if (
      data["mostread"] === undefined ||
      data["mostread"]["articles"] === undefined
    ) {
      return [];
    }

    //Extract relevant information to keep
    const list_information_atoms: IAtom[] = [];
    Object.values(data["mostread"]["articles"]).forEach((item: JSONDataT) => {
      const id = item["wikibase_item"];
      const atom = newAtom(id, lang);
      atom.wikibase_item = item["wikibase_item"];
      atom.pageid_wp = item["pageid"];
      atom.title = item["titles"]["normalized"];
      atom.title_en = "";
      if (item["originalimage"] !== undefined) {
        atom.image_url = item["originalimage"]["source"];
        atom.image_height = item["originalimage"]["height"];
        atom.image_width = item["originalimage"]["width"];
      }
      if (item["thumbnail"] !== undefined) {
        atom.thumbnail_url = item["thumbnail"]["source"];
      }
      list_information_atoms.push(atom);
    });

    return list_information_atoms;
  } catch (error) {
    // console.log(error);
    return [];
  }
}
