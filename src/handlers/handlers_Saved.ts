import { AtomID, eventT } from "../common/globals";
import {
  _login,
  _signup,
  _logout,
  _getValidationNewPassword,
  _setNewPassword,
} from "../libs/_apiUserData";
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
    stores.savedStore.removeSaved(itemID, stores);
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
  if (stores.knowbookStore.IsItemInAnyKnowbook(itemID)) {
    return false;
  } else {
    return true;
  }
};
