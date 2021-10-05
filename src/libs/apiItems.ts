import {
  IAtom,
  Tlanguage,
  configPaths,
  IStaticKnowbookDefinition,
  configGeneral,
  IStaticKnowbookWithItemsDefinition,
} from "../config/globals";
import {
  ItemsFeaturedFromWikipediaWithoutImage,
  ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage,
  ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaCleanImage_blocking,
  improveImageFromWikipediaParallel_blocking,
} from "./fetchBase";
import { configFetching } from "../config/globals";
import {
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
} from "../config/configURLs";
import { fetch_data_local } from "./fetch";

export const amount_data_fetched_items_searched =
  configFetching.amount_data_fetched_items_searched;

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
      // ROOT_URL_WIKIPEDIA_ACTION(lang),
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
    const items: IAtom[] =
      await ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage(
        searchPattern,
        // ROOT_URL_WIKIPEDIA_REST(lang),
        ROOT_URL_WIKIPEDIA_ACTION(lang),
        amount_data_fetched_items_searched,
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

export async function api_getStaticKnowbookWithItemsLocal(
  name: string,
  lang: Tlanguage
): Promise<IStaticKnowbookDefinition> {
  try {
    const result: IStaticKnowbookDefinition = (await fetch_data_local(
      configPaths.static.knowbooks_location.split("/")[1] +
        "/" +
        lang +
        "/" +
        name +
        ".txt"
    )) as IStaticKnowbookDefinition;

    return result;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function api_getAllStaticKnowbooksLocal(): Promise<
  IStaticKnowbookDefinition[]
> {
  try {
    const result: IStaticKnowbookDefinition[] = (await fetch_data_local(
      configPaths.static.knowbooks_location.split("/")[1] +
        "/" +
        configGeneral.staticKnowbooks.name_allStaticKnowbooks
    )) as IStaticKnowbookDefinition[];

    return result;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_getAllStaticKnowbooksExtractWithItemsLocal(
  lang: Tlanguage
): Promise<IStaticKnowbookWithItemsDefinition[]> {
  try {
    const result: IStaticKnowbookWithItemsDefinition[] =
      (await fetch_data_local(
        configPaths.static.knowbooks_location.split("/")[1] +
          "/" +
          lang +
          "/" +
          configGeneral.staticKnowbooks.name_extractStaticKnowbooks
      )) as IStaticKnowbookWithItemsDefinition[];
    return result;
  } catch (error) {
    // console.log(error);
    return [];
  }
}
