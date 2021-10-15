import {
  TButtonID,
  configButtonsPath,
  configPaths,
  eventT,
} from "../config/globals";
import { goPage, updateHome, setFeedFromSearch } from "../libs/helpersBase";
import { IsItemInAnyStaticKnowbook } from "../libs/helpersSavedKnowbooks";
import { path_link } from "../libs/utils";
import { IStores } from "../stores/RootStore";

/*******************Logo*************************** */
export const onTapLogo = (stores: IStores) => (): void => {
  updateHome(stores);
  goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
};

/*******************Searchbar*************************** */

export const onSearchHomeText =
  (stores: IStores) =>
  (input: { value: string; syntheticEvent: eventT }): void => {
    stores.uiStore.setSearchPattern(input.value);
    // console.log(uiStore.searchPattern);
  };

export const onSearchHomeSubmit = (stores: IStores) => (): void => {
  if (stores.uiStore.searchPattern.length > 0) {
    setFeedFromSearch(stores, stores.uiStore.searchPattern);
  } else {
    updateHome(stores);
  }
  goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
};

export const onSearchHomeKeyboard =
  (stores: IStores) =>
  (input: { event: eventT; value: string }): void => {
    if (input.event.key === "Enter") {
      if (stores.uiStore.searchPattern.length === 0) {
        updateHome(stores);
      } else {
        onSearchHomeSubmit(stores)();
      }
    } else if (input.event.key === "Escape") {
      stores.uiStore.setSearchPattern("");
    }
  };

/*******************Navigation*************************** */

export const onMenuButtonPath =
  (stores: IStores) =>
  (buttonId: TButtonID): string => {
    if (buttonId === TButtonID.ARTICLE) {
      // const IsInAnyStaticKnowbook: boolean =
      //   // stores.knowbookStore.allItemsInStaticKnowbooks.has(
      //   //   stores.uiStore.selectedAtom.id
      //   // );
      //   IsItemInAnyStaticKnowbook(stores.uiStore.selectedAtom.id, stores);

      // if (IsInAnyStaticKnowbook) {
      //   return configPaths.pages.StaticArticle;
      // }

      return path_link(stores.uiStore.selectedAtom.id, stores);
    }

    return configButtonsPath[buttonId];
  };
