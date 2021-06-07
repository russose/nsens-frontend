import { readdir } from "fs/promises";
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
} from "../config/globals";
import { fetchArticle } from "./fetch";
import { ItemsFromSearchOrRandomOrTitlesOrMostviewedCleanImagesFromWikipedia } from "./fetchBase";
import { getAllConfigGui, getConfigDataGui, IPage } from "./getConfigDataGui";
import { readFileJson, writeFileJson } from "./utilsServer";

const testing_mode = false;

// function cleanString(input: string): string {
//   return input.replace(/[^a-z0-9]/gi, "").toLowerCase();
// }

export interface IPageStaticArticle extends IPage {
  id: AtomID;
  title: string;
  articleContent: string;
}

async function getAllConfigStaticArticles() {
  let item_title_list: string[] = [];

  const languages_list = Object.values(ConfigLanguage);
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
            item_title_list_increment.slice(0, 3)
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
    lang +
    "/" +
    configPaths.static.cache_articles +
    title +
    ".json";

  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  try {
    const json: any = await readFileJson(static_path_articles);
    // console.log(static_path_articles + " used from cache");
    const article = {
      id: json.id,
      title: json.title,
      articleContent: json.articleContent,
    };
    const guiConfigDataStaticArticles = {
      guiConfigData: (await getConfigDataGui({ lang: lang, display: display }))
        .guiConfigData,
      // id: json.id,
      // title: json.title,
      // articleContent: json.articleContent,
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
    await ItemsFromSearchOrRandomOrTitlesOrMostviewedCleanImagesFromWikipedia(
      title,
      ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      configFetching.amount_data_fetched_items,
      "titles",
      lang,
      exclusion_patterns_items
    );
  const item = items[0];

  const article = {
    id: item.id,
    title: title,
    articleContent: articleContent,
  };

  await writeFileJson(static_path_articles, article);

  // await writeFileJson(static_path_articles, {
  //   id: item.id,
  //   title: title,
  //   articleContent: articleContent,
  // });

  const guiConfigDataStaticArticles = {
    guiConfigData: (await getConfigDataGui({ lang: lang, display: display }))
      .guiConfigData,
    // id: item.id,
    // title: title,
    // articleContent: articleContent,
    ...article,
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
