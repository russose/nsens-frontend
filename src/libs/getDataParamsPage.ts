import {
  ConfigLanguage,
  IparamsPage,
  languages_activated,
} from "../config/globals";
import { GetStaticPaths, GetStaticProps } from "next";

export interface IPage {
  paramsPage: IparamsPage;
}

export function getAllConfigGui() {
  const languages_list = Object.values(ConfigLanguage).filter((language) => {
    return languages_activated.includes(language);
  });
  // const displays_list: ConfigDisplay[] = Object.values(ConfigDisplay);

  // const guiConfigList: any[] = [];
  const guiConfigList: any[] = languages_list.map((language) => {
    return { params: { lang: language } };
  });
  // languages_list.forEach((language) => {
  //   displays_list.forEach((display) => {
  //     const guiConfig = { params: { lang: language, display: display } };
  //     guiConfigList.push(guiConfig);
  //   });
  // });

  return guiConfigList;
}

export async function getDataParamsPage(params: any): Promise<IPage> {
  const lang = params.lang;
  // const display = params.display;
  // const id = lang + "_" + display;

  const paramsPage: IparamsPage = {
    lang: lang,
    // display: display,
  };

  const paramsPageData = {
    paramsPage: paramsPage,
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
  const paths = getAllConfigGui();
  return {
    paths,
    fallback: false,
  };
};
