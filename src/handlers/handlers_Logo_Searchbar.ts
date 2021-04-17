import { eventT } from "../common/types";
import { UIStore } from "../stores/UIStore";
import {
  _login,
  _signup,
  _logout,
  _getValidationNewPassword,
  _setNewPassword,
} from "../_api";
import { IStores } from "../stores/_RootStore";
import { GUI_CONFIG_T } from "../common/configGUI";

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
  stores.userStore.goPage(
    stores.userStore.paramsPage,
    stores.userStore.GUI_CONFIG.paths.pages.Home
  );
};

/*******************Searchbar*************************** */

export const onSearchHomeText = (uiStore: UIStore) => (input: {
  value: string;
  syntheticEvent: eventT;
}): void => {
  uiStore.setSearchPattern(input.value);
  // console.log(uiStore.searchPattern);
};

export const onSearchHomeSubmit = (stores: IStores) => (): void => {
  if (stores.uiStore.searchPattern.length > 0) {
    stores.feedStore.setFeedFromSearch(stores.uiStore.searchPattern);
  } else {
    //feedStore.setFeedFromRandom();
  }
  stores.userStore.goPage(
    stores.userStore.paramsPage,
    stores.userStore.GUI_CONFIG.paths.pages.Home
  );
};

export const onSearchHomeKeyboard = (stores: IStores) => (input: {
  event: eventT;
  value: string;
}): void => {
  if (input.event.key === "Enter") {
    if (stores.uiStore.searchPattern.length === 0) {
      const amount_item_displayed =
        stores.userStore.GUI_CONFIG.display.amount_item_displayed;
      stores.feedStore.setFeedFromRelated(amount_item_displayed);
    } else {
      onSearchHomeSubmit(stores)();
    }
  } else if (input.event.key === "Escape") {
    stores.uiStore.setSearchPattern("");
  }
};
