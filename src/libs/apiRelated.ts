import {
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
} from "../config/configURLs";
import {
  AtomID,
  configFetching,
  Tlanguage,
  IRelatedAtomFull,
} from "../config/globals";
import {
  fetchRelatedCleanImage_blocking,
  fetchRelatedWithoutImage,
} from "./fetchRelated";

const amount_related_wikipedia = configFetching.amount_related_wikipedia;
const amount_max_by_node_wikidata = configFetching.amount_max_by_node_wikidata;

export async function api_getRelatedFromWebWithoutImage(
  itemId: AtomID,
  title: string,
  lang: Tlanguage,
  exclusion_patterns: string[]
): Promise<IRelatedAtomFull[]> {
  try {
    return fetchRelatedWithoutImage(
      itemId,
      title,
      amount_related_wikipedia,
      amount_max_by_node_wikidata,
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

export async function api_getRelatedFromWebCleanImage_blocking(
  itemId: AtomID,
  title: string,
  lang: Tlanguage,
  exclusion_patterns: string[]
): Promise<IRelatedAtomFull[]> {
  try {
    return fetchRelatedCleanImage_blocking(
      itemId,
      title,
      amount_related_wikipedia,
      amount_max_by_node_wikidata,
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
