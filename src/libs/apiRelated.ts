import {
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
} from "../config/configURLs";
import {
  AtomID,
  configFetching,
  ConfigLanguage,
  IRelatedAtom,
} from "../config/globals";
import { fetchRelated } from "./fetchRelated";

// export const max_amount_data_fetched_items =
//   configFetching.amount_data_fetched_items;
// export const url_wikipedia_action = URLs.ROOT_URL_WIKIPEDIA_ACTION;
// export const url_wikipedia_rest = URLs.ROOT_URL_WIKIPEDIA_REST;
const amount_related = configFetching.amount_related;

export async function api_getRelatedFromWeb(
  itemId: AtomID,
  title: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IRelatedAtom[]> {
  try {
    return fetchRelated(
      itemId,
      title,
      amount_related,
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

// export async function api_getRelatedFromWikipediaFromWeb(
//   // itemId: AtomID,
//   title: string,
//   lang: ConfigLanguage
// ): Promise<IRelatedAtom[]> {
//   try {
//     return ItemsRelatedFromWikipedia(
//       title,
//       // itemId,
//       amount_related,
//       ROOT_URL_WIKIPEDIA_REST(lang),
//       ROOT_URL_WIKIPEDIA_ACTION(lang),
//       lang
//     );
//   } catch (error) {
//     // console.log(error);
//     return [];
//   }
// }

// export async function api_getRelatedFromWikidataFromWeb(
//   itemId: AtomID,
//   lang: ConfigLanguage
// ): Promise<IRelatedAtom[]> {
//   try {
//     return ItemsFromWikidata(
//       itemId,
//       ROOT_URL_WIKIPEDIA_REST(lang),
//       ROOT_URL_WIKIPEDIA_ACTION(lang),
//       lang
//     );
//   } catch (error) {
//     // console.log(error);
//     return [];
//   }
// }
