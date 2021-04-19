import { eventT } from "../common/globals";
import {
  _login,
  _signup,
  _logout,
  _getValidationNewPassword,
  _setNewPassword,
} from "../libs/_apiUserData";
import { IStores } from "../stores/_RootStore";
import { configPaths } from "../common/globals";

/*******************Logo*************************** */
export const onTapLogo = (
  stores: IStores
  // GUI_CONFIG: GUI_CONFIG_T
) => (input: { event: eventT }): void => {
  // const itemId = stores.feedStore.getRandomItemIdFromAnywhere(stores);
  // const item = stores.feedStore.getItemFromAnywhere(itemId, stores);

  //Go Article Page
  // stores.userStore.goPageArticle(
  //   stores.userStore.paramsPage,
  //   itemId,
  //   item.title,
  //   GUI_CONFIG
  // );
  stores.userStore.goPage(stores.userStore.paramsPage, configPaths.pages.Home);
};

/*******************Searchbar*************************** */

export const onSearchHomeText = (stores: IStores) => (input: {
  value: string;
  syntheticEvent: eventT;
}): void => {
  stores.uiStore.setSearchPattern(input.value);
  // console.log(uiStore.searchPattern);
};

export const onSearchHomeSubmit = (stores: IStores) => (): void => {
  if (stores.uiStore.searchPattern.length > 0) {
    stores.feedStore.setFeedFromSearch(stores, stores.uiStore.searchPattern);
  } else {
    //feedStore.setFeedFromRandom();
  }
  stores.userStore.goPage(stores.userStore.paramsPage, configPaths.pages.Home);
};

export const onSearchHomeKeyboard = (stores: IStores) => (input: {
  event: eventT;
  value: string;
}): void => {
  if (input.event.key === "Enter") {
    if (stores.uiStore.searchPattern.length === 0) {
      const amount_item_displayed =
        stores.userStore.GUI_CONFIG.display.amount_item_displayed;
      stores.feedStore.setFeedFromRelated(stores, amount_item_displayed);
    } else {
      onSearchHomeSubmit(stores)();
    }
  } else if (input.event.key === "Escape") {
    stores.uiStore.setSearchPattern("");
  }
};
