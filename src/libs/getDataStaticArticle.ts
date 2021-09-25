import { readdir } from "fs/promises";
import LZString from "lz-string";
import { GetStaticPaths, GetStaticProps } from "next";
import { ROOT_URL_WIKIPEDIA_REST } from "../config/configURLs";
import {
  AtomID,
  Tlanguage,
  configPaths,
  IAtom,
  is_testing_mode,
  languages_activated,
} from "../config/globals";
import { fetchArticle } from "./fetch";
import { getAllConfigGui, getDataParamsPage, IPage } from "./getDataParamsPage";
import { readFileJson, writeFileJson } from "./utilsServer";

// const amount_data_fetched_items = configFetching.amount_data_fetched_items;
const testing_mode = is_testing_mode;

export interface IPageStaticArticle extends IPage {
  id: AtomID;
  title: string;
  // articleContent: string;
  articleContentCompressed: string;
}

async function getItemFromStaticKnowbooksCache(
  language: Tlanguage,
  title: string
): Promise<IAtom> {
  const path_base_knowbooks =
    configPaths.static.knowbooks_location + language + "/";

  try {
    const files = await readdir(path_base_knowbooks);
    for (const filename of files) {
      const json: any = await readFileJson(path_base_knowbooks, filename);
      const items: IAtom[] = json.items;
      for (const item of items) {
        if (item.title === title) {
          return item;
        }
      }
    }
    return undefined;
  } catch (err) {
    console.log("error in scaning static directory to get item...");
    return undefined;
    // console.error(err);
  }
}

async function getAllConfigStaticArticles() {
  let item_title_list: string[] = [];

  // const languages_list = Object.values(ConfigLanguage);
  const languages_list: Tlanguage[] = Object.values(Tlanguage).filter(
    (language) => {
      return languages_activated.includes(language);
    }
  );

  const language_titles_Map = new Map<Tlanguage, string[]>();

  for (const language of languages_list) {
    const path_base_knowbooks =
      configPaths.static.knowbooks_location + language + "/";

    try {
      const files = await readdir(path_base_knowbooks);

      for (const filename of files) {
        // console.log("reading...", filename);
        const json: any = await readFileJson(path_base_knowbooks, filename);
        const items: IAtom[] = json.items;
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
    language_titles_Map.set(language, item_title_list);
    item_title_list = [];
  }

  let guiConfigList: any = [];
  getAllConfigGui().forEach((item_params) => {
    language_titles_Map
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
  // const display = params.display;
  const title = params.title;

  const static_path_base_articles =
    configPaths.static.base_cache +
    configPaths.static.cache_articles +
    lang +
    "/";
  // +
  // title +
  // ".json";

  // const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  try {
    const json: any = await readFileJson(
      static_path_base_articles,
      title + ".json"
    );
    // console.log(static_path_articles + " used from cache");
    const article = {
      id: json.id,
      title: json.title,
      // articleContent: json.articleContent,
      articleContentCompressed: json.articleContentCompressed,
    };
    const guiConfigDataStaticArticles = {
      // paramsPage: (await getDataParamsPage({ lang: lang, display: display }))
      paramsPage: (await getDataParamsPage({ lang: lang })).paramsPage,
      ...article,
    };
    return guiConfigDataStaticArticles;
  } catch {
    // console.log(static_path_articles + " not found, fetched from internet...");
  }

  try {
    const articleContent = await fetchArticle(
      title,
      ROOT_URL_WIKIPEDIA_REST(lang)
    );

    // const items: IAtom[] =
    //   await ItemsFromSearchOrRandomOrTitlesOrMostviewedFromWikipediaWithoutImage(
    //     title,
    //     // ROOT_URL_WIKIPEDIA_REST(lang),
    //     ROOT_URL_WIKIPEDIA_ACTION(lang),
    //     1,
    //     // amount_data_fetched_items,
    //     "titles",
    //     lang,
    //     exclusion_patterns_items
    //   );

    // if (items.length === 0 || items === undefined) {
    //   console.log(
    //     "Static Article issue for fetching item id: ",
    //     title,
    //     static_path_articles
    //   );
    //   return;
    // }

    // const item = items[0];

    // console.log(itemRepository);

    const item = await getItemFromStaticKnowbooksCache(lang, title);

    if (item === undefined) {
      console.log("No item found in cache for: ", title, lang);
    }

    const article_with_articleContent = {
      id: item.id,
      title: title,
      // articleContent: articleContent,
      articleContentCompressed: LZString.compress(articleContent),
    };

    await writeFileJson(
      static_path_base_articles,
      title + ".json",
      article_with_articleContent
    );

    const guiConfigDataStaticArticles = {
      // paramsPage: (await getDataParamsPage({ lang: lang, display: display }))
      paramsPage: (await getDataParamsPage({ lang: lang })).paramsPage,
      // ...article,
      ...article_with_articleContent,
    };

    return guiConfigDataStaticArticles;
  } catch {
    console.log("***");
    console.log("Static Article issue for: ", title, lang);
  }
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

// async function getAllConfigStaticArticles_old() {
//   const name_allStaticKnowbooks =
//     configGeneral.staticKnowbooks.name_allStaticKnowbooks;
//   const allStaticKnowbooks_path =
//     configPaths.static.knowbooks_location + name_allStaticKnowbooks;

//   const staticKnowbook_title_Map = new Map<
//     IStaticKnowbookDefinition,
//     string[]
//   >();

//   try {
//     const allStaticKnowbooks = (await readFileJson(
//       allStaticKnowbooks_path
//     )) as IStaticKnowbookDefinition[];

//     allStaticKnowbooks.forEach((staticknowbook) => {
//       staticKnowbook_title_Map.set(staticknowbook, staticknowbook.items);
//     });
//   } catch {
//     console.log(
//       " =>",
//       allStaticKnowbooks_path,
//       "not found..., you need to generate it!"
//     );
//   }

//   if (testing_mode) {
//     staticKnowbook_title_Map.forEach((title_list, staticknowbook) => {
//       staticKnowbook_title_Map.set(staticknowbook, title_list.slice(0, 2));
//     });
//   }

//   const language_params_Map = new Map<Tlanguage, IParamsBase>();
//   getAllConfigGui().forEach((params) => {
//     language_params_Map.set(params.params.lang, params);
//   });

//   let guiConfigList: any = [];
//   staticKnowbook_title_Map.forEach((title_list, staticknowbook) => {
//     const paramsPageArticle_list = title_list.map((title) => {
//       const paramsPageArticle = {
//         params: {
//           ...language_params_Map.get(staticknowbook.lang).params,
//           title: title,
//         },
//       };
//       return paramsPageArticle;
//     });

//     guiConfigList = guiConfigList.concat(paramsPageArticle_list);
//   });

//   return guiConfigList;
// }
