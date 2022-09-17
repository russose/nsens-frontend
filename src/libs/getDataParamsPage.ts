import { configDataDesktop } from "./../config/configDataDesktop";
import { configDataMobile } from "./../config/configDataMobile";
import { configDataEn } from "./../config/configDataEn";
import { configDataIt } from "./../config/configDataIt";
import { configDataFr } from "./../config/configDataFr";
import {
  Tlanguage,
  IparamsPage,
  languages_activated,
  TDisplay,
  TconfigDataLanguage,
  TconfigDataDisplay,
  IGUICONFIG,
} from "../config/globals";
import { GetStaticPaths, GetStaticProps } from "next";

export interface IPage {
  paramsPage: IparamsPage;
  GUI_CONFIG: IGUICONFIG;
}

// interface IParamsContent {
//   lang: Tlanguage;
//   display: TDisplay;
// }

export interface IParamsBase {
  // params: IParamsContent;
  params: IparamsPage;
}

export function getAllConfigGui(): IParamsBase[] {
  const languages_list = Object.values(Tlanguage).filter((language) => {
    return languages_activated.includes(language);
  });
  const displays_list: TDisplay[] = Object.values(TDisplay);

  const guiConfigList: any[] = [];
  // const guiConfigList: IParamsBase[] = languages_list.map((language) => {
  //   return { params: { lang: language } };
  // });
  languages_list.forEach((language) => {
    displays_list.forEach((display) => {
      const guiConfig = { params: { lang: language, display: display } };
      guiConfigList.push(guiConfig);
    });
  });

  return guiConfigList;
}

function getGUI_CONFIG_Data(paramsPage: IparamsPage) {
  if (
    paramsPage === undefined ||
    paramsPage.lang === undefined ||
    paramsPage.display === undefined
  ) {
    return;
  }
  const lang = paramsPage.lang;
  const display = paramsPage.display;

  let configDataLang: TconfigDataLanguage;
  if (lang === Tlanguage.fr) {
    configDataLang = configDataFr;
  } else if (lang === Tlanguage.it) {
    configDataLang = configDataIt;
  } else if (lang === Tlanguage.en) {
    configDataLang = configDataEn;
  }

  let configDataDisplay: TconfigDataDisplay;
  if (display === TDisplay.mobile) {
    configDataDisplay = configDataMobile;
  } else if (display === TDisplay.desktop) {
    configDataDisplay = configDataDesktop;
  }

  const GUI_CONFIG: IGUICONFIG = {
    language: configDataLang,
    display: configDataDisplay,
    id: paramsPage.lang + "-" + paramsPage.display,
  };

  return GUI_CONFIG;
}

export async function getDataParamsPage(params: any): Promise<IPage> {
  const lang = params.lang;
  const display = params.display;
  const GUI_CONFIG = getGUI_CONFIG_Data({ lang: lang, display: display });

  const paramsPage: IparamsPage = {
    lang: lang,
    display: display,
  };

  const paramsPageData = {
    paramsPage: paramsPage,
    GUI_CONFIG: GUI_CONFIG,
  };

  return paramsPageData;
}

export const I_getStaticProps: GetStaticProps = async (context) => {
  const data = await getDataParamsPage(context.params);
  // const data = {};
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: data,
  };
};

export const I_getStaticPaths: GetStaticPaths = async (context) => {
  const paths = getAllConfigGui() as any;
  return {
    paths,
    fallback: false,
  };
};
