import {
  JSONDataT,
  ConfigLanguage,
  IStaticKnowbookDefinition,
  configFetching,
  StaticKnowbookFamilyType,
} from "../config/globals";
import { fetch_data_wiki_action } from "./fetch";
import { buildListStringSeparated } from "./fetchBase";
import { capitalizeFirstLetter, chunk } from "./utils";

const max_size_api = configFetching.max_size_chunk_api;

type itemTitleT = string;
type vitalTreeMapT = Map<string, itemTitleT[]>;

/**
 * Interfaces
 */

export async function buildVitalStaticKnowbooksAllLanguages(
  topLevelPattern: string,
  ROOT_URL_ACTION_API: string,
  ROOT_URL_WIKIDATA_ACTION: string,
  langs: ConfigLanguage[]
): Promise<IStaticKnowbookDefinition[]> {
  const vitalKnowbooksEnglish = await buildVitalStaticKnowbooksEnglish(
    topLevelPattern,
    ROOT_URL_ACTION_API
  );

  const vitalKnowbooksAllLanguages = await vitalStaticKnowbooksAllLanguages(
    vitalKnowbooksEnglish,
    ROOT_URL_WIKIDATA_ACTION,
    langs
  );

  const vitalKnowbooksAllLanguages_FirstLetterCap =
    vitalKnowbooksAllLanguages.map((knowbook) => {
      const knowbook_ = knowbook;
      knowbook_.name_display = capitalizeFirstLetter(knowbook_.name_display);
      return knowbook_;
    });

  return vitalKnowbooksAllLanguages_FirstLetterCap;
}

/**
 * Library
 */

async function vitalStaticKnowbooksAllLanguages(
  vitalKnowbooksEnglish: IStaticKnowbookDefinition[],
  ROOT_URL_WIKIDATA_ACTION: string,
  langs: ConfigLanguage[]
): Promise<IStaticKnowbookDefinition[]> {
  const languages_without_English = langs.filter((language) => {
    return language !== ConfigLanguage.en;
  });

  const vitalKnowbooksAllLanguages: IStaticKnowbookDefinition[] = [
    ...vitalKnowbooksEnglish,
  ];

  for (const knowbookEnglish of vitalKnowbooksEnglish) {
    const items_to_find_in_other_languages: itemTitleT[] = [
      knowbookEnglish.nameOrPeriod,
    ].concat(knowbookEnglish.items);

    const items_in_other_languages_Map: Map<ConfigLanguage, itemTitleT[]> =
      await getTitlesinAllLanguages_chunked(
        items_to_find_in_other_languages,
        ROOT_URL_WIKIDATA_ACTION,
        languages_without_English
      );

    if (items_in_other_languages_Map !== undefined) {
      const languages_of_Map = Array.from(items_in_other_languages_Map.keys());
      languages_of_Map.forEach((lang) => {
        const items_in_other_languages = items_in_other_languages_Map.get(lang);
        const name = items_in_other_languages[0];
        const items = items_in_other_languages.slice(1);

        const vitalKnowbook: IStaticKnowbookDefinition = {
          type: StaticKnowbookFamilyType.VITAL,
          nameOrPeriod: name,
          name_display: name,
          lang: lang,
          items: items,
        };
        vitalKnowbooksAllLanguages.push(vitalKnowbook);
      });
    }
  }

  return vitalKnowbooksAllLanguages;
}

/********************************************************************************/

async function getTitlesinAllLanguages_chunked(
  itemTitles: itemTitleT[],
  ROOT_URL_WIKIDATA_ACTION: string,
  langs: ConfigLanguage[]
): Promise<Map<ConfigLanguage, itemTitleT[]>> {
  const itemTitles_chunked: itemTitleT[][] = chunk(itemTitles, max_size_api);

  const titlesMap_chunked: Map<ConfigLanguage, itemTitleT[]>[] = [];
  for (const itemTitles_ of itemTitles_chunked) {
    const output_i: Map<ConfigLanguage, itemTitleT[]> =
      await getTitlesinAllLanguages(
        itemTitles_,
        ROOT_URL_WIKIDATA_ACTION,
        langs
      );
    titlesMap_chunked.push(output_i);
  }

  const titlesMap: Map<ConfigLanguage, itemTitleT[]> = new Map();
  titlesMap_chunked.forEach((titlesMap_part) => {
    titlesMap_part.forEach((value, key) => {
      if (titlesMap.get(key) !== undefined) {
        titlesMap.set(key, titlesMap.get(key).concat(value));
      } else {
        titlesMap.set(key, value);
      }
    });
  });

  return titlesMap;
}

async function getTitlesinAllLanguages(
  itemTitles: itemTitleT[],
  ROOT_URL_WIKIDATA_ACTION: string,
  langs: ConfigLanguage[]
): Promise<Map<ConfigLanguage, itemTitleT[]>> {
  const titles = buildListStringSeparated(itemTitles);
  const languages = buildListStringSeparated(langs);

  const PARAMS = {
    action: "wbgetentities",
    format: "json",
    sites: "enwiki",
    titles: titles,
    props: "labels",
    languages: languages,
    utf8: 1,
    // maxage: cache_duration_in_sec, //1 semaine pour le cache
  };

  try {
    const data = await fetch_data_wiki_action(
      ROOT_URL_WIKIDATA_ACTION,
      PARAMS,
      false
    );

    if (data["entities"] === undefined) {
      return undefined;
    }

    const itemTitlesMap = new Map<ConfigLanguage, itemTitleT[]>();
    langs.forEach((lang) => {
      itemTitlesMap.set(lang, []);
    });

    Object.values(data["entities"]).forEach((item: JSONDataT) => {
      if (item["labels"] !== undefined) {
        Object.values(item["labels"]).forEach((label: JSONDataT) => {
          if (label["language"] !== undefined && label["value"] !== undefined) {
            const lang = label["language"];
            const value = label["value"];
            const itemTitles = itemTitlesMap.get(lang);
            itemTitles.push(value);
            itemTitlesMap.set(lang, itemTitles);
          }
        });
      }
    });

    return itemTitlesMap;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

async function buildVitalStaticKnowbooksEnglish(
  topLevelPattern: string,
  ROOT_URL_ACTION_API: string
): Promise<IStaticKnowbookDefinition[]> {
  const vitalTreeMap: vitalTreeMapT = await buildVitalTree(
    topLevelPattern,
    ROOT_URL_ACTION_API
  );

  const vitalKnowbooks: IStaticKnowbookDefinition[] = [];

  for (const category of Array.from(vitalTreeMap.keys())) {
    if (category === undefined) {
      console.log("category undefined");
    }
    vitalKnowbooks.push({
      type: StaticKnowbookFamilyType.VITAL,
      nameOrPeriod: category,
      name_display: category,
      lang: ConfigLanguage.en,
      items: vitalTreeMap.get(category),
    });
  }

  return vitalKnowbooks;
}

async function buildVitalTree(
  topLevelPattern: string,
  ROOT_URL_ACTION_API: string
): Promise<vitalTreeMapT> {
  const vitalTreeMap: vitalTreeMapT = new Map<string, itemTitleT[]>();

  const categories: string[] = await fetchCategoryMembers(
    topLevelPattern,
    ROOT_URL_ACTION_API
  );

  for (const category of categories) {
    const articleTitles: itemTitleT[] = await fetchCategoryMembers(
      category,
      ROOT_URL_ACTION_API
    );

    vitalTreeMap.set(category, articleTitles);
  }

  //Clean Map
  for (const category of categories) {
    const category_clean: string = category.split("in ")[1];
    const articleTitles_clean: itemTitleT[] = vitalTreeMap
      .get(category)
      .map((title) => {
        return title.split(":")[1];
      });

    vitalTreeMap.set(category_clean, articleTitles_clean);
    vitalTreeMap.delete(category);
    if (vitalTreeMap.get(category_clean).length === 0) {
      vitalTreeMap.delete(category_clean);
    }
  }

  //BUG: Move items (currently only Planet) from "an unknown topic" to "Science"
  const oldCat = "an unknown topic";
  const newCat = "Science";
  vitalTreeMap.set(
    newCat,
    vitalTreeMap.get(newCat).concat(vitalTreeMap.get(oldCat))
  );
  vitalTreeMap.delete(oldCat);

  return vitalTreeMap;
}

async function fetchCategoryMembers(
  category: string,
  ROOT_URL_ACTION_API: string
): Promise<string[]> {
  const PARAMS = {
    action: "query",
    format: "json",
    list: "categorymembers",
    utf8: 1,
    cmtitle: category,
    cmprop: "title|type",
    cmlimit: "1000",
    // maxage: cache_duration_in_sec, //1 semaine pour le cache
  };

  try {
    const data = await fetch_data_wiki_action(
      ROOT_URL_ACTION_API,
      PARAMS,
      false
    );

    if (
      data["query"] === undefined ||
      data["query"]["categorymembers"] === undefined
    ) {
      return [];
    }

    const categoryMembers: string[] = [];
    Object.values(data["query"]["categorymembers"]).forEach(
      (item: JSONDataT) => {
        // if (item["title"] !== undefined && item["type"] === "subcat") {
        if (item["title"] !== undefined) {
          categoryMembers.push(item["title"]);
        }
      }
    );

    return categoryMembers;
  } catch (error) {
    // console.log(error);
    return [];
  }
}
