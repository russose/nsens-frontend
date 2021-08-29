import {
  ConfigLanguage,
  configPaths,
  EXCLUSION_PATTERNS,
  IAtom,
  JSONDataT,
} from "../config/globals";
import { fetch_data_wiki_rest } from "./fetch";
import {
  buildListStringSeparated,
  ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaCleanImage_blocking,
} from "./fetchBase";
import { DateToStringWithZero } from "./utils";
import { writeFileJson } from "./utilsServer";

/**
 * Interface
 */

export async function ItemsBestYearFromWikipediaCleanImage_blocking(
  year_start: string,
  year_end: string,
  amount: number,
  ROOT_URL_WIKIMEDIA_TOP_REST: string,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  let atomsList: IAtom[];
  if (year_end === "") {
    atomsList = await ItemsBestYearFromWikipediaRaw(
      year_start,
      amount,
      ROOT_URL_WIKIMEDIA_TOP_REST,
      ROOT_URL_REST_API,
      ROOT_URL_ACTION_API,
      lang,
      exclusion_patterns
    );
  } else {
    atomsList = await ItemsBestMultiYearFromWikipediaRawCleanImage_blocking(
      year_start,
      year_end,
      amount,
      ROOT_URL_WIKIMEDIA_TOP_REST,
      ROOT_URL_REST_API,
      ROOT_URL_ACTION_API,
      lang,
      exclusion_patterns
    );
  }

  // const atomsList_filtered = filterItems(atomsList, exclusion_patterns);
  // const atomsListWithImages = await improveImageFromWikipediaParallel_blocking(
  //   atomsList_filtered,
  //   ROOT_URL_ACTION_API,
  //   ROOT_URL_REST_API,
  //   lang
  // );

  // return atomsListWithImages;
  return atomsList;
}

/**
 * Top Items for many years
 */

async function ItemsBestMultiYearFromWikipediaRawCleanImage_blocking(
  year_start: string,
  year_end: string,
  amount: number,
  ROOT_URL_WIKIMEDIA_TOP_REST: string,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  if (year_start === undefined || year_end === undefined) {
    return [];
  }

  const exclusion_patterns_items: string[] = EXCLUSION_PATTERNS(lang);

  let years: string[] = [];
  let year_ = parseInt(year_start, 10);
  const year_end_number = parseInt(year_end, 10);
  while (year_ <= year_end_number) {
    years.push(year_.toString());
    year_ = year_ + 1;
  }

  const bestItems = new Map<string, number>();

  for (const year of years) {
    let months = Array.from(Array(12).keys()).map((month) => {
      return DateToStringWithZero(month + 1);
    });

    const date = new Date();
    const current_year = date.getFullYear();
    const current_month = date.getMonth() + 1;
    if (year === DateToStringWithZero(current_year)) {
      months = months.slice(0, current_month - 1);
    }

    for (const month of months) {
      try {
        const data: JSONDataT = await fetch_data_wiki_rest(
          year + "/" + month + "/" + "all-days",
          ROOT_URL_WIKIMEDIA_TOP_REST
        );

        data["items"][0]["articles"].forEach((item: JSONDataT) => {
          // if (item["article"] !== undefined && !item["article"].includes(":")) {

          let exclude_item = false;
          exclusion_patterns_items.forEach((pattern) => {
            if (item["article"].includes(pattern)) {
              exclude_item = true;
            }
          });

          if (item["article"] !== undefined && !exclude_item) {
            const article = item["article"];

            if (!bestItems.has(article)) {
              bestItems.set(article, item["views"]);
            } else {
              const views = bestItems.get(article);
              bestItems.set(article, item["views"] + views);
            }

            // return item["article"];
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  //Sort Map by views
  const bestItems_sorted = Array.from(bestItems.entries()).sort((a, b) => {
    if (a[1] > b[1]) {
      //a est avant à b
      return -1;
    } else if (a[1] < b[1]) {
      //a est après à b
      return 1;
    } else {
      return 0;
    }
  });

  const static_path_views =
    configPaths.static.base_cache +
    configPaths.static.cache_nbviews +
    lang +
    "/" +
    year_start +
    "-" +
    year_end +
    ".json";

  await writeFileJson(static_path_views, bestItems_sorted);

  const list_of_PageTitles_ = bestItems_sorted.map((item) => {
    return item[0];
  });

  const list_of_PageTitles = list_of_PageTitles_.slice(0, amount);

  if (list_of_PageTitles.length === 0) {
    return [];
  }

  const list_of_PageTitles_string =
    buildListStringSeparated(list_of_PageTitles);

  const atomsList: IAtom[] =
    await ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaCleanImage_blocking(
      list_of_PageTitles_string,
      ROOT_URL_REST_API,
      ROOT_URL_ACTION_API,
      amount,
      "titles",
      lang,
      exclusion_patterns
    );

  return atomsList;
}

/**
 * Top Items for a year
 */

async function ItemsBestYearFromWikipediaRaw(
  year: string,
  amount: number,
  ROOT_URL_WIKIMEDIA_TOP_REST: string,
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  if (year === undefined) {
    return [];
  }

  const exclusion_patterns_items: string[] = EXCLUSION_PATTERNS(lang);

  try {
    let months = Array.from(Array(12).keys()).map((month) => {
      return DateToStringWithZero(month + 1);
    });

    const date = new Date();
    const current_year = date.getFullYear();
    const current_month = date.getMonth() + 1;
    if (year === DateToStringWithZero(current_year)) {
      months = months.slice(0, current_month - 1);
    }

    const bestItems = new Map<string, number>();

    for (const month of months) {
      const data: JSONDataT = await fetch_data_wiki_rest(
        year + "/" + month + "/" + "all-days",
        ROOT_URL_WIKIMEDIA_TOP_REST
      );

      data["items"][0]["articles"].forEach((item: JSONDataT) => {
        // if (item["article"] !== undefined && !item["article"].includes(":")) {

        let exclude_item = false;
        exclusion_patterns_items.forEach((pattern) => {
          if (item["article"].includes(pattern)) {
            exclude_item = true;
          }
        });

        if (item["article"] !== undefined && !exclude_item) {
          const article = item["article"];

          if (!bestItems.has(article)) {
            bestItems.set(article, item["views"]);
          } else {
            const views = bestItems.get(article);
            bestItems.set(article, item["views"] + views);
          }

          // return item["article"];
        }
      });
    }

    //Sort Map by views
    const bestItems_sorted = Array.from(bestItems.entries()).sort((a, b) => {
      if (a[1] > b[1]) {
        //a est avant à b
        return -1;
      } else if (a[1] < b[1]) {
        //a est après à b
        return 1;
      } else {
        return 0;
      }
    });

    // console.log(bestItems_sorted);

    const static_path_views =
      configPaths.static.base_cache +
      configPaths.static.cache_nbviews +
      lang +
      "/" +
      year +
      ".json";

    await writeFileJson(static_path_views, bestItems_sorted);

    const list_of_PageTitles_ = bestItems_sorted.map((item) => {
      return item[0];
    });

    const list_of_PageTitles = list_of_PageTitles_.slice(0, amount);

    if (list_of_PageTitles.length === 0) {
      return [];
    }

    const list_of_PageTitles_string =
      buildListStringSeparated(list_of_PageTitles);

    const atomsList =
      await ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaCleanImage_blocking(
        list_of_PageTitles_string,
        ROOT_URL_REST_API,
        ROOT_URL_ACTION_API,
        amount,
        "titles",
        lang,
        exclusion_patterns
      );

    // remettre dans l'ordre decroissant de vue
    const use_dangerous_sorting = false;
    if (use_dangerous_sorting) {
      const itemsMap = new Map<string, IAtom>();
      atomsList.forEach((item) => {
        itemsMap.set(item.title.replace(/ /g, "_"), item);
      });

      let atomsList_sorted = list_of_PageTitles.map((title) => {
        if (!itemsMap.has(title)) {
          console.log(title, " not found after sorting!!!");
        }
        return itemsMap.get(title);
      });

      atomsList_sorted = atomsList_sorted.filter((item: any) => {
        return item !== undefined;
      });

      return atomsList_sorted;
    } else {
      return atomsList;
    }
  } catch (error) {
    // console.log(error);
    return [];
  }
}
