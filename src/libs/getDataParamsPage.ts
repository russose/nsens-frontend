import { Tlanguage, IparamsPage, languages_activated } from "../config/globals";
import { GetStaticPaths, GetStaticProps } from "next";

export interface IPage {
  paramsPage: IparamsPage;
}

interface IParamsContent {
  lang: Tlanguage;
}

export interface IParamsBase {
  params: IParamsContent;
}

export function getAllConfigGui(): IParamsBase[] {
  const languages_list = Object.values(Tlanguage).filter((language) => {
    return languages_activated.includes(language);
  });

  const guiConfigList: IParamsBase[] = languages_list.map((language) => {
    return { params: { lang: language } };
  });

  return guiConfigList;
}

export async function getDataParamsPage(params: any): Promise<IPage> {
  const lang = params.lang;

  const paramsPage: IparamsPage = {
    lang: lang,
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
  const paths = getAllConfigGui() as any;
  return {
    paths,
    fallback: false,
  };
};
