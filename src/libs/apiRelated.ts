import {
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
} from "../config/configURLs";
import {
  AtomID,
  configFetching,
  IKnowbook,
  IRelatedAtomFull,
  KnowbookID,
  Tlanguage,
} from "../config/globals";
import { my_api } from "./fetch";
import {
  fetchWikidataRelatedWithoutImage,
  fetchWikipediaRelatedWithoutImage,
} from "./fetchWikiRelated";

const amount_max_by_node_wikidata = configFetching.amount_max_by_node_wikidata;

// const amount_publicKnowbook_network =
//   configFetching.amount_publicKnowbook_network;

export async function api_getWikipediaRelatedFromWebWithoutImage(
  itemId: AtomID,
  title: string,
  lang: Tlanguage,
  exclusion_patterns: string[],
  relation_name: string,
  amount_related_wikipedia: number
): Promise<IRelatedAtomFull[]> {
  try {
    return fetchWikipediaRelatedWithoutImage(
      itemId,
      title,
      amount_related_wikipedia,
      // amount_max_by_node_wikidata,
      ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      lang,
      exclusion_patterns,
      relation_name
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_getWikidataRelatedFromWebWithoutImage(
  itemId: AtomID,
  title: string,
  lang: Tlanguage,
  exclusion_patterns: string[],
  relation_name: string
): Promise<IRelatedAtomFull[]> {
  try {
    return fetchWikidataRelatedWithoutImage(
      itemId,
      title,
      // amount_related_wikipedia,
      amount_max_by_node_wikidata,
      // ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      lang,
      exclusion_patterns,
      relation_name
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_getPublicKnowbooksWithTheseItems(
  itemIds: AtomID[],
  lang: Tlanguage,
  amount: number
): Promise<IKnowbook[]> {
  try {
    const res = await my_api(
      "get",
      "/public/knowbooksPublic/withItems" +
        "/" +
        lang +
        "/" +
        amount +
        "/" +
        JSON.stringify(itemIds),
      {}
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_getPublicKnowbooksSharingItems(
  knowbookId: KnowbookID,
  lang: Tlanguage,
  amount: number
): Promise<IKnowbook[]> {
  try {
    const res = await my_api(
      "get",
      "/public/knowbooksPublic/sharingItems" +
        "/" +
        lang +
        "/" +
        knowbookId +
        "/" +
        amount,
      {}
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

// export async function api_getWikiRelatedFromWebWithoutImage(
//   itemId: AtomID,
//   title: string,
//   lang: Tlanguage,
//   exclusion_patterns: string[]
// ): Promise<IRelatedAtomFull[]> {
//   try {
//     return fetchWikiRelatedWithoutImage(
//       itemId,
//       title,
//       amount_related_wikipedia,
//       amount_max_by_node_wikidata,
//       ROOT_URL_WIKIPEDIA_REST(lang),
//       ROOT_URL_WIKIPEDIA_ACTION(lang),
//       lang,
//       exclusion_patterns
//     );
//   } catch (error) {
//     // console.log(error);
//     return [];
//   }
// }

// export async function api_getRelatedFromWebCleanImage_blocking(
//   itemId: AtomID,
//   title: string,
//   lang: Tlanguage,
//   exclusion_patterns: string[]
// ): Promise<IRelatedAtomFull[]> {
//   try {
//     return fetchRelatedCleanImage_blocking(
//       itemId,
//       title,
//       amount_related_wikipedia,
//       amount_max_by_node_wikidata,
//       ROOT_URL_WIKIPEDIA_REST(lang),
//       ROOT_URL_WIKIPEDIA_ACTION(lang),
//       lang,
//       exclusion_patterns
//     );
//   } catch (error) {
//     // console.log(error);
//     return [];
//   }
// }
