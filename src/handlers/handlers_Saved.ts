import { AtomID, eventT } from "../config/globals";
import { goUserHandler } from "../libs/helpersBase";
import {
  addSaved,
  IsItemInAnyKnowbook,
  removeSaved,
} from "../libs/helpersSavedKnowbooks";
import { IStores } from "../stores/RootStore";

/*******************Save Items*************************** */

export const onSaved =
  (stores: IStores) =>
  (itemID: AtomID) =>
  (input: { event: eventT }): void => {
    if (!stores.baseStore.isLogged) {
      // goPage(
      //   {
      //     lang: stores.baseStore.paramsPage.lang,
      //     display: stores.baseStore.paramsPage.display,
      //   },
      //   configPaths.pages.User
      // );
      // input.event.preventDefault();
      // return;
      goUserHandler(stores)()(input);
      return;
    }

    if (
      stores.savedStore.saved.has(itemID) === undefined ||
      stores.savedStore.saved.has(itemID) === false
    ) {
      addSaved(itemID, stores);
    } else {
      removeSaved(itemID, stores);
    }
    input.event.preventDefault();
  };

export const isItemSaved = (stores: IStores) => (itemID: AtomID) => {
  if (stores.savedStore.saved.has(itemID) === undefined) {
    return false;
  }
  if (stores.savedStore.saved.has(itemID)) {
    return true;
  } else {
    return false;
  }
};

export const isItemSavedActivated = (stores: IStores) => (itemID: AtomID) => {
  if (IsItemInAnyKnowbook(itemID, stores)) {
    return false;
  } else {
    return true;
  }
};
