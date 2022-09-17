import { GetStaticPaths, GetStaticProps } from "next";
import {
  Tlanguage,
  configPaths,
  IStaticKnowbookWithItemsDefinition,
} from "../config/globals";
import { getAllConfigGui, getDataParamsPage, IPage } from "./getDataParamsPage";
import { getAllStaticKnowbooks } from "./getDataStaticKnowbooksHelpers";
import { readFileJson } from "./utilsServer";

export interface IPageStaticKnowbook extends IPage {
  // nameOrPeriod: string;
  // name_display: string;
  staticKnowbook: IStaticKnowbookWithItemsDefinition;
  // items?: IAtom[];
}

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
async function getConfigDataGuiStaticKnowbook(
  params: any
): Promise<IPageStaticKnowbook> {
  const lang: Tlanguage = params.lang;
  const display = params.display;
  const nameOrPeriod = params.nameOrPeriod;

  const static_path_base = configPaths.static.knowbooks_directory + lang + "/";
  //  + nameOrPeriod + ".txt";

  // const date = new Date();
  // const current_year = date.getFullYear();

  // Toujours traiter l'année en cours donc ignorer
  // if (nameOrPeriod !== DateToStringWithZero(current_year) || is_testing_mode) {
  try {
    const staticKnowbook_with_items: IStaticKnowbookWithItemsDefinition =
      (await readFileJson(
        static_path_base,
        nameOrPeriod + ".txt"
      )) as IStaticKnowbookWithItemsDefinition;

    //************************** CHECKS ****************************************
    // const allStaticKnowbooks = await getAllStaticKnowbooks();
    // const staticKnowbook: IStaticKnowbookDefinition =
    //   await getKnowbookFromAllStaticKnowbooks(
    //     nameOrPeriod,
    //     lang,
    //     allStaticKnowbooks
    //   );
    // const difference =
    //   staticKnowbook.items.length - staticKnowbook_with_items.items.length;
    // if (difference !== 0) {
    //   console.log("Some items not found in this notebook: ");
    //   console.log(nameOrPeriod, lang);
    //   console.log("Amount: ", difference);
    // }

    const datapage: IPage = await getDataParamsPage({
      lang: lang,
      display: display,
    });

    //Ensure related are removed for all items to reduce size and avoid static pages are huge in case related were computed in /public/staticKnowbooks/fr/XX.txt
    //Additionnally, clean all unused attributes item attributes (thumbnail_url )
    if (true) {
      staticKnowbook_with_items.items = staticKnowbook_with_items.items.map(
        (item) => {
          const item_without_related = item;
          item_without_related.related = "";
          item_without_related.thumbnail_url = "";
          return item_without_related;
        }
      );
    }

    const data: IPageStaticKnowbook = {
      paramsPage: datapage.paramsPage,
      GUI_CONFIG: datapage.GUI_CONFIG,
      // nameOrPeriod: staticKnowbook_with_items.nameOrPeriod,
      // name_display: staticKnowbook_with_items.name_display,
      staticKnowbook: staticKnowbook_with_items,
    };

    return data;
  } catch {
    console.log(
      "disk files not found for Static Knowbooks, you need to generate them"
    );
  }
  // }
}

export const I_getStaticPaths: GetStaticPaths = async (context) => {
  // if (configFetching.staticKnowbooks.refreshAllStaticKnowbooks) {
  //   await buildAllStaticKnowbooks();
  // }

  const paths = await getAllConfigStaticKnowbooks();

  return {
    paths,
    fallback: false,
  };
};
export const I_getStaticProps: GetStaticProps = async (context) => {
  const data_with_items: IPageStaticKnowbook =
    await getConfigDataGuiStaticKnowbook(context.params);
  // const data_without_items: IPageStaticKnowbook = {
  //   paramsPage: data_with_items.paramsPage,
  //   nameOrPeriod: data_with_items.nameOrPeriod,
  //   name_display: data_with_items.name_display,
  // };

  if (!data_with_items) {
    return {
      notFound: true,
    };
  }
  return {
    props: data_with_items,
  };
};
