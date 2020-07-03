import { DataStore } from "./stores/DataStore";
import { KnowbookID, AtomID } from "./srcCommon/types";
import { CONFIG_FETCHING } from "./srcCommon/config";
import Router from "next/router";
import { UIStore } from "./stores/UIStore";
import { _login, _signup, _logout } from "./_api";
import { initializeUserData } from "./initialization";
import { goHome, goLogin } from "./libs/utils";

interface IonInput {
  value: string;
  syntheticEvent: any;
}
interface IonChecked {
  checked: boolean;
  syntheticEvent: any;
}

/*******************Searchbar*************************** */
export const onSearchHome = (dataStore: DataStore, uiStore: UIStore) => (
  input: IonInput
): void => {
  uiStore.setSearchPattern(input.value);
  if (uiStore.searchPattern.length > CONFIG_FETCHING.search_min_length_search) {
    dataStore.setFeedFromSearch(input.value);
  }
};

/*******************Save atom card*************************** */

export const onSaved = (dataStore: DataStore) => (
  itemID: AtomID
) => (): void => {
  if (!dataStore.isLogged) {
    goLogin();
  }
  if (
    dataStore.saved.has(itemID) === undefined ||
    dataStore.saved.has(itemID) === false
  ) {
    dataStore.addSaved(itemID);
  } else {
    dataStore.removeSaved(itemID);
  }
};

export const isItemSavedActivated = (dataStore: DataStore) => (
  itemID: AtomID
) => {
  if (dataStore.IsItemInAnyKnowbook(itemID)) {
    return false;
  } else {
    return true;
  }
};

export const isItemSaved = (dataStore: DataStore) => (itemID: AtomID) => {
  if (dataStore.saved.has(itemID) === undefined) {
    return false;
  }
  if (dataStore.saved.has(itemID)) {
    return true;
  } else {
    return false;
  }
};

/******************* Edit Knowbooks ************************************ */

export const onEditKnowbooks = (uiStore: UIStore, dataStore: DataStore) => (
  itemId: AtomID
) => (): void => {
  uiStore.setSelectedAtomId(itemId);
  uiStore.initKnowbookEditionElements(itemId, dataStore);
  uiStore.setEditKnowbookOpened(true);
};

export const onCancelEditKnowbooks = (uiStore: UIStore) => (): void => {
  uiStore.setEditKnowbookOpened(false);
};

export const onChangeInputValueEditKnowbooks = (uiStore: UIStore) => (
  input: IonInput
): void => {
  uiStore.setEditKnowbookNewValue(input.value);
};

export const onChangeKnwobooksInclusionEditKnowbooks = (uiStore: UIStore) => (
  tag: KnowbookID
) => (input: IonChecked): void => {
  uiStore.setEditKnowbookMembers(tag, input.checked);
};

export const onSubmitChangesEditKnowbooks = (
  uiStore: UIStore,
  dataStore: DataStore
) => (itemId: AtomID) => (): void => {
  if (itemId === undefined) {
    return;
  }

  uiStore.editKnowbookMembers.forEach((value, key) => {
    if (value === true && !dataStore.isItemInKnowbook(itemId, key)) {
      dataStore.addItemInKnowbook(key, itemId);
    } else if (value === false && dataStore.isItemInKnowbook(itemId, key)) {
      dataStore.removeItemFromKnowbook(key, itemId);
    }
  });

  const knowbookIds: KnowbookID[] = Array.from(dataStore.knowbooks.keys());
  const value = uiStore.editKnowbookNewValue;
  if (value.length !== 0) {
    if (knowbookIds.includes(value)) {
      if (!dataStore.isItemInKnowbook(itemId, value)) {
        dataStore.addItemInKnowbook(uiStore.editKnowbookNewValue, itemId);
      }
    } else {
      dataStore.addItemInKnowbook(value, itemId);
    }
  }

  uiStore.setEditKnowbookOpened(false);
};

/*******************Login and Signup*************************** */

export const onChangeUsernamePassword = (uiStore: UIStore) => (
  type: string
) => (input: IonInput): void => {
  if (type === "username") {
    uiStore.setLoginScreenUsername(input.value);
  } else if (type === "password") {
    uiStore.setLoginScreenPassword(input.value);
  }
  // console.log(input.value);
};

export const onLogout = (dataStore: DataStore) => (): void => {
  _logout()
    .then(() => {
      dataStore.setUser({ username: "" });
      dataStore.clearSaved();
      dataStore.clearKnowbooks();
    })
    .then(() => {
      goHome();
    })
    .catch(function (error) {
      console.log("error in logout...");
    });
};

export const onSubmitLoginSignup = (uiStore: UIStore, dataStore: DataStore) => (
  type: string
) => (): void => {
  if (type === "login") {
    _login(uiStore.loginScreenUsername, uiStore.loginScreenPassword)
      .then(() => {
        dataStore.setUser({ username: uiStore.loginScreenUsername });
        // console.log("logged successfully!");
      })
      .then(() => {
        initializeUserData(dataStore);
        goHome();
      })
      .catch(function (error) {
        console.log("error in login...");
      });
  } else if (type === "signup") {
    _signup(uiStore.loginScreenUsername, uiStore.loginScreenPassword)
      .then(() => {
        dataStore.setUser({ username: uiStore.loginScreenUsername });
        // console.log("signed successfully!");
      })
      .then(() => {
        initializeUserData(dataStore);
        goHome();
      })
      .catch(function (error) {
        console.log("error in signing...");
      });
  }
};
