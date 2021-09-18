import { GetStaticPaths, GetStaticProps } from "next";
import {
  configFetching,
  ConfigLanguage,
  configPaths,
  IAtom,
} from "../config/globals";
import { getAllConfigGui, getDataParamsPage, IPage } from "./getDataParamsPage";
import {
  buildAllStaticKnowbooks,
  getAllStaticKnowbooks,
} from "./getDataStaticKnowbooksHelpers";
import { readFileJson } from "./utilsServer";

export interface IPageStaticKnowbooks extends IPage {
  nameOrPeriod: string;
  name_display: string;
  items?: IAtom[];
}

const refreshAllStaticKnowbooks =
  configFetching.staticKnowbooks.refreshAllStaticKnowbooks;

async function getAllConfigStaticKnowbooks() {
  const allStaticKnowbooks = await getAllStaticKnowbooks();
  let guiConfigList: any = [];
  allStaticKnowbooks.forEach((itemStaticKnowbooks) => {
    guiConfigList = guiConfigList.concat(
      getAllConfigGui().map((item_params) => {
        if (itemStaticKnowbooks.lang === item_params.params.lang) {
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
  const lang: ConfigLanguage = params.lang;
  const display = params.display;
  const nameOrPeriod = params.nameOrPeriod;

  const static_path =
    configPaths.static.knowbooks + lang + "/" + nameOrPeriod + ".txt";

  // const date = new Date();
  // const current_year = date.getFullYear();

  // Toujours traiter l'année en cours donc ignorer
  // if (nameOrPeriod !== DateToStringWithZero(current_year) || is_testing_mode) {
  try {
    const staticKnowbook_with_items: any = await readFileJson(static_path);

    const guiConfigDataBestKnowbooks: IPageStaticKnowbooks = {
      paramsPage: (await getDataParamsPage({ lang: lang, display: display }))
        .paramsPage,
      ...staticKnowbook_with_items,
    };
    return guiConfigDataBestKnowbooks;
  } catch {
    console.log(
      "disk files not found for Static Knowbooks, you need to generate them"
    );
  }
  // }
}

export const I_getStaticPaths: GetStaticPaths = async (context) => {
  if (refreshAllStaticKnowbooks) {
    await buildAllStaticKnowbooks();
  }

  const paths = await getAllConfigStaticKnowbooks();

  return {
    paths,
    fallback: false,
  };
};
export const I_getStaticProps: GetStaticProps = async (context) => {
  const data_with_items: IPageStaticKnowbooks =
    await getConfigDataGuiStaticKnowbooks(context.params);
  const data_without_items: IPageStaticKnowbooks = {
    paramsPage: data_with_items.paramsPage,
    nameOrPeriod: data_with_items.nameOrPeriod,
    name_display: data_with_items.name_display,
  };

  if (!data_without_items) {
    return {
      notFound: true,
    };
  }
  return {
    props: data_without_items,
  };
};
