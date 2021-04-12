import { SavedStore } from "../stores/SavedStore";
import { AtomID, eventT } from "../common/types";

import {
  _login,
  _signup,
  _logout,
  _getValidationNewPassword,
  _setNewPassword,
} from "../_api";
import { KnowkookStore } from "../stores/KnowkookStore";
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
    stores.savedStore.addSaved(itemID, stores);
  } else {
    stores.savedStore.removeSaved(itemID, stores.knowbookStore);
  }
  input.event.preventDefault();
};

export const isItemSaved = (savedStore: SavedStore) => (itemID: AtomID) => {
  if (savedStore.saved.has(itemID) === undefined) {
    return false;
  }
  if (savedStore.saved.has(itemID)) {
    return true;
  } else {
    return false;
  }
};

export const isItemSavedActivated = (knowbookStore: KnowkookStore) => (
  itemID: AtomID
) => {
  if (knowbookStore.IsItemInAnyKnowbook(itemID)) {
    return false;
  } else {
    return true;
  }
};
