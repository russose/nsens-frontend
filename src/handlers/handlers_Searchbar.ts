import {
  configPaths,
  eventT,
  TLogAction,
  TUiStringStorage,
} from "../config/globals";
import { goPage, submitLog } from "../libs/helpersBase";
import { IStores } from "../stores/RootStore";

/*******************Searchbar*************************** */

export const onSearchHomeText =
  (stores: IStores) =>
  (input: { value: string; syntheticEvent: eventT }): void => {
    stores.uiStore.setUiStringStorage(
      TUiStringStorage.searchPattern,
      input.value
    );
  };

export const onSearchHomeSubmit = (stores: IStores) => (): void => {
  // const guillements = '"';
  // const searchPattern =
  //   guillements +
  //   stores.uiStore.getUiStringStorage(TUiStringStorage.searchPattern) +
  //   guillements;
  const searchPattern = stores.uiStore.getUiStringStorage(
    TUiStringStorage.searchPattern
  );
  if (searchPattern.length > 0) {
    // setFeedFromSearch(stores, searchPattern);
    goPage(stores, configPaths.pages.Search, {
      search: searchPattern,
    });
    submitLog(stores, TLogAction.search, searchPattern, false);
  } else {
    goPage(stores, configPaths.pages.Home);
  }
};

export const onSearchHomeKeyboard =
  (stores: IStores) =>
  (input: { event: eventT; value: string }): void => {
    if (input.event.key === "Enter") {
      onSearchHomeSubmit(stores)();
    } else if (input.event.key === "Escape") {
      stores.uiStore.setUiStringStorage(TUiStringStorage.searchPattern, "");
    }
  };
