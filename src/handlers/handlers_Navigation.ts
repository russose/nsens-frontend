import { configPaths } from "./../config/configLocalAndEnv";
import { ROOT_URL_WIKIPEDIA_REST } from "../config/configURLs";
import {
  AtomID,
  eventT,
  TUiBooleanStorage,
  TUiStringStorage,
} from "../config/globals";
import { fetchArticle } from "../libs/fetch";
import { goPage, goUserHandler } from "../libs/helpersBase";
import { path_link_main_item_page, prepareArticle } from "../libs/utils";
import { IStores } from "../stores/RootStore";

/*******************Logo*************************** */
export const onTapLogo = (stores: IStores) => (): void => {
  // updateHome(stores);
  goPage(stores, configPaths.pages.Home);
  // goLanding(stores);
};

/*******************Go to Article*************************** */

export const showArticle =
  (stores: IStores) =>
  (item_title: string, item_id: string) =>
  (input: { event: eventT }): void => {
    if (item_title !== undefined && item_id !== undefined) {
      stores.uiStore.setSelectedAtom(item_id, item_title);
      stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showHistory, false);
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

export const onGoItemMainPage =
  (stores: IStores) =>
  (item_title: string, item_id: string) =>
  (input: { event: eventT }): void => {
    goPage(stores, path_link_main_item_page(item_id, stores), {
      title: item_title,
      id: item_id,
    });
    // input.event.preventDefault();
    input.event.stopPropagation();
  };

export const onGoNotebookPage =
  (stores: IStores) =>
  (pathname: string, queryObject: object) =>
  (input: { event: eventT }): void => {
    goPage(stores, pathname, queryObject);
    // input.event.preventDefault();
    input.event.stopPropagation();
  };

export const goUserHandler_ =
  (stores: IStores) =>
  (itemID: AtomID) =>
  (input: { event: eventT }): void => {
    goUserHandler(stores)()(input);
    // stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showArticle, false);
    return;
  };
