import { ConfigDisplay, ConfigLanguage, IparamsPage } from "../config/globals";
import { GetStaticPaths, GetStaticProps } from "next";

export interface IPage {
  paramsPage: IparamsPage;
}

export function getAllConfigGui() {
  const guiConfigList = [
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.mobile } },
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.desktop } },
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.large } },
    { params: { lang: ConfigLanguage.fr, display: ConfigDisplay.extra } },
    // { params: { lang: ConfigLanguage.en, display: ConfigDisplay.desktop } },
  ];

  return guiConfigList;
}

export async function getDataParamsPage(params: any): Promise<IPage> {
  const lang = params.lang;
  const display = params.display;
  // const id = lang + "_" + display;

  const paramsPage: IparamsPage = {
    lang: lang,
    display: display,
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
