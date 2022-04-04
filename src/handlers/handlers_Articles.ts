import {
  eventT,
  TUiStringStorage,
  TUiBooleanStorage,
  IAtom,
  ArticlesSlideSeparator,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import { ROOT_URL_WIKIPEDIA_REST } from "../config/configURLs";
import { fetchArticle } from "../libs/fetch";
import { prepareArticle } from "../libs/utils";
import { getKnowbookAtomsList } from "../libs/helpersSavedKnowbooks";

/*******************Articles*************************** */

export const showArticle =
  (stores: IStores, item_title: string, item_id: string) =>
  (input: { event: eventT }): void => {
    if (item_title !== undefined && item_id !== undefined) {
      stores.uiStore.setSelectedAtom(item_id, item_title);
      stores.uiStore.setUiStringStorage(TUiStringStorage.articleContent, "");
      stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showArticle, true);
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
          // stores.uiStore.setShowLoading(false);
          stores.uiStore.setUiBooleanStorage(
            TUiBooleanStorage.showLoading,
            false
          );
        })
        .catch(() => {
          // stores.uiStore.setShowLoading(false);
          stores.uiStore.setUiBooleanStorage(
            TUiBooleanStorage.showLoading,
            false
          );
          // console.log("error in fetching article");
        });
    }
    input.event.preventDefault();
  };

/*******************Article Slides*************************** */

export async function ComputeArticleSlideContent(
  stores: IStores,
  selected_knowbook: string
): Promise<void> {
  const items: IAtom[] = getKnowbookAtomsList(selected_knowbook, stores);

  async function getArticle(item: IAtom): Promise<string> {
    return fetchArticle(
      item.title,
      ROOT_URL_WIKIPEDIA_REST(stores.baseStore.paramsPage.lang)
    );
  }
  async function getArticle_Parallel(
    list_of_items_: IAtom[]
  ): Promise<string[]> {
    const myBigPromise = await Promise.all(
      list_of_items_.map((item) => {
        return getArticle(item);
      })
    );
    return myBigPromise;
  }

  if (
    !stores.uiStore.getUiBooleanStorage(
      TUiBooleanStorage.ArticleSlideFetchingStarted
    )
  ) {
    stores.uiStore.setUiBooleanStorage(
      TUiBooleanStorage.ArticleSlideFetchingStarted,
      true
    );

    getArticle_Parallel(items)
      .then((articles: string[]) => {
        let articles_merged = "";
        articles.forEach((article) => {
          articles_merged = articles_merged + ArticlesSlideSeparator + article;
        });
        return articles_merged;
      })
      .then((articles_merged) => {
        stores.uiStore.setUiStringStorage(
          TUiStringStorage.articleContent,
          articles_merged
        );
      });
    // .then(() => {
    //   console.log("completed!");
    //   stores.uiStore.setUiBooleanStorage(
    //     TUiBooleanStorage.ArticleSlideContentReady,
    //     true
    //   );
    // });
  }
}
