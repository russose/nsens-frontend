import { readdir } from "fs/promises";
import LZString from "lz-string";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
} from "../config/configURLs";
import {
  AtomID,
  configFetching,
  ConfigLanguage,
  configPaths,
  EXCLUSION_PATTERNS,
  IAtom,
  is_testing_mode,
  languages_activated,
} from "../config/globals";
import { fetchArticle } from "./fetch";
import { ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaCleanImage_blocking } from "./fetchBase";
import { getAllConfigGui, getDataParamsPage, IPage } from "./getDataParamsPage";
import { readFileJson, writeFileJson } from "./utilsServer";

const amount_data_fetched_items = configFetching.amount_data_fetched_items;
const testing_mode = is_testing_mode;

export interface IPageStaticArticle extends IPage {
  id: AtomID;
  title: string;
  // articleContent: string;
  articleContentCompressed: string;
}

async function getAllConfigStaticArticles() {
  let item_title_list: string[] = [];

  // const languages_list = Object.values(ConfigLanguage);
  const languages_list = Object.values(ConfigLanguage).filter((language) => {
    return languages_activated.includes(language);
  });

  const titles_for_language = new Map<ConfigLanguage, string[]>();

  for (const language of languages_list) {
    const path_base_knowbooks = configPaths.static.knowbooks + language + "/";

    try {
      const files = await readdir(path_base_knowbooks);

      for (const filename of files) {
        // console.log("reading...", filename);
        const json: any = await readFileJson(path_base_knowbooks + filename);
        const items = json.items;
        const item_title_list_increment = items.map((item: IAtom) => {
          return item.title;
        });
        if (testing_mode) {
          item_title_list = item_title_list.concat(
            item_title_list_increment.slice(0, 2)
          );
        } else {
          item_title_list = item_title_list.concat(item_title_list_increment);
        }
      }
    } catch (err) {
      console.log("error in scaning static directory...");
      // console.error(err);
    }
    titles_for_language.set(language, item_title_list);
    item_title_list = [];
  }

  let guiConfigList: any = [];
  getAllConfigGui().forEach((item_params) => {
    titles_for_language
      .get(item_params.params.lang)
      .forEach((item_title_for_this_language: string) => {
        guiConfigList = guiConfigList.concat({
          params: {
            ...item_params.params,
            title: item_title_for_this_language,
          },
        });
      });
  });

  return guiConfigList;
}

async function getConfigDataStaticArticles(
  params: any
): Promise<IPageStaticArticle> {
  const lang = params.lang;
  const display = params.display;
  const title = params.title;

  const static_path_articles =
    configPaths.static.base_cache +
    configPaths.static.cache_articles +
    lang +
    "/" +
    title +
    ".json";

  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  try {
    const json: any = await readFileJson(static_path_articles);
    // console.log(static_path_articles + " used from cache");
    const article = {
      id: json.id,
      title: json.title,
      // articleContent: json.articleContent,
      articleContentCompressed: json.articleContentCompressed,
    };
    const guiConfigDataStaticArticles = {
      paramsPage: (await getDataParamsPage({ lang: lang, display: display }))
        .paramsPage,
      ...article,
    };
    return guiConfigDataStaticArticles;
  } catch {
    // console.log(static_path_articleclears + " not found, fetched from internet...");
  }

  const articleContent = await fetchArticle(
    title,
    ROOT_URL_WIKIPEDIA_REST(lang)
  );

  const items: IAtom[] =
    await ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaCleanImage_blocking(
      title,
      ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      amount_data_fetched_items,
      "titles",
      lang,
      exclusion_patterns_items
    );
  const item = items[0];

  const article_with_articleContent = {
    id: item.id,
    title: title,
    // articleContent: articleContent,
    articleContentCompressed: LZString.compress(articleContent),
  };

  await writeFileJson(static_path_articles, article_with_articleContent);

  const guiConfigDataStaticArticles = {
    paramsPage: (await getDataParamsPage({ lang: lang, display: display }))
      .paramsPage,
    // ...article,
    ...article_with_articleContent,
  };

  return guiConfigDataStaticArticles;
}

export const I_getStaticPaths: GetStaticPaths = async (context) => {
  const paths = await getAllConfigStaticArticles();
  return {
    paths,
    fallback: false,
  };
};
export const I_getStaticProps: GetStaticProps = async (context) => {
  const data = await getConfigDataStaticArticles(context.params);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: data,
  };
};
