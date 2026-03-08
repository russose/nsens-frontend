import { GetStaticProps } from "next";
import {
  configBatch,
  EXCLUSION_PATTERNS,
  IKnowbook,
  IKnowbookFull,
  Tlanguage,
} from "../config/globals";
import { readFileJson, writeFileJson } from "./utilsServer";

import {
  IPublicKnowbookDefinition,
  TREND_KEYWORD,
  trendKnowbooksDefinitions,
} from "../config/configStaticKnowbooks";
import {
  ROOT_URL_WIKIMEDIA_TOP_REST,
  ROOT_URL_WIKIPEDIA_ACTION,
  URLs,
} from "../config/configURLs";
import { TitlesBestYearsFromWikipedia } from "./fetchWikiBestPeriod";
import { buildVitalStaticKnowbooksAllLanguages } from "./fetchWikiVitals";
import { sleep } from "./utils";

import { readdir, rename } from "fs/promises";
import { fetchOneKnowbookFromDefinitions } from "./getDataBatch";

export interface IPageBatch {
  knowbooks: IKnowbookFull[];
}

const sleep_in_ms = configBatch.sleep_in_ms;
const amount_best = configBatch.amount_best;

// const start_time_all = Date.now();

async function storeWikipediaDefinitionKnowbooks(): Promise<
  IPublicKnowbookDefinition[]
> {
  let wikipediaTrendVitalKnowbooksDefinitions: IPublicKnowbookDefinition[];
  const name_wikipediaVitalKnowbooks =
    configBatch.name_wikipediaTrendVitalKnowbooks;
  const path_base_data = configBatch.path_base_data;

  try {
    wikipediaTrendVitalKnowbooksDefinitions = (await readFileJson(
      path_base_data,
      name_wikipediaVitalKnowbooks
    )) as IPublicKnowbookDefinition[];

    console.log(
      " =>",
      path_base_data + name_wikipediaVitalKnowbooks,
      "found..., remove it to force its generation if required. Right now, nothing is done..."
    );

    return wikipediaTrendVitalKnowbooksDefinitions;
  } catch {
    console.log(
      " =>",
      path_base_data + name_wikipediaVitalKnowbooks,
      "not found..., generation in progress..."
    );

    wikipediaTrendVitalKnowbooksDefinitions = [];
    const topLevelPattern_ = configBatch.vitalKnowbooks_topLevelPattern;
    const languages_list = Object.values(Tlanguage);
    // const languages_list = Object.values(Tlanguage).filter((language) => {
    //   return languages_activated.includes(language);
    // });

    // TO BE REVIEWED IF staticTrendFeaturedKnowbooks: IKnowbook[] IS THE BEST APPROACH

    //TREND AND FEATURED
    for (const knowbookDefinition of trendKnowbooksDefinitions) {
      const exclusion_patterns: string[] = EXCLUSION_PATTERNS(
        knowbookDefinition.language
      );
      // if (knowbookDefinition.name.includes(TREND_KEYWORD)) {
      for (const lang of languages_list) {
        let titlesItems: string[];

        const name_knowbook_without_keyword =
          knowbookDefinition.name.split(TREND_KEYWORD)[1];

        //Trend Static Knowbook (with years), no items listed
        if (!name_knowbook_without_keyword.includes("-")) {
          titlesItems = await TitlesBestYearsFromWikipedia(
            knowbookDefinition.name,
            "",
            amount_best,
            ROOT_URL_WIKIMEDIA_TOP_REST(lang),
            lang,
            exclusion_patterns
          );
        } else {
          const years: any[] = name_knowbook_without_keyword.split("-");
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

        const knowbookDefinitionWithTitles: IPublicKnowbookDefinition = {
          name: knowbookDefinition.name,
          language: lang,
          items_name: titlesItems,
        };

        wikipediaTrendVitalKnowbooksDefinitions =
          wikipediaTrendVitalKnowbooksDefinitions.concat(
            knowbookDefinitionWithTitles
          );
      }
      // } else {
      //   wikipediaVitalKnowbooks =
      //     wikipediaVitalKnowbooks.concat(knowbookDefinition);
      // }
    }
    //VITALS
    const wikipediaVitalKnowbooks: IKnowbook[] =
      await buildVitalStaticKnowbooksAllLanguages(
        topLevelPattern_,
        ROOT_URL_WIKIPEDIA_ACTION(Tlanguage.en),
        URLs.ROOT_URL_WIKIDATA_ACTION,
        languages_list
      );

    const wikipediaVitalKnowbooksDefinitions: IPublicKnowbookDefinition[] =
      wikipediaVitalKnowbooks.map((knowbook) => {
        return {
          name: knowbook.name,
          language: knowbook.language,
          items_name: knowbook.items,
        };
      });

    wikipediaTrendVitalKnowbooksDefinitions =
      wikipediaTrendVitalKnowbooksDefinitions.concat(
        wikipediaVitalKnowbooksDefinitions
      );

    const success = await writeFileJson(
      path_base_data,
      name_wikipediaVitalKnowbooks,
      wikipediaTrendVitalKnowbooksDefinitions
    );
    if (!success) {
      return [];
    }
    console.log(
      " =>",
      path_base_data + name_wikipediaVitalKnowbooks,
      "saved on disk"
    );
    await sleep(sleep_in_ms);
    return wikipediaTrendVitalKnowbooksDefinitions;
  }
}

async function getConfigDataBatch(params: any): Promise<IPageBatch> {
  const path_base_data_to_process = configBatch.path_base_data_to_process;
  let outputKnowbooks: IKnowbookFull[] = [];

  const DONE_DIRECTORY_NAME = "done";

  const fileNames_ = await readdir(path_base_data_to_process);

  const fileNames = fileNames_.filter((file) => {
    return file !== DONE_DIRECTORY_NAME;
  });

  console.log("The following data files will be processed:", fileNames);

  for (const fileName of fileNames) {
    try {
      const definition_list: IPublicKnowbookDefinition[] = (await readFileJson(
        path_base_data_to_process,
        fileName
      )) as IPublicKnowbookDefinition[];

      for (const definition of definition_list) {
        const knowbook: IKnowbookFull = await fetchOneKnowbookFromDefinitions(
          definition
        );

        console.log(
          "Knowbook:",
          knowbook.name,
          "in",
          knowbook.language,
          "with",
          knowbook.items.length,
          "items"
        );

        if (knowbook !== undefined) {
          outputKnowbooks = outputKnowbooks.concat(knowbook);
        }
      }

      await rename(
        path_base_data_to_process + fileName,
        path_base_data_to_process + DONE_DIRECTORY_NAME + "/" + fileName
      );
    } catch {
      console.log("error in reading data to process file:", fileName);
    }
  }

  console.log("Fetching knowbooks from definition is completed.");

  const data: IPageBatch = {
    knowbooks: outputKnowbooks,
  };

  return data;
}

export const I_getStaticProps: GetStaticProps = async (context) => {
  if (configBatch.refreshWikipediaTrendVitalKnowbooks) {
    await storeWikipediaDefinitionKnowbooks();
  }

  if (
    !configBatch.batchModeKnowbooksCreation ||
    process.env.NODE_ENV === "production"
  ) {
    const empty_data: IPageBatch = {
      knowbooks: [],
    };
    return {
      props: empty_data,
    };
  }

  const data: IPageBatch = await getConfigDataBatch(context.params);

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: data,
  };
};
