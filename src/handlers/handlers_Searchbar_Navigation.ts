import {
  TButtonID,
  configButtonsPath,
  configPaths,
  eventT,
} from "../config/globals";
import {
  goPage,
  setFeedFromMostviewedAndRelated,
  setFeedFromSearch,
} from "../libs/helpersBase";
import { IStores } from "../stores/RootStore";

/*******************Logo*************************** */
export const onTapLogo = (stores: IStores) => (): void => {
  setFeedFromMostviewedAndRelated(stores);
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
    setFeedFromMostviewedAndRelated(stores);
  }
  goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
};

export const onSearchHomeKeyboard =
  (stores: IStores) =>
  (input: { event: eventT; value: string }): void => {
    if (input.event.key === "Enter") {
      if (stores.uiStore.searchPattern.length === 0) {
        setFeedFromMostviewedAndRelated(stores);
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
      const IsInAnyStaticKnowbook: boolean =
        stores.knowbookStore.allItemsInStaticKnowbooks.has(
          stores.uiStore.selectedAtom.id
        );

      if (IsInAnyStaticKnowbook) {
        return configPaths.pages.StaticArticle;
      }
    }

    return configButtonsPath[buttonId];
  };
