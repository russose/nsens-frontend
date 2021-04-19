import { AtomID, IRelatedAtom, ConfigLanguage } from "../config/globals";
import { ItemsFromWikidata, ItemsRelatedFromWikipedia } from "./fetchRelated";
import { configFetching } from "../config/globals";
import {
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
} from "../config/configURLs";

export const max_amount_data_fetched_items =
  configFetching.amount_data_fetched_items;
// export const url_wikipedia_action = URLs.ROOT_URL_WIKIPEDIA_ACTION;
// export const url_wikipedia_rest = URLs.ROOT_URL_WIKIPEDIA_REST;
export const amount_related = configFetching.amount_related;

export async function _getRelatedFromWikipediaFromWeb(
  // itemId: AtomID,
  title: string,
  lang: ConfigLanguage
): Promise<IRelatedAtom[]> {
  try {
    return ItemsRelatedFromWikipedia(
      title,
      // itemId,
      amount_related,
      ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      lang
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function _getRelatedFromWikidataFromWeb(
  itemId: AtomID,
  lang: ConfigLanguage
): Promise<IRelatedAtom[]> {
  try {
    return ItemsFromWikidata(
      itemId,
      ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      lang
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}
