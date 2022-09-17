import { configPaths, eventT, TUiStringStorage } from "../config/globals";
import { goPage, setFeedFromSearch } from "../libs/helpersBase";
import { IStores } from "../stores/RootStore";

/*******************Searchbar*************************** */

export const onSearchHomeText =
  (stores: IStores) =>
  (input: { value: string; syntheticEvent: eventT }): void => {
    stores.uiStore.setUiStringStorage(
      TUiStringStorage.searchPattern,
      input.value
    );
    // console.log(uiStore.searchPattern);
  };

export const onSearchHomeSubmit = (stores: IStores) => (): void => {
  const searchPattern = stores.uiStore.getUiStringStorage(
    TUiStringStorage.searchPattern
  );
  if (searchPattern.length > 0) {
    setFeedFromSearch(stores, searchPattern);
    goPage(stores, configPaths.pages.Search);
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
