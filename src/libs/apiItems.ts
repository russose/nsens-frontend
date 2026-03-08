import { IAtom, Tlanguage } from "../config/globals";
import {
  ItemsFeaturedFromWikipediaWithoutImage,
  ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage,
  ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaCleanImage_blocking,
  improveImageFromWikipediaParallel_blocking,
} from "./fetchWikiBase";
import { configFetching } from "../config/globals";
import {
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
} from "../config/configURLs";

/**
 * From Web (Client side directly)
 */

export async function api_getCleanImageFromWeb_blocking(
  atoms: IAtom[],
  lang: Tlanguage
): Promise<IAtom[]> {
  try {
    const items: IAtom[] = await improveImageFromWikipediaParallel_blocking(
      atoms,
      ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      lang
    );

    return items;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_getItemsFeaturedFromWebWithoutImage(
  year: string,
  month: string,
  day: string,
  lang: Tlanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  try {
    const items: IAtom[] = await ItemsFeaturedFromWikipediaWithoutImage(
      year,
      month,
      day,
      ROOT_URL_WIKIPEDIA_REST(lang),
      lang,
      exclusion_patterns
    );

    return items;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_searchFromWebWithoutImage(
  searchPattern: string,
  lang: Tlanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  try {
    const searchPattern_truncated = searchPattern.slice(
      0,
      configFetching.max_size_searchString_wikipedia_arxiv
    );

    const items: IAtom[] =
      await ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage(
        searchPattern_truncated,
        ROOT_URL_WIKIPEDIA_ACTION(lang),
        configFetching.amount_data_fetched_items_searched,
        "search",
        lang,
        exclusion_patterns
      );

    return items;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_getItemsFromTitlesFromWebCleanImage_blocking(
  titles_string: string,
  lang: Tlanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  try {
    return ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaCleanImage_blocking(
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
