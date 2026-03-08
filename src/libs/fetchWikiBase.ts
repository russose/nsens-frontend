import { configFetching, configPaths } from "../config/globals";
import { Tlanguage, IAtom, JSONDataT } from "../config/globals";
import { chunk, makeArrayFlat, newAtom, stringList2String } from "./utils";
import { fetch_data_wiki_rest, fetch_data_wiki_action } from "./fetch";
import { ROOT_URL_WIKIPEDIA_ACTION } from "../config/configURLs";

const amount_data_fetched_related_for_images =
  configFetching.amount_data_fetched_related_for_images;
// const ROOT_URL_WIKIPEDIA_EN = ROOT_URL_WIKIPEDIA_ACTION(Tlanguage.en);

const width_image_thumbnail = configFetching.width_image_thumbnail;

const cache_duration_in_sec = configFetching.cache_duration_in_sec;

const max_size_api = configFetching.max_size_chunk_api;

function filterAtomListFromPatterns(
  atomList: IAtom[],
  patterns: string[]
): IAtom[] {
  if (atomList === undefined || atomList.length === 0) {
    return [];
  }
  let atomList_filterned: IAtom[] = atomList;
  patterns.forEach((pattern: string) => {
    atomList_filterned = atomList_filterned.filter((atom) => {
      return !atom.title.includes(pattern);
    });
  });
  return atomList_filterned;
}

/**
 * Interfaces
 */

export function removeImages(items: IAtom[]): IAtom[] {
  const items_without_image: IAtom[] = items.map((item) => {
    const item_without_image: IAtom = item;
    item_without_image.image_url = "";
    return item_without_image;
  });

  return items_without_image;
}

export function filterItems(
  atomsList: IAtom[],
  exclusion_patterns: string[]
): IAtom[] {
  if (atomsList === undefined || atomsList.length === 0) {
    return [];
  }
  //Remove undefined
  const atomsList_no_undefined = atomsList.filter((item) => {
    return item !== undefined;
  });

  const atomsList_filtered = filterAtomListFromPatterns(
    atomsList_no_undefined,
    exclusion_patterns
  );

  return atomsList_filtered;
}

export async function improveImageFromWikipediaParallel_blocking(
  atomsList: IAtom[],
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: Tlanguage
): Promise<IAtom[]> {
  if (atomsList === undefined || atomsList.length === 0) {
    return [];
  }

  const myBigPromise = await Promise.all(
    atomsList.map((item: IAtom) => {
      return improveImageFromWikipedia_blocking(
        item,
        ROOT_URL_REST_API,
        ROOT_URL_ACTION_API,
        lang
      );
      // .catch((e) => {
      //   console.log(e);
      //   console.log(" => error in Promise All fetchRelatedCleanImage_blocking");
      //   return undefined;
      // });
    })
  );

  return myBigPromise;
}

export async function ItemsFeaturedFromWikipediaWithoutImage(
  year: string,
  month: string,
  day: string,
  ROOT_URL_REST_API: string,
  lang: Tlanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  const atomsList = await getFeaturedAtomsFromWikipedia(
    year,
    month,
    day,
    ROOT_URL_REST_API,
    lang
  );

  const atomsList_filtered = filterItems(atomsList, exclusion_patterns);

  const atomsList_filtered_without_images: IAtom[] =
    removeImages(atomsList_filtered);

  return atomsList_filtered_without_images;
}

export async function ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage(
  pattern_or_titles: string,
  ROOT_URL_ACTION_API: string,
  nb_items: number,
  mode: "search" | "titles" | "random",
  // | "mostviewed" //Mostviewed from QUERY API NOT WORKING WELL, RETURNING OFTEN emply [] => Desactivated
  lang: Tlanguage,
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

  const atomsList_filtered = filterItems(atomsList, exclusion_patterns);

  // return atomsList_filtered;

  const atomsList_filtered_without_images: IAtom[] =
    removeImages(atomsList_filtered);

  return atomsList_filtered_without_images;
}

export async function ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage_chunked_Parallel(
  itemTitles: string[],
  // ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: Tlanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  async function ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage_Parallel(
    list_of_PageTitle_string: string[]
  ): Promise<IAtom[][]> {
    const myBigPromise = await Promise.all(
      list_of_PageTitle_string.map((PageTitle_string: string) => {
        return ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage(
          PageTitle_string,
          ROOT_URL_ACTION_API,
          -1,
          "titles",
          lang,
          exclusion_patterns
        );
        // .catch((e) => {
        //   console.log(e);
        //   console.log(" => error in Promise All 3");
        //   return undefined;
        // });
      })
    );
    return myBigPromise;
  }

  if (itemTitles === undefined) {
    return [];
  }

  const itemTitles_chunked: string[][] = chunk(itemTitles, max_size_api);

  const list_of_PageTitle_string = itemTitles_chunked.map(
    (PageTitle_string: string[]) => {
      return buildListStringSeparated(PageTitle_string);
    }
  );

  const items_chunked: IAtom[][] =
    await ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage_Parallel(
      list_of_PageTitle_string
    );

  const items_flat: IAtom[] = makeArrayFlat(items_chunked);

  return items_flat;
}

export async function ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaCleanImage_blocking(
  pattern_or_titles: string,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  nb_items: number,
  mode: "search" | "titles" | "random",
  // | "mostviewed" Mostviewed from QUERY API NOT WORKING WELL, RETURNING OFTEN emply [] => Desactivated
  lang: Tlanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  const atomsList_filtered =
    await ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage(
      pattern_or_titles,
      ROOT_URL_ACTION_API,
      nb_items,
      mode,
      lang,
      exclusion_patterns
    );

  const atomsListWithImages = await improveImageFromWikipediaParallel_blocking(
    atomsList_filtered,
    ROOT_URL_REST_API,
    ROOT_URL_ACTION_API,
    lang
  );

  return atomsListWithImages;
}

/**
 * Library
 */

// NOT WORKING! REUSED THE OLD VERSION BELOW
// export function buildListStringSeparated_(array: string[]): string {
//   return stringList2String(array, "|");
// }

// Don't use buildListStringSeparated_ since it is not working!
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
async function idsFromSearchOrRandomOrTitlesFromWikipedia(
  pattern_or_titles: string, //Not used for "random", can be any value
  ROOT_URL_ACTION_API: string,
  nb_atoms: number, //Not used for "titles", can be any value
  mode: "search" | "titles" | "random"
  // |"mostviewed"
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
      redirects: 1,
      maxage: cache_duration_in_sec, //1 semaine pour le cache
      //srprop: "",
      //srnamespace: "4",
    };
  } else if (mode === "titles") {
    PARAMS = {
      action: "query",
      format: "json",
      titles: pattern_or_titles,
      utf8: 1,
      maxage: cache_duration_in_sec, //1 semaine pour le cache
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
  }
  //else if (mode === "mostviewed") {
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
    const data = await fetch_data_wiki_action(
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
    } else if (mode === "random") {
      if (
        data["query"] === undefined ||
        data["query"]["random"] === undefined
      ) {
        return [];
      }
    }
    //else if (mode === "mostviewed") {
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
          // console.log(item["pageid"], item["title"]);
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
    } else if (mode === "random") {
      list_of_Pages_list = data["query"]["random"].map((item: JSONDataT) => {
        if (item["id"] !== undefined) {
          return item["id"];
        } else {
          return undefined;
        }
      });
    }
    //else if (mode === "mostviewed") {
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

    // return list_of_Pages_list;
    return list_of_Pages_list.map((item) => {
      return item !== undefined ? item.toString() : undefined;
    });
  } catch (error) {
    // console.log(error);
    return [];
  }
}

//WARNING: order broken here?
async function getAtomsFromWikipediaAction(
  list_of_Pages_ids: string,
  ROOT_URL_ACTION_API: string,
  lang: Tlanguage
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
      redirects: 1,
      maxage: cache_duration_in_sec, //1 semaine pour le cache
    };

    const data = await fetch_data_wiki_action(
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
      // console.log(item.title);

      if (
        item["pageprops"] !== undefined &&
        item["pageprops"]["wikibase_item"] !== undefined &&
        item["title"] !== undefined
      ) {
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
        // if (item["thumbnail"] !== undefined) {
        //   atom.thumbnail_url = item["thumbnail"]["source"];
        // }

        list_information_atoms.push(atom);
      }
    });

    //remettre la liste dans l'ordre, sinon les recherches de la wiki sont dans le désordre!
    const ordered_activated = true;
    if (ordered_activated) {
      const pageid_wp_list: string[] = list_of_Pages_ids.split("|");
      const pages_ids_map = new Map<number, IAtom>();
      //init map following the right order
      for (const id of pageid_wp_list) {
        pages_ids_map.set(Number(id), undefined);
      }
      //fill the map with the right atom
      for (const atom of list_information_atoms) {
        pages_ids_map.set(atom.pageid_wp, atom);
      }
      const list_information_atoms_ordered: IAtom[] = Array.from(
        pages_ids_map.values()
      ).filter((item) => {
        return item !== undefined;
      });

      return list_information_atoms_ordered;
    } else {
      return list_information_atoms;
    }
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

async function getAllPageImagesReducedFromWikipediaAction(
  title: string,
  width: number,
  // ROOT_URL_ACTION_API: string,
  lang: Tlanguage,
  targeted_image_name: string = ""
): Promise<IImage[]> {
  try {
    //
    const prefix_file = {
      [Tlanguage.en]: "File:",
      [Tlanguage.fr]: "Fichier:",
      [Tlanguage.it]: "File:",
    };

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
      maxage: cache_duration_in_sec, //1 semaine pour le cache
      gimimages:
        targeted_image_name === ""
          ? ""
          : prefix_file[lang] + decodeURIComponent(targeted_image_name),
    };

    const data = await fetch_data_wiki_action(
      ROOT_URL_WIKIPEDIA_ACTION(lang),
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

async function findMainImage(
  item_title: string,
  lang: Tlanguage
): Promise<IImage | undefined> {
  if (item_title === undefined) {
    return undefined;
  }

  const ids: string[] = await idsFromSearchOrRandomOrTitlesFromWikipedia(
    item_title,
    ROOT_URL_WIKIPEDIA_ACTION(lang),
    -1,
    "titles"
  );
  const atomsList = await getAtomsFromWikipediaAction(
    ids[0],
    ROOT_URL_WIKIPEDIA_ACTION(lang),
    lang
  );
  const item: IAtom = atomsList[0];

  let images: IImage[] = [];
  if (item !== undefined && item.image_url.length > 0) {
    const targeted_image_name_list = item.image_url.split("/");
    const targeted_image_name =
      targeted_image_name_list[targeted_image_name_list.length - 1];

    images = await getAllPageImagesReducedFromWikipediaAction(
      item.title,
      width_image_thumbnail,
      lang,
      targeted_image_name
    );
    if (images !== undefined) {
      return images[0];
    }
  }

  return undefined;
}

async function improveImageFromWikipedia_blocking(
  item_input: IAtom,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: Tlanguage
): Promise<IAtom> {
  if (item_input === undefined) {
    return item_input;
  }

  const item = { ...item_input };

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

  function findBiggestImage(images: IImage[]): IImage | undefined {
    if (images === undefined || images.length === 0) {
      return undefined;
    }

    //Filter svg
    const images_filtered: IImage[] = images.filter((image) => {
      if (image === undefined) {
        return false;
      }
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

  best_image = await findMainImage(item.title, lang);

  // if (best_image !== undefined) {
  //   console.log("Main:", item.title, best_image.url);
  // }

  if (best_image === undefined && item.title_en !== "") {
    best_image = await findMainImage(item.title_en, Tlanguage.en);

    // if (best_image !== undefined) {
    //   console.log("Main EN:", item.title, best_image.url);
    // }
  }

  let images: IImage[] = [];
  if (best_image === undefined) {
    images = await getAllPageImagesReducedFromWikipediaAction(
      item.title,
      width_image_thumbnail,
      lang
    );
    best_image = findBiggestImage(images);

    // if (best_image !== undefined) {
    //   console.log("Big:", item.title, best_image.url);
    // }
  }

  if (best_image === undefined) {
    images = await getAllPageImagesReducedFromWikipediaAction(
      item.title_en,
      width_image_thumbnail,
      Tlanguage.en
    );

    best_image = findBiggestImage(images);

    // if (best_image !== undefined) {
    //   console.log("Big EN:", item.title, best_image.url);
    // }
  }

  const fetching_related_activated = true;
  if (best_image === undefined && fetching_related_activated) {
    //Finalyze with related items from wikipedia when no result
    let items_related: IAtom[] = await ItemsRelatedFromWikipediaRaw(
      item.title,
      amount_data_fetched_related_for_images,
      ROOT_URL_REST_API,
      ROOT_URL_ACTION_API,
      lang
    );

    items_related = items_related.filter((item) => {
      return item !== undefined;
    });

    for (const item_related of items_related) {
      best_image = await findMainImage(item_related.title, lang);

      if (best_image !== undefined) {
        break;
      }
    }
  }

  if (best_image === undefined) {
    item.image_url = configPaths.item_empty_image;
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

// async function improveImageFromWikipedia_blocking(
//   item_input: IAtom,
//   ROOT_URL_REST_API: string,
//   ROOT_URL_ACTION_API: string,
//   lang: Tlanguage
// ): Promise<IAtom> {
//   if (item_input === undefined) {
//     return item_input;
//   }

//   const item = { ...item_input };

//   function isValidImage(image: IImage): boolean {
//     // ["jpg", "JPG", "png", "PNG", "tif", "TIF", "svg", "SVG"]
//     // const extension = image.title.slice(-3);

//     // if ((extension === "svg" || extension === "SVG") && image.width < 800) {
//     //   return false;
//     // }
//     if (image.width < 200) {
//       return false;
//     }
//     return true;
//   }

//   //Used to compare the images url with the itemUrl with is the url of the main image (main page)
//   function findImageFromUrl(
//     images: IImage[],
//     itemUrl: string
//   ): IImage | undefined {
//     if (images === undefined || images.length === 0) {
//       return undefined;
//     }

//     const image_list = images.filter((image) => {
//       return image.url === itemUrl;
//     });

//     if (image_list.length === undefined || image_list.length === 0) {
//       return undefined;
//     } else {
//       return image_list[0];
//     }
//   }

//   function findBiggestImage(images: IImage[]): IImage | undefined {
//     if (images === undefined || images.length === 0) {
//       return undefined;
//     }

//     //Filter svg
//     const images_filtered: IImage[] = images.filter((image) => {
//       if (image === undefined) {
//         return false;
//       }
//       const extension = image.title.slice(-3);
//       return !(extension === "svg" || extension === "SVG");
//     });

//     if (images_filtered.length === 0) {
//       return undefined;
//     }

//     const images_sorted_size: IImage[] = images_filtered.sort((a, b) => {
//       if (a.size > b.size) {
//         //a est avant à b
//         return -1;
//       } else {
//         //a est après à b
//         return 1;
//       }
//     });
//     const best_image = images_sorted_size[0];
//     if (!isValidImage(best_image)) {
//       return undefined;
//     }
//     return best_image;
//   }

//   let best_image: IImage;
//   let images = await getAllPageImagesReducedFromWikipediaAction(
//     item.title,
//     width_image_thumbnail,
//     ROOT_URL_ACTION_API
//   );
//   if (images === undefined) {
//     images = [];
//   }

//   best_image = findImageFromUrl(images, item.image_url);

//   let images_en: IImage[] = [];
//   if (best_image === undefined && item.title_en !== "") {
//     //Try with Wikipedia_EN with more front image
//     const ids_en: string[] = await idsFromSearchOrRandomOrTitlesFromWikipedia(
//       item.title_en,
//       ROOT_URL_WIKIPEDIA_EN,
//       -1,
//       "titles"
//     );
//     const atomsList = await getAtomsFromWikipediaAction(
//       ids_en[0],
//       ROOT_URL_WIKIPEDIA_EN,
//       Tlanguage.en
//     );
//     const item_en: IAtom = atomsList[0];

//     if (item_en !== undefined) {
//       images_en = await getAllPageImagesReducedFromWikipediaAction(
//         item_en.title,
//         width_image_thumbnail,
//         ROOT_URL_WIKIPEDIA_EN
//       );
//       if (images_en === undefined) {
//         images_en = [];
//       }
//       best_image = findImageFromUrl(images_en, item_en.image_url);
//     }
//     // console.log(item_en.title, item_en.image_url, images_en);
//   }

//   if (best_image === undefined && images.length > 0) {
//     best_image = findBiggestImage(images);
//   }

//   if (best_image === undefined && images_en.length > 0) {
//     best_image = findBiggestImage(images_en);
//   }
//   if (best_image === undefined) {
//     //Finalyze with related items from wikipedia when no results
//     let items_related: IAtom[] = await ItemsRelatedFromWikipediaRaw(
//       item.title,
//       amount_data_fetched_related_for_images,
//       ROOT_URL_REST_API,
//       ROOT_URL_ACTION_API,
//       lang
//     );

//     items_related = items_related.filter((item) => {
//       return item !== undefined;
//     });

//     for (const item_related of items_related) {
//       // if (best_image === undefined) {
//       const images_related = await getAllPageImagesReducedFromWikipediaAction(
//         item_related.title,
//         width_image_thumbnail,
//         ROOT_URL_ACTION_API
//       );
//       best_image = findImageFromUrl(images_related, item_related.image_url);
//       // }
//       if (best_image !== undefined) {
//         break;
//       }
//     }
//   }

//   if (best_image === undefined) {
//     item.image_url = configPaths.item_empty_image;
//     item.image_height = 1;
//     item.image_width = 1;
//     return item;
//   }

//   // Replace item image by the smaller optimyzed version
//   item.image_url = best_image.thumburl;
//   item.image_height = best_image.thumbheight;
//   item.image_width = best_image.thumbwidth;

//   return item;
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
  lang: Tlanguage
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
async function getFeaturedAtomsFromWikipedia(
  year: string,
  month: string,
  day: string,
  ROOT_URL_REST_API: string,
  lang: Tlanguage
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
      // if (item["thumbnail"] !== undefined) {
      //   atom.thumbnail_url = item["thumbnail"]["source"];
      // }
      list_information_atoms.push(atom);
    });

    return list_information_atoms;
  } catch (error) {
    // console.log(error);
    return [];
  }
}
