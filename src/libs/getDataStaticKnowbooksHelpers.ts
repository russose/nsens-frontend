import { staticTrendFeaturedKnowbooks } from "../config/configStaticKnowbooks";
import {
  ROOT_URL_WIKIMEDIA_TOP_REST,
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
  URLs,
} from "../config/configURLs";
import {
  configFetching,
  configGeneral,
  Tlanguage,
  configPaths,
  EXCLUSION_PATTERNS,
  IAtom,
  IRelatedAtomFull,
  IStaticKnowbookDefinition,
  StaticKnowbookFamilyType,
  languages_activated,
} from "../config/globals";
import {
  improveImageFromWikipediaParallel_blocking,
  ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage_chunked_Parallel,
} from "./fetchBase";
import { TitlesBestYearsFromWikipedia } from "./fetchBestPeriod";
import { fetchRelatedCleanImage_blocking } from "./fetchRelated";
import { buildVitalStaticKnowbooksAllLanguages } from "./fetchVitals";
import { chunk, makeArrayFlat, sleep } from "./utils";
import { readFileJson, writeFileJson } from "./utilsServer";

const amount_related_wikipedia = configFetching.amount_related_wikipedia;
const amount_max_by_node_wikidata = configFetching.amount_max_by_node_wikidata;

const sleep_in_ms = configFetching.staticKnowbooks.sleep_in_ms;
const size_chunk = configFetching.staticKnowbooks.size_chunk;
const amount_best = configFetching.staticKnowbooks.amount_best;

const start_time_all = Date.now();

export async function getKnowbookFromAllStaticKnowbooks(
  nameOrPeriod: string,
  lang: Tlanguage,
  allStaticKnowbooks: IStaticKnowbookDefinition[]
): Promise<IStaticKnowbookDefinition> {
  return allStaticKnowbooks.filter((item: IStaticKnowbookDefinition) => {
    let condition: boolean;
    condition = item.nameOrPeriod === nameOrPeriod && item.lang === lang;
    return condition;
  })[0];
}

export async function getAllStaticKnowbooks(): Promise<
  IStaticKnowbookDefinition[]
> {
  let allStaticKnowbooks: IStaticKnowbookDefinition[];
  const name_allStaticKnowbooks =
    configGeneral.staticKnowbooks.name_allStaticKnowbooks;
  const allStaticKnowbooks_path_base =
    // configPaths.static.knowbooks_location + name_allStaticKnowbooks;
    configPaths.static.knowbooks_location;

  try {
    allStaticKnowbooks = (await readFileJson(
      allStaticKnowbooks_path_base,
      name_allStaticKnowbooks
    )) as IStaticKnowbookDefinition[];

    return allStaticKnowbooks;
  } catch {
    console.log(
      " =>",
      allStaticKnowbooks_path_base + name_allStaticKnowbooks,
      "not found..., generate it..."
    );

    allStaticKnowbooks = [];
    const topLevelPattern_ =
      configGeneral.staticKnowbooks.vitalKnowbooks_topLevelPattern;
    // const languages_list = Object.values(Tlanguage);
    const languages_list = Object.values(Tlanguage).filter((language) => {
      return languages_activated.includes(language);
    });

    const staticTrendFeaturedKnowbooks_ = staticTrendFeaturedKnowbooks;

    //TREND AND FEATURED
    for (const knowbook of staticTrendFeaturedKnowbooks_) {
      const exclusion_patterns: string[] = EXCLUSION_PATTERNS(knowbook.lang);
      if (knowbook.type === StaticKnowbookFamilyType.TREND) {
        for (const lang of languages_list) {
          let titlesItems: string[];

          //Trend Static Knowbook (with years), no items listed
          if (!knowbook.nameOrPeriod.includes("-")) {
            titlesItems = await TitlesBestYearsFromWikipedia(
              knowbook.nameOrPeriod,
              "",
              amount_best,
              ROOT_URL_WIKIMEDIA_TOP_REST(lang),
              lang,
              exclusion_patterns
            );
          } else {
            const years: any[] = knowbook.nameOrPeriod.split("-");
            const year_start = years[0];
            const year_end = years[1];
            titlesItems = await TitlesBestYearsFromWikipedia(
              year_start,
              year_end,
              amount_best,
              ROOT_URL_WIKIMEDIA_TOP_REST(lang),
              lang,
              exclusion_patterns
            );
          }

          const fullKnowbook: IStaticKnowbookDefinition = {
            type: StaticKnowbookFamilyType.TREND,
            nameOrPeriod: knowbook.nameOrPeriod,
            name_display: knowbook.name_display,
            lang: lang,
            items: titlesItems,
          };

          allStaticKnowbooks = allStaticKnowbooks.concat(fullKnowbook);
        }
      } else {
        allStaticKnowbooks = allStaticKnowbooks.concat(knowbook);
      }
    }
    //VITALS
    const allStaticKnowbooks_Vitals =
      await buildVitalStaticKnowbooksAllLanguages(
        topLevelPattern_,
        ROOT_URL_WIKIPEDIA_ACTION(Tlanguage.en),
        URLs.ROOT_URL_WIKIDATA_ACTION,
        languages_list
      );
    allStaticKnowbooks = allStaticKnowbooks.concat(allStaticKnowbooks_Vitals);

    await writeFileJson(
      allStaticKnowbooks_path_base,
      name_allStaticKnowbooks,
      allStaticKnowbooks
    );
    console.log(
      " =>",
      allStaticKnowbooks_path_base + name_allStaticKnowbooks,
      "saved on disk"
    );
    await sleep(sleep_in_ms);
    return allStaticKnowbooks;
  }
}

async function addImagesAndGetRelatedCleanImage_chunked_Parallel(
  list_of_items: IAtom[],
  ROOT_URL_REST_API: string,
  ROOT_URL_ACTION_API: string,
  lang: Tlanguage,
  exclusion_patterns: string[]
): Promise<IAtom[]> {
  async function treatment(item_: IAtom): Promise<IAtom> {
    const item_list: IAtom[] = await improveImageFromWikipediaParallel_blocking(
      [item_],
      ROOT_URL_REST_API,
      ROOT_URL_ACTION_API,
      lang
    );
    const item__ = item_list[0];
    const related: IRelatedAtomFull[] = await fetchRelatedCleanImage_blocking(
      // const related: IRelatedAtomFull[] = await fetchRelatedWithoutImage(
      item__.id,
      item__.title,
      amount_related_wikipedia,
      amount_max_by_node_wikidata,
      ROOT_URL_REST_API,
      ROOT_URL_ACTION_API,
      lang,
      exclusion_patterns
    );

    // console.log(item__.title, "Lenght related: ", related.length);

    item__.related = JSON.stringify(related);
    return item__;
  }

  async function treatment_Parallel(list_of_items_: IAtom[]): Promise<IAtom[]> {
    const myBigPromise = await Promise.all(
      list_of_items_.map((item) => {
        return treatment(item);
        // .catch((e) => {
        //   console.log(e);
        //   console.log(" => error in Promise All 3");
        //   return undefined;
        // });
      })
    );
    return myBigPromise;
  }

  const size_chunk_ = size_chunk;
  const list_chucks_of_items_without_images_without_related: IAtom[][] = chunk(
    list_of_items,
    size_chunk_
  );

  const list_chucks_of_items_with_images_with_related: IAtom[][] = [];
  for (const chunk_ of list_chucks_of_items_without_images_without_related) {
    const items_chunked_with_images_and_related: IAtom[] =
      await treatment_Parallel(chunk_);
    console.log("Progress: chunk completed");
    await sleep(sleep_in_ms);
    list_chucks_of_items_with_images_with_related.push(
      items_chunked_with_images_and_related
    );
  }

  const items_flat: IAtom[] = makeArrayFlat(
    list_chucks_of_items_with_images_with_related
  );
  return items_flat;
}

async function buildOneStaticKnowbooks(
  nameOrPeriod: string,
  lang: Tlanguage,
  allStaticKnowbooks: IStaticKnowbookDefinition[]
): Promise<void> {
  const exclusion_patterns: string[] = EXCLUSION_PATTERNS(lang);
  const static_path_base = configPaths.static.knowbooks_location + lang + "/";
  //  + nameOrPeriod + ".txt";
  const static_name = nameOrPeriod + ".txt";

  try {
    await readFileJson(static_path_base, static_name);
    console.log(static_path_base + static_name, "already exist, skipping...");
    return;
  } catch {
    console.log(static_path_base + static_name, "creation...");
  }

  const start_time = Date.now();
  const staticKnowbook = await getKnowbookFromAllStaticKnowbooks(
    nameOrPeriod,
    lang,
    allStaticKnowbooks
  );

  let list_of_Pages_titles: string[] = staticKnowbook.items;

  let items: IAtom[];

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

  if (staticKnowbook.type !== StaticKnowbookFamilyType.TREND) {
    const items_with_images_with_related: IAtom[] =
      await addImagesAndGetRelatedCleanImage_chunked_Parallel(
        items_without_images_without_related,
        ROOT_URL_WIKIPEDIA_REST(lang),
        ROOT_URL_WIKIPEDIA_ACTION(lang),
        lang,
        exclusion_patterns
      );
    items = items_with_images_with_related;
  } else {
    items = items_with_images_without_related;
  }

  const name_display =
    staticKnowbook.name_display !== undefined
      ? staticKnowbook.name_display
      : staticKnowbook.nameOrPeriod;

  const staticKnowbook_with_items: any = {
    nameOrPeriod: nameOrPeriod,
    name_display: name_display,
    items: items,
  };

  await writeFileJson(static_path_base, static_name, staticKnowbook_with_items);

  console.log("**** Summary Page *********");
  console.log(nameOrPeriod);
  console.log("size_chunk: ", size_chunk);
  console.log("Duration Page: ", (Date.now() - start_time) / 1000);
  console.log("Amount Items: ", items.length);
  console.log(
    "Duration per item: ",
    (Date.now() - start_time) / 1000 / items.length
  );
  console.log("Duration Total: ", (Date.now() - start_time_all) / 1000);
}

export async function buildAllStaticKnowbooks(): Promise<void> {
  const allStaticKnowbooks = await getAllStaticKnowbooks();

  // allStaticKnowbooks.forEach((knowbook) => {
  //   console.log("********************");
  //   console.log(knowbook.nameOrPeriod);
  //   console.log(knowbook.items.length);
  // });

  for (const knowbook of allStaticKnowbooks) {
    await buildOneStaticKnowbooks(
      knowbook.nameOrPeriod,
      knowbook.lang,
      allStaticKnowbooks
    );
  }
}
