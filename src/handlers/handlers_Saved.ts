import { AtomID, eventT } from "../config/globals";
import { IsItemInAnyKnowbook } from "../libs/helpersKnowbooks";
import { addSaved, removeSaved } from "../libs/helpersSaved";
import { IStores } from "../stores/_RootStore";

/*******************Save Items*************************** */

export const onSaved = (stores: IStores) => (itemID: AtomID) => (input: {
  event: eventT;
}): void => {
  // if (!userStore.isLogged) {
  //   goLogin();
  // }
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
