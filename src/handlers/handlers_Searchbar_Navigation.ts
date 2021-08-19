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

function setFeedFromMostviewedAndRelatedLocal(stores: IStores): void {
  const amount_item_displayed =
    stores.baseStore.GUI_CONFIG.display.amount_item_displayed;
  setFeedFromMostviewedAndRelated(stores, amount_item_displayed);
}

/*******************Logo*************************** */
export const onTapLogo = (stores: IStores) => (): void => {
  goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);

  // const amount_item_displayed =
  //   stores.baseStore.GUI_CONFIG.display.amount_item_displayed;
  // setFeedFromMostviewedAndRelated(stores, amount_item_displayed);
  setFeedFromMostviewedAndRelatedLocal(stores);
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
    // const amount_item_displayed =
    //   stores.baseStore.GUI_CONFIG.display.amount_item_displayed;
    // setFeedFromMostviewedAndRelated(stores, amount_item_displayed);
    setFeedFromMostviewedAndRelatedLocal(stores);
  }
  goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
};

export const onSearchHomeKeyboard =
  (stores: IStores) =>
  (input: { event: eventT; value: string }): void => {
    if (input.event.key === "Enter") {
      if (stores.uiStore.searchPattern.length === 0) {
        // const amount_item_displayed =
        //   stores.baseStore.GUI_CONFIG.display.amount_item_displayed;
        // setFeedFromMostviewedAndRelated(stores, amount_item_displayed);
        setFeedFromMostviewedAndRelatedLocal(stores);
      } else {
        onSearchHomeSubmit(stores)();
      }
    } else if (input.event.key === "Escape") {
      stores.uiStore.setSearchPattern("");
    }
  };

/*******************Navigation*************************** */

export const onMenuButtonPath = (
  buttonId: ButtonIDType
  // stores: IStores
): string => {
  // const buttons = stores.baseStore.GUI_CONFIG.language.buttons;
  // const path = buttons[buttonId].path;
  // stores.uiStore.setSearchPattern("");
  const path = configButtonsPath[buttonId];
  return path;
};
