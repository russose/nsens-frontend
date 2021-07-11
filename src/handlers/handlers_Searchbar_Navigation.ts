import {
  ButtonIDType,
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
export const onTapLogo =
  (
    stores: IStores
    // GUI_CONFIG: GUI_CONFIG_T
  ) =>
  (): void => {
    // const itemId = stores.baseStore.getRandomItemIdFromAnywhere(stores);
    // const item = stores.baseStore.getItemFromAnywhere(itemId, stores);

    //Go Article Page
    // stores.baseStore.goPageArticle(
    //   stores.baseStore.paramsPage,
    //   itemId,
    //   item.title,
    //   GUI_CONFIG
    // );
    goPage(stores.baseStore.paramsPage, configPaths.pages.Home);
    const amount_item_displayed =
      stores.baseStore.GUI_CONFIG.display.amount_item_displayed;
    setFeedFromMostviewedAndRelated(stores, amount_item_displayed);
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
    const amount_item_displayed =
      stores.baseStore.GUI_CONFIG.display.amount_item_displayed;
    setFeedFromMostviewedAndRelated(stores, amount_item_displayed);
  }
  goPage(stores.baseStore.paramsPage, configPaths.pages.Home);
};

export const onSearchHomeKeyboard =
  (stores: IStores) =>
  (input: { event: eventT; value: string }): void => {
    if (input.event.key === "Enter") {
      if (stores.uiStore.searchPattern.length === 0) {
        const amount_item_displayed =
          stores.baseStore.GUI_CONFIG.display.amount_item_displayed;
        setFeedFromMostviewedAndRelated(stores, amount_item_displayed);
      } else {
        onSearchHomeSubmit(stores)();
      }
    } else if (input.event.key === "Escape") {
      stores.uiStore.setSearchPattern("");
    }
  };

/*******************Navigation*************************** */

export const onMenuButtonPath = (buttonId: ButtonIDType): string => {
  // const buttons = stores.baseStore.GUI_CONFIG.language.buttons;
  // const path = buttons[buttonId].path;
  const path = configButtonsPath[buttonId];
  return path;
};
