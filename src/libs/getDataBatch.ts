import {
  configBatch,
  EXCLUSION_PATTERNS,
  IAtom,
  IKnowbookFull,
} from "../config/globals";

import { IPublicKnowbookDefinition } from "../config/configStaticKnowbooks";
import {
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
} from "../config/configURLs";
import {
  improveImageFromWikipediaParallel_blocking,
  ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage_chunked_Parallel,
} from "./fetchWikiBase";
import { sleep } from "./utils";

import { getBooksEntriesFromSearch } from "./fetchBooksGooglebooks";

export interface IPageBatch {
  knowbooks: IKnowbookFull[];
}

const sleep_in_ms = configBatch.sleep_in_ms;
// const amount_best = configBatch.amount_best;

export async function fetchOneKnowbookFromDefinitions(
  knowbookDefinition: IPublicKnowbookDefinition
): Promise<IKnowbookFull> {
  const lang = knowbookDefinition.language;
  const exclusion_patterns: string[] = EXCLUSION_PATTERNS(lang);
  // const start_time = Date.now();
  let list_of_Pages_titles: string[] = knowbookDefinition.items_name;
  let items: IAtom[] = [];

  if (knowbookDefinition.name.includes("bks")) {
    for (const title of list_of_Pages_titles) {
      const item_list: IAtom[] = await getBooksEntriesFromSearch(
        title,
        lang,
        lang,
        2,
        1
      );
      if (item_list !== undefined && item_list.length !== 0) {
        const item = item_list[0];
        if (item.summary === undefined) {
          item.summary = "";
        }
        if (item.author === undefined) {
          item.author = "";
        }

        items = items.concat(item);
      }
    }
  } else {
    const items_without_images_without_related =
      await ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage_chunked_Parallel(
        list_of_Pages_titles,
        // ROOT_URL_WIKIPEDIA_REST(lang),
        ROOT_URL_WIKIPEDIA_ACTION(lang),
        lang,
        exclusion_patterns
      );

    const items_with_images_without_related: IAtom[] =
      await improveImageFromWikipediaParallel_blocking(
        items_without_images_without_related,
        ROOT_URL_WIKIPEDIA_REST(lang),
        ROOT_URL_WIKIPEDIA_ACTION(lang),
        lang
      );

    items = items_with_images_without_related;
  }

  if (items.length === 0) {
    console.log("There are no items for definition:", knowbookDefinition);
    return undefined;
  }

  const knowbook_with_items: IKnowbookFull = {
    id: -1,
    name: knowbookDefinition.name,
    description: "",
    sourceUrl: "",
    owner: -1,
    language: knowbookDefinition.language,
    public: true,
    nb_saved: 0,
    image_url: "",
    items: items,
  };

  await sleep(sleep_in_ms);

  return knowbook_with_items;
}
