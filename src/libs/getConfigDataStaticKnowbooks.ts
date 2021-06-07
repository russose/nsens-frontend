import { GetStaticPaths, GetStaticProps } from "next";
import { staticKnowbooks } from "../config/configStaticKnowbooks";
import {
  ROOT_URL_WIKIMEDIA_TOP_REST,
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
} from "../config/configURLs";

import {
  configFetching,
  configPaths,
  EXCLUSION_PATTERNS,
  IAtom,
  IRelatedAtom,
  IStaticKnowbookDefinition,
} from "../config/globals";
import { api_getRelatedFromWeb } from "./apiRelated";
import {
  buildListStringSeparated,
  ItemsFromSearchOrRandomOrTitlesOrMostviewedCleanImagesFromWikipedia,
} from "./fetchBase";
import { ItemsBestYearFromWikipedia } from "./fetchBestServer";
import { getAllConfigGui, getConfigDataGui, IPage } from "./getConfigDataGui";
import { DateToStringWithZero } from "./utils";
import { readFileJson, writeFileJson } from "./utilsServer";

export interface IPageStaticKnowbooks extends IPage {
  nameOrPeriod: string;
  name_display: string;
  items: IAtom[];
}

function findItemFromstaticKnowbooksDefinition(
  nameOrPeriod: string
): IStaticKnowbookDefinition {
  return staticKnowbooks.filter((item: any) => {
    return item.nameOrPeriod === nameOrPeriod;
  })[0];
}

function getAllConfigStaticKnowbooks() {
  let guiConfigList: any = [];

  staticKnowbooks.forEach((itemStaticKnowbooks) => {
    guiConfigList = guiConfigList.concat(
      getAllConfigGui().map((item_params) => {
        if (
          itemStaticKnowbooks.lang === "" ||
          itemStaticKnowbooks.lang === item_params.params.lang
        ) {
          return {
            params: {
              ...item_params.params,
              nameOrPeriod: itemStaticKnowbooks.nameOrPeriod,
            },
          };
        } else {
          return undefined;
        }
      })
    );
  });

  guiConfigList = guiConfigList.filter((item: any) => {
    return item !== undefined;
  });
  return guiConfigList;
}

//https://stackabuse.com/reading-and-writing-json-files-with-node-js/
async function getConfigDataGuiStaticKnowbooks(
  params: any
): Promise<IPageStaticKnowbooks> {
  const lang = params.lang;
  const display = params.display;
  const nameOrPeriod = params.nameOrPeriod;

  const exclusion_patterns_items: string[] = EXCLUSION_PATTERNS(lang);

  const static_path =
    configPaths.static.knowbooks + lang + "/" + nameOrPeriod + ".json";

  const date = new Date();
  const current_year = date.getFullYear();

  if (nameOrPeriod !== DateToStringWithZero(current_year)) {
    try {
      const staticKnowbook: any = await readFileJson(static_path);
      // console.log(static_path + " used from cache");
      const guiConfigDataBestKnowbooks = {
        guiConfigData: (
          await getConfigDataGui({ lang: lang, display: display })
        ).guiConfigData,
        ...staticKnowbook,
      };
      return guiConfigDataBestKnowbooks;
    } catch {
      // console.log(static_path + " not found, fetched from internet...");
    }
  }

  let items: IAtom[];
  if (findItemFromstaticKnowbooksDefinition(nameOrPeriod).items === undefined) {
    if (!nameOrPeriod.includes("-")) {
      items = await ItemsBestYearFromWikipedia(
        nameOrPeriod,
        "",
        configFetching.amount_data_fetched_items,
        ROOT_URL_WIKIMEDIA_TOP_REST(lang),
        ROOT_URL_WIKIPEDIA_REST(lang),
        ROOT_URL_WIKIPEDIA_ACTION(lang),
        lang,
        exclusion_patterns_items
      );
    } else {
      const years: any[] = nameOrPeriod.split("-");
      const year_start = years[0];
      const year_end = years[1];
      items = await ItemsBestYearFromWikipedia(
        year_start,
        year_end,
        configFetching.amount_data_fetched_items,
        ROOT_URL_WIKIMEDIA_TOP_REST(lang),
        ROOT_URL_WIKIPEDIA_REST(lang),
        ROOT_URL_WIKIPEDIA_ACTION(lang),
        lang,
        exclusion_patterns_items
      );
    }
  } else {
    const list_of_Pages_titles =
      findItemFromstaticKnowbooksDefinition(nameOrPeriod).items;

    const list_of_Pages_titles_string =
      buildListStringSeparated(list_of_Pages_titles);
    items =
      await ItemsFromSearchOrRandomOrTitlesOrMostviewedCleanImagesFromWikipedia(
        list_of_Pages_titles_string,
        ROOT_URL_WIKIPEDIA_REST(lang),
        ROOT_URL_WIKIPEDIA_ACTION(lang),
        configFetching.amount_data_fetched_items,
        "titles",
        lang,
        exclusion_patterns_items
      );

    let items_with_related: IAtom[] = [];
    for (const item of items) {
      const related: IRelatedAtom[] = await api_getRelatedFromWeb(
        item.id,
        item.title,
        lang,
        exclusion_patterns_items
      );
      item.related = JSON.stringify(related);
      items_with_related.push(item);
    }
    items = items_with_related;
  }

  let name_display = "";
  staticKnowbooks.forEach((staticKnowbook) => {
    if (staticKnowbook.nameOrPeriod === nameOrPeriod) {
      name_display =
        staticKnowbook.display !== undefined
          ? staticKnowbook.display
          : staticKnowbook.nameOrPeriod;
    }
  });

  const staticKnowbook: any = {
    nameOrPeriod: nameOrPeriod,
    name_display: name_display,
    items: items,
  };

  const guiConfigDataBestKnowbooks = {
    guiConfigData: (await getConfigDataGui({ lang: lang, display: display }))
      .guiConfigData,
    ...staticKnowbook,
  };

  await writeFileJson(static_path, staticKnowbook);

  return guiConfigDataBestKnowbooks;
}

export const I_getStaticPaths: GetStaticPaths = async (context) => {
  const paths = getAllConfigStaticKnowbooks();
  return {
    paths,
    fallback: false,
  };
};
export const I_getStaticProps: GetStaticProps = async (context) => {
  const data = await getConfigDataGuiStaticKnowbooks(context.params);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: data,
  };
};
