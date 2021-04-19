import { IAtom, ConfigLanguage } from "../config/globals";
import { ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia } from "./fetchItems";
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

/**
 * From Web (Client side directly)
 */

export async function _randomFromWeb(lang: ConfigLanguage): Promise<IAtom[]> {
  try {
    return ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia(
      "is empty",
      ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      max_amount_data_fetched_items,
      "random",
      lang
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function _searchFromWeb(
  searchPattern: string,
  lang: ConfigLanguage
): Promise<IAtom[]> {
  try {
    return ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia(
      searchPattern,
      ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      max_amount_data_fetched_items,
      "search",
      lang
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function _getItemsFromTitlesFromWeb(
  titles_string: string,
  lang: ConfigLanguage
): Promise<IAtom[]> {
  try {
    return ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia(
      titles_string,
      ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      -1,
      "titles",
      lang
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}
