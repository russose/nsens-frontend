import { NextRouter } from "next/router";
import { ROOT_URL_WIKIPEDIA_REST } from "../config/configURLs";
import {
  eventT,
  IAtom,
  KnowbookID,
  TKnowbooksPages,
  TSource,
  TUiBooleanStorage,
  TUiStringStorage,
} from "../config/globals";
import { fetchArticle } from "../libs/fetch";
import { closeAllDialogs } from "../libs/helpersBase";
import { prepareArticle } from "../libs/utils";
import { IStores } from "../stores/RootStore";

export const showAtomContent =
  (stores: IStores) =>
  (item_title: string, item_id: string, type: TSource) =>
  (input: { event: eventT }): void => {
    stores.uiStore.setSelectedAtom(item_id, item_title);
    closeAllDialogs(stores);
    if (type === TSource.wiki) {
      return showWikiArticle(stores)(item_title, item_id)(input);
    } else if (type === TSource.arxiv) {
      return showArxivContent(stores)(item_title, item_id)(input);
    } else if (type === TSource.books) {
      return showBookContent(stores)(item_title, item_id)(input);
    }
  };

export const showArxivContent =
  (stores: IStores) =>
  (item_title: string, item_id: string) =>
  (input: { event: eventT }): void => {
    // stores.uiStore.setSelectedAtom(item_id, item_title);
    stores.uiStore.setUiBooleanStorage(
      TUiBooleanStorage.showArxivCentent,
      true
    );
  };

export const showBookContent =
  (stores: IStores) =>
  (item_title: string, item_id: string) =>
  (input: { event: eventT }): void => {
    // stores.uiStore.setSelectedAtom(item_id, item_title);
    stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showBookCentent, true);
  };

export const showWikiArticle =
  (stores: IStores) =>
  (item_title: string, item_id: string) =>
  (input: { event: eventT }): void => {
    if (item_title !== undefined && item_id !== undefined) {
      // stores.uiStore.setSelectedAtom(item_id, item_title);
      // stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showHistory, false);
      // closeAllDialogs(stores);
      stores.uiStore.setUiStringStorage(TUiStringStorage.articleContent, "");
      stores.uiStore.setUiBooleanStorage(
        TUiBooleanStorage.showWikiArticle,
        true
      );
      // stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, true);
      fetchArticle(
        item_title,
        ROOT_URL_WIKIPEDIA_REST(stores.baseStore.paramsPage.lang)
      ).then((value) => {
        stores.uiStore.setUiStringStorage(
          TUiStringStorage.articleContent,
          prepareArticle(value)
        );
        // stores.uiStore.setUiBooleanStorage(
        //   TUiBooleanStorage.showLoading,
        //   false
        // );
      });
      // .catch(() => {
      //   stores.uiStore.setUiBooleanStorage(
      //     TUiBooleanStorage.showLoading,
      //     false
      //   );
      // });
    }
    // input.event.preventDefault();
    input.event.stopPropagation();
  };

export const showArticleBackNext =
  (stores: IStores, router: NextRouter, direction: number) =>
  (input: { event: eventT }): void => {
    if (direction !== -1 && direction !== 1) {
      return;
    }

    const type = router.query.type;
    let items: IAtom[];
    // let selected: string;
    if (type === TKnowbooksPages.Mostviewed) {
      items = stores.baseStore.getHistoryItems(stores.baseStore.mostviewedIds);
    } else {
      // const id_public: IPublicKnowbookKey = {
      //   owner: Number(router.query.owner),
      //   name: router.query.name as string,
      // };
      const id_public: KnowbookID = Number(router.query.id);

      stores.uiStore.setSelectedKnowbook(id_public);

      items = stores.baseStore.getHistoryItems(
        stores.knowbookStore.getSelectedKnowbook.items
      );
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

// export const showArticleBackNext =
//   (stores: IStores, router: NextRouter, direction: number) =>
//   (input: { event: eventT }): void => {
//     if (direction !== -1 && direction !== 1) {
//       return;
//     }

//     const type = router.query.type;
//     let items: IAtom[];
//     // let selected: string;
//     if (type === TKnowbooksPages.Mostviewed) {
//       items = stores.baseStore.getHistoryItems(stores.baseStore.mostviewedIds);
//     } else if (router.pathname.includes(configPaths.pages.StaticKnowbook)) {
//       // selected = router.query.name as string;
//       // items = stores.knowbookStore.knowbookStaticAtomsList(selected);
//       // items = stores.baseStore.getHistoryItems(
//       //   stores.knowbookStore.staticKnowbooks
//       //     .get(selected)
//       //     .items.map((item) => item.id)
//       // );
//       items = stores.baseStore.getHistoryItems(
//         stores.knowbookStore.getPublicKnowbooksItem(
//           // buildPublicName(selected, PLATFORM_OWNER_USERNAME)
//           {
//             name: router.query.name as string,
//             owner: Number(router.query.owner),
//           }
//         ).items
//       );
//     } else if (router.pathname.includes(configPaths.pages.Knowbook)) {
//       // selected = router.query.name as string;
//       // items = stores.baseStore.getHistoryItems(
//       //   stores.knowbookStore.knowbooks.get(router.query.name as string).items
//       // );

//       const id_public: IPublicKnowbookKey = {
//         owner: Number(router.query.owner),
//         name: router.query.name as string,
//       };
//       const id_private = router.query.name as string;

//       if (type === TKnowbooksPages.bestKnowbooks) {
//         items = stores.baseStore.getHistoryItems(
//           stores.knowbookStore.getPublicKnowbooksItem(id_public).items
//         );
//       } else if (type === TKnowbooksPages.myPublicKnowbooks) {
//         items = stores.baseStore.getHistoryItems(
//           stores.knowbookStore.getFollowedPublicKnowbooksItem(id_public).items
//         );
//       } else if (type === TKnowbooksPages.myKnowbooks) {
//         items = stores.baseStore.getHistoryItems(
//           stores.knowbookStore.knowbooks.get(id_private).items
//         );
//       } else {
//         // console.log("should not happen!");
//       }
//     } else {
//       return;
//     }

//     if (items === undefined || items.length === 0) {
//       return;
//     }

//     const currentItem = stores.uiStore.selectedAtom;

//     let idx = 0;
//     for (const item of items) {
//       if (item.id === currentItem.id) {
//         if (idx === 0 && direction === -1) {
//           idx = items.length - 1;
//         } else if (idx === items.length - 1 && direction === 1) {
//           idx = 0;
//         } else {
//           idx = idx + direction;
//         }

//         break;
//       } else {
//         idx = idx + 1;
//       }
//     }

//     const item_id = items[idx].id;
//     const item_title = items[idx].title;

//     if (item_title !== undefined && item_id !== undefined) {
//       stores.uiStore.setSelectedAtom(item_id, item_title);
//       stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showLoading, true);
//       fetchArticle(
//         item_title,
//         ROOT_URL_WIKIPEDIA_REST(stores.baseStore.paramsPage.lang)
//       )
//         .then((value) => {
//           stores.uiStore.setUiStringStorage(
//             TUiStringStorage.articleContent,
//             prepareArticle(value)
//           );
//           stores.uiStore.setUiBooleanStorage(
//             TUiBooleanStorage.showLoading,
//             false
//           );
//         })
//         .catch(() => {
//           stores.uiStore.setUiBooleanStorage(
//             TUiBooleanStorage.showLoading,
//             false
//           );
//         });
//     }
//     // input.event.preventDefault();
//     input.event.stopPropagation();
//   };

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
