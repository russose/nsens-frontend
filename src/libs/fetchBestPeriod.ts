import {
  ConfigLanguage,
  configPaths,
  EXCLUSION_PATTERNS,
  JSONDataT,
} from "../config/globals";
import { fetch_data_wiki_rest } from "./fetch";
import { DateToStringWithZero, filterTitlesListFromPatterns } from "./utils";
import { writeFileJson } from "./utilsServer";

/**
 * Interface
 */

export async function TitlesBestYearsFromWikipedia(
  year_start: string,
  year_end: string,
  amount: number,
  ROOT_URL_WIKIMEDIA_TOP_REST: string,
  lang: ConfigLanguage,
  exclusion_patterns: string[]
): Promise<string[]> {
  let list_of_PageTitles: string[];
  if (year_end === "") {
    list_of_PageTitles = await TitlesItemsBestYearFromWikipediaRaw(
      year_start,
      ROOT_URL_WIKIMEDIA_TOP_REST,
      lang
    );
  } else {
    list_of_PageTitles = await TitlesItemsBestMultiYearFromWikipediaRaw(
      year_start,
      year_end,
      ROOT_URL_WIKIMEDIA_TOP_REST,
      lang
    );
  }

  const list_of_PageTitles_filtered = filterTitlesListFromPatterns(
    list_of_PageTitles,
    exclusion_patterns
  );

  return list_of_PageTitles_filtered.slice(0, amount);
}

/************************************************************************************************** */

/**
 * Top Items for many years
 */

async function TitlesItemsBestMultiYearFromWikipediaRaw(
  year_start: string,
  year_end: string,
  ROOT_URL_WIKIMEDIA_TOP_REST: string,
  lang: ConfigLanguage
): Promise<string[]> {
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

  const list_of_PageTitles = bestItems_sorted.map((item) => {
    return item[0];
  });

  return list_of_PageTitles;
}

/**
 * Top Items for a year
 */

async function TitlesItemsBestYearFromWikipediaRaw(
  year: string,
  ROOT_URL_WIKIMEDIA_TOP_REST: string,
  lang: ConfigLanguage
): Promise<string[]> {
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

    const list_of_PageTitles = bestItems_sorted.map((item) => {
      return item[0];
    });

    return list_of_PageTitles;
  } catch (error) {
    // console.log(error);
    return [];
  }
}
