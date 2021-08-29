import {
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
} from "../config/configURLs";
import {
  AtomID,
  configFetching,
  ConfigLanguage,
  IRelatedAtomFull,
} from "../config/globals";
import {
  fetchRelatedCleanImage_blocking,
  fetchRelatedWithoutImage,
} from "./fetchRelated";

const amount_related = configFetching.amount_related;

export async function api_getRelatedFromWebWithoutImage(
  itemId: AtomID,
  title: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IRelatedAtomFull[]> {
  try {
    return fetchRelatedWithoutImage(
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

export async function api_getRelatedFromWebCleanImage_blocking(
  itemId: AtomID,
  title: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IRelatedAtomFull[]> {
  try {
    return fetchRelatedCleanImage_blocking(
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
