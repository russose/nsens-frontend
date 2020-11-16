import { UserStore } from "./stores/UserStore";
import { GraphStore } from "./stores/GraphStore";
import { DataStore } from "./stores/DataStore";
import { KnowbookID, AtomID, ButtonIDType } from "./common/types";
import { IItemDisplayMode, UIStore } from "./stores/UIStore";
import { _login, _signup, _logout } from "./_api";
import { initializeUserData } from "./initialization";
import { goHome, goLogin } from "./libs/utils";
import { USER_GUI_CONFIG } from "./common/config";
import { KnowkookStore } from "./stores/KnowkookStore";

const buttons = USER_GUI_CONFIG.buttons;

// interface IonInput {
//   value: string;
//   syntheticEvent: any;
// }
// interface IonChecked {
//   checked: boolean;
//   syntheticEvent: any;
// }

/*******************Searchbar*************************** */

export const onSearchHomeText = (uiStore: UIStore) => (input: {
  value: string;
  syntheticEvent: any;
}): void => {
  uiStore.setSearchPattern(input.value);
  // console.log(uiStore.searchPattern);
};

export const onSearchHomeSubmit = (
  dataStore: DataStore,
  uiStore: UIStore,
  userStore: UserStore
) => (): void => {
  if (uiStore.searchPattern.length > 0) {
    dataStore.setFeedFromSearch(uiStore.searchPattern, userStore);
  } else {
    //dataStore.setFeedFromRandom();
  }
};

export const onSearchHomeKeyboard = (
  dataStore: DataStore,
  uiStore: UIStore,
  userStore: UserStore
) => (input: { event: any; value: string }): void => {
  if (input.event.key === "Enter") {
    onSearchHomeSubmit(dataStore, uiStore, userStore)();
  } else if (input.event.key === "Escape") {
    uiStore.setSearchPattern("");
  }
};

/*******************Save atom card*************************** */

export const onSaved = (
  dataStore: DataStore,
  graphStore: GraphStore,
  userStore: UserStore,
  knowbookStore: KnowkookStore
) => (itemID: AtomID) => (): void => {
  if (!userStore.isLogged) {
    goLogin();
  }
  if (
    dataStore.saved.has(itemID) === undefined ||
    dataStore.saved.has(itemID) === false
  ) {
    dataStore.addSaved(itemID, graphStore);
  } else {
    dataStore.removeSaved(itemID, knowbookStore);
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

export const onCancel = (uiStore: UIStore) => (): void => {
  uiStore.setEditKnowbookOpened(false);
  uiStore.setRenameKnowbookOpened(false);
};

export const onEditKnowbooks = (
  uiStore: UIStore,
  knowbookStore: KnowkookStore
) => (itemId: AtomID) => (): void => {
  uiStore.setSelectedAtomId(itemId);
  uiStore.initKnowbookEditionElements(itemId, knowbookStore);
  uiStore.setEditKnowbookOpened(true);
};

// export const onCancelEditKnowbooks = (uiStore: UIStore) => (): void => {
//   uiStore.setEditKnowbookOpened(false);
// };

export const onChangeInputValueEditKnowbooks = (uiStore: UIStore) => (input: {
  value: string;
  syntheticEvent: any;
}): void => {
  uiStore.setEditKnowbookNewValue(input.value);
};

export const onChangeKnwobooksInclusionEditKnowbooks = (uiStore: UIStore) => (
  tag: KnowbookID
) => (input: { checked: boolean; syntheticEvent: any }): void => {
  uiStore.setEditKnowbookMembers(tag, input.checked);
};

export const onSubmitChangesEditKnowbooks = (
  uiStore: UIStore,
  knowbookStore: KnowkookStore
) => (itemId: AtomID) => (): void => {
  if (itemId === undefined) {
    return;
  }

  uiStore.editKnowbookMembers.forEach((value, key) => {
    if (value === true && !knowbookStore.isItemInKnowbook(itemId, key)) {
      knowbookStore.addItemInKnowbook(key, itemId);
    } else if (value === false && knowbookStore.isItemInKnowbook(itemId, key)) {
      knowbookStore.removeItemFromKnowbook(key, itemId);
    }
  });

  const knowbookIds: KnowbookID[] = Array.from(knowbookStore.knowbooks.keys());
  const value = uiStore.editKnowbookNewValue;
  if (value.length !== 0) {
    if (knowbookIds.includes(value)) {
      if (!knowbookStore.isItemInKnowbook(itemId, value)) {
        knowbookStore.addItemInKnowbook(uiStore.editKnowbookNewValue, itemId);
      }
    } else {
      knowbookStore.addItemInKnowbook(value, itemId);
    }
  }

  uiStore.setEditKnowbookOpened(false);
};

/******************* Rename or Delete Knowbook ************************************ */

export const onOpenRenameKnowbook = (uiStore: UIStore) => (
  name: KnowbookID
) => (): void => {
  uiStore.setSelectedKnowbookIdName(name);
  uiStore.setRenameKnowbookNewName(name);
  uiStore.setRenameKnowbookOpened(true);
};

export const onChangeInputValueRenameKnowbook = (uiStore: UIStore) => (input: {
  value: string;
  syntheticEvent: any;
}): void => {
  uiStore.setRenameKnowbookNewName(input.value);
};

export const onRenameKnowbook = (
  uiStore: UIStore,
  knowbookStore: KnowkookStore
) => (): void => {
  knowbookStore.renameKnowbook(
    uiStore.selectedKnowbookIdName,
    uiStore.renameKnowbookNewName
  );
  uiStore.setRenameKnowbookOpened(false);
};

// export const onRenameKnowbook = (uiStore: UIStore, dataStore: DataStore) => (
//   name: string
// ): void => {
//   dataStore.renameKnowbook(name, uiStore.renameKnowbookNewName);
//   uiStore.setRenameKnowbookOpened(false);
// };

export const onDeleteKnowbook = (
  dataStore: DataStore,
  knowbookStore: KnowkookStore
) => (name: KnowbookID) => (): void => {
  knowbookStore.deleteKnowbook(name, dataStore);
};

/*******************Login and Signup*************************** */

export const onChangeUsernamePassword = (uiStore: UIStore) => (
  type: string
) => (input: { value: string; syntheticEvent: any }): void => {
  if (type === "username") {
    uiStore.setLoginScreenUsername(input.value);
  } else if (type === "password") {
    uiStore.setLoginScreenPassword(input.value);
  }
  // console.log(input.value);
};

export const onLogout = (
  dataStore: DataStore,
  userStore: UserStore,
  knowbookStore: KnowkookStore
) => (): void => {
  _logout()
    .then(() => {
      userStore.setUser({ username: "" });
      dataStore.clearSaved();
      knowbookStore.clearKnowbooks();
    })
    .then(() => {
      goHome();
    })
    .catch(function (error) {
      console.log("error in logout...");
    });
};

export const onSubmitLoginSignup = (
  uiStore: UIStore,
  dataStore: DataStore,
  userStore: UserStore,
  knowbookStore: KnowkookStore
) => (type: string) => (): void => {
  if (type === "login") {
    _login(uiStore.loginScreenUsername, uiStore.loginScreenPassword)
      .then(() => {
        userStore.setUser({ username: uiStore.loginScreenUsername });
        // console.log("logged successfully!");
      })
      .then(() => {
        initializeUserData(dataStore, userStore, knowbookStore);
        goHome();
      })
      .catch(function (error) {
        // console.log(error);
        console.log("error in login...");
      });
  } else if (type === "signup") {
    _signup(uiStore.loginScreenUsername, uiStore.loginScreenPassword)
      .then(() => {
        userStore.setUser({ username: uiStore.loginScreenUsername });
        // console.log("signed successfully!");
      })
      .then(() => {
        initializeUserData(dataStore, userStore, knowbookStore);
        goHome();
      })
      .catch(function (error) {
        console.log("error in signing...");
      });
  }
};

/*******************Navigation*************************** */

export const onMenuButtonPath = (uiStore: UIStore, userStore: UserStore) => (
  buttonId: ButtonIDType
): string => {
  uiStore.setItemDisplayMode(IItemDisplayMode.Article);
  if (!userStore.isLogged && buttonId !== ButtonIDType.HOME) {
    return buttons[ButtonIDType.LOGIN].path;
  } else {
    return buttons[buttonId].path;
  }
};

export const onMenuButtonClick = (uiStore: UIStore) => (
  buttonId: ButtonIDType
) => () => {
  let mode;
  if (buttonId === ButtonIDType.ARTICLE) {
    mode = IItemDisplayMode.Article;
  } else {
    mode = IItemDisplayMode.Network;
  }
  uiStore.setItemDisplayMode(mode);
};
