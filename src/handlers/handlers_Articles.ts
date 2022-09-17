import { NextRouter } from "next/router";
import {
  eventT,
  TUiStringStorage,
  TUiBooleanStorage,
  IAtom,
  configPaths,
  AtomID,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import { ROOT_URL_WIKIPEDIA_REST } from "../config/configURLs";
import { fetchArticle } from "../libs/fetch";
import { prepareArticle } from "../libs/utils";

/*******************Article Modal*************************** */

export const showArticleBackNext =
  (stores: IStores, router: NextRouter, direction: number) =>
  (input: { event: eventT }): void => {
    if (direction !== -1 && direction !== 1) {
      return;
    }

    // const selected_knowbook = router.query.nameOrPeriod as string;
    let items: IAtom[];
    let selected: string;
    if (router.pathname.includes(configPaths.pages.StaticKnowbook)) {
      selected = router.query.nameOrPeriod as string;
      items = stores.knowbookStore.knowbookStaticAtomsList(selected);
    } else if (router.pathname.includes(configPaths.pages.Knowbook)) {
      selected = router.query.nameOrPeriod as string;
      items = stores.knowbookStore.knowbookAtomsList(selected);
    } else if (
      router.pathname.includes(configPaths.pages.ItemCircle) ||
      router.pathname.includes(configPaths.pages.ItemNetwork)
    ) {
      selected = router.query.id as string;
      const related_Ids: AtomID[] = stores.graphStore.relatedMapFlat.atomIds;
      items = stores.baseStore.getHistoryItems([selected].concat(related_Ids));
    } else {
      return;
    }

    if (items === undefined || items.length === 0) {
      return;
    }

    const currentItem = stores.uiStore.selectedAtom;

    let idx = 0;
    for (const item of items) {
      if (item.id === currentItem.id) {
        if (idx === 0 && direction === -1) {
          idx = items.length - 1;
        } else if (idx === items.length - 1 && direction === 1) {
          idx = 0;
        } else {
          idx = idx + direction;
        }

        break;
      } else {
        idx = idx + 1;
      }
    }

    const item_id = items[idx].id;
    const item_title = items[idx].title;

    if (item_title !== undefined && item_id !== undefined) {
      stores.uiStore.setSelectedAtom(item_id, item_title);
      stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, true);
      fetchArticle(
        item_title,
        ROOT_URL_WIKIPEDIA_REST(stores.baseStore.paramsPage.lang)
      )
        .then((value) => {
          stores.uiStore.setUiStringStorage(
            TUiStringStorage.articleContent,
            prepareArticle(value)
          );
          stores.uiStore.setUiBooleanStorage(
            TUiBooleanStorage.showLoading,
            false
          );
        })
        .catch(() => {
          stores.uiStore.setUiBooleanStorage(
            TUiBooleanStorage.showLoading,
            false
          );
        });
    }
    // input.event.preventDefault();
    input.event.stopPropagation();
  };

/*******************Article Slides*************************** */

// export async function ComputeArticleSlideContent(
//   stores: IStores,
//   selected_knowbook: string,
//   isStatic: boolean
// ): Promise<void> {
//   let items_all;
//   if (isStatic) {
//     const knowbook: IKnowbookStatic =
//       stores.knowbookStore.staticKnowbooks.get(selected_knowbook);
//     items_all = knowbook.items;
//   } else {
//     items_all = getKnowbookAtomsList(selected_knowbook, stores);
//   }

//   async function getArticle(item: IAtom): Promise<string> {
//     return fetchArticle(
//       item.title,
//       ROOT_URL_WIKIPEDIA_REST(stores.baseStore.paramsPage.lang)
//     );
//   }
//   async function getArticle_Parallel(
//     list_of_items_: IAtom[]
//   ): Promise<string[]> {
//     const myBigPromise = await Promise.all(
//       list_of_items_.map((item) => {
//         return getArticle(item);
//       })
//     );
//     return myBigPromise;
//   }

//   const items = items_all.slice(0, configFetching.maxArticlesSlide);

//   if (
//     !stores.uiStore.getUiBooleanStorage(
//       TUiBooleanStorage.ArticleSlideFetchingStarted
//     )
//   ) {
//     stores.uiStore.setUiBooleanStorage(
//       TUiBooleanStorage.ArticleSlideFetchingStarted,
//       true
//     );
//     // stores.uiStore.setUiStringStorage(TUiStringStorage.articleContent, "");
//     getArticle_Parallel(items)
//       .then((articles: string[]) => {
//         let articles_merged = "";
//         articles.forEach((article) => {
//           articles_merged = articles_merged + ArticlesSlideSeparator + article;
//         });
//         return articles_merged;
//       })
//       .then((articles_merged) => {
//         stores.uiStore.setUiStringStorage(
//           TUiStringStorage.articleContent,
//           articles_merged
//         );
//       });
//   }
// }
