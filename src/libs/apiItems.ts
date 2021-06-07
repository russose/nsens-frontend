import { IAtom, ConfigLanguage } from "../config/globals";
import {
  ItemsFeaturedCleanImagesFromWikipedia,
  ItemsFromSearchOrRandomOrTitlesOrMostviewedCleanImagesFromWikipedia,
} from "./fetchBase";
import { configFetching } from "../config/globals";
import {
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
} from "../config/configURLs";
import { fetch_data_local } from "./fetch";

export const max_amount_data_fetched_items =
  configFetching.amount_data_fetched_items;

/**
 * From Web (Client side directly)
 */

export async function api_searchFromWeb(
  searchPattern: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  try {
    return ItemsFromSearchOrRandomOrTitlesOrMostviewedCleanImagesFromWikipedia(
      searchPattern,
      ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      max_amount_data_fetched_items,
      "search",
      lang,
      exclusion_patterns
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_getItemsFromTitlesFromWeb(
  titles_string: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  try {
    return ItemsFromSearchOrRandomOrTitlesOrMostviewedCleanImagesFromWikipedia(
      titles_string,
      ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      -1,
      "titles",
      lang,
      exclusion_patterns
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_getItemsFeaturedFromWeb(
  year: string,
  month: string,
  day: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  try {
    return ItemsFeaturedCleanImagesFromWikipedia(
      year,
      month,
      day,
      ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      lang,
      exclusion_patterns
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_getStaticKnowbooksLocal(
  name: string,
  lang: ConfigLanguage
): Promise<object> {
  try {
    return fetch_data_local(name, lang);
  } catch (error) {
    // console.log(error);
    return [];
  }
}

//WARNING: Mostviewed from QUERY API NOT WORKING WELL, RETURNING OFTEN emply []
// export async function _getItemsMostviewedFromWeb(
//   lang: ConfigLanguage
// ): Promise<IAtom[]> {
//   try {
//     return ItemsFromSearchOrRandomOrTitlesOrMostviewedCleanImagesFromWikipedia(
//       "is empty",
//       ROOT_URL_WIKIPEDIA_REST(lang),
//       ROOT_URL_WIKIPEDIA_ACTION(lang),
//       max_amount_data_fetched_items,
//       "mostviewed",
//       lang
//     );
//   } catch (error) {
//     // console.log(error);
//     return [];
//   }
// }

// export async function _randomFromWeb(lang: ConfigLanguage): Promise<IAtom[]> {
//   try {
//     return ItemsFromSearchOrRandomOrTitlesOrMostviewedCleanImagesFromWikipedia(
//       "is empty",
//       ROOT_URL_WIKIPEDIA_REST(lang),
//       ROOT_URL_WIKIPEDIA_ACTION(lang),
//       max_amount_data_fetched_items,
//       "random",
//       lang
//     );
//   } catch (error) {
//     // console.log(error);
//     return [];
//   }
// }

// export async function _topFromWeb(
//   year: string,
//   month: string,
//   lang: ConfigLanguage
// ): Promise<IAtom[]> {
//   try {
//     return ItemsTopFromWikipedia(
//       year,
//       month,
//       amount_data_fetched_items_static,
//       ROOT_URL_WIKIMEDIA_TOP_REST(lang),
//       ROOT_URL_WIKIPEDIA_REST(lang),
//       ROOT_URL_WIKIPEDIA_ACTION(lang),
//       lang
//     );
//   } catch (error) {
//     // console.log(error);
//     return [];
//   }
// }
