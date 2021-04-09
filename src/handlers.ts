import { SavedStore } from "./stores/SavedStore";
import { KnowbookID, AtomID, ButtonIDType, eventT } from "./common/types";
import { UIStore } from "./stores/UIStore";
import { _login, _signup, _logout } from "./_api";
import { KnowkookStore } from "./stores/KnowkookStore";
import { IStores } from "./stores/_RootStore";
import { loginDuration, successMessage } from "./common/config";
import { GUI_CONFIG_T } from "./common/configGUI";

// interface IonInput {
//   value: string;
//   syntheticEvent: eventT;
// }
// interface IonChecked {
//   checked: boolean;
//   syntheticEvent: eventT;
// }

/*******************Logo*************************** */
export const onTapLogo = (
  stores: IStores,
  GUI_CONFIG: GUI_CONFIG_T
) => (input: { event: eventT }): void => {
  const itemId = stores.feedStore.getRandomItemIdFromAnywhere(stores);
  const item = stores.feedStore.getItemFromAnywhere(itemId, stores);

  //Go Article Page
  stores.userStore.goPageArticle(
    stores.userStore.paramsPage,
    itemId,
    item.title,
    GUI_CONFIG
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

/******************* Edit Knowbooks ************************************ */

export const onCancel = (uiStore: UIStore) => (): void => {
  uiStore.setEditKnowbookOpened(false);
  uiStore.setRenameKnowbookOpened(false);
};

export const onEditKnowbooks = (
  uiStore: UIStore,
  knowbookStore: KnowkookStore
) => (itemId: AtomID) => (input: { event: eventT }): void => {
  uiStore.setSelectedAtom(itemId, "title");
  uiStore.initKnowbookEditionElements(itemId, knowbookStore);
  uiStore.setEditKnowbookOpened(true);
  input.event.preventDefault();
};

export const onChangeInputValueEditKnowbooks = (uiStore: UIStore) => (input: {
  value: string;
  syntheticEvent: eventT;
}): void => {
  uiStore.setEditKnowbookNewValue(input.value);
};

export const onChangeKnwobooksInclusionEditKnowbooks = (uiStore: UIStore) => (
  tag: KnowbookID
) => (input: { checked: boolean; syntheticEvent: eventT }): void => {
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
) => (input: { event: eventT }): void => {
  uiStore.setSelectedKnowbookIdName(name);
  uiStore.setRenameKnowbookNewName(name);
  uiStore.setRenameKnowbookOpened(true);
  input.event.preventDefault();
};

export const onChangeInputValueRenameKnowbook = (uiStore: UIStore) => (input: {
  value: string;
  syntheticEvent: eventT;
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

export const onDeleteKnowbook = (
  savedStore: SavedStore,
  knowbookStore: KnowkookStore
) => (name: KnowbookID) => (input: { event: eventT }): void => {
  knowbookStore.deleteKnowbook(name, savedStore);
  input.event.preventDefault();
};

/*******************Login and Signup*************************** */

export const onChangeUsernamePassword = (uiStore: UIStore) => (
  type: string
) => (input: { value: string; syntheticEvent: eventT }): void => {
  if (type === "username") {
    uiStore.setLoginScreenUsername(input.value);
    if (uiStore.loginScreenUsername.length === 1) {
      uiStore.setLoginScreenUsername_("");
    }
    if (
      uiStore.loginScreenUsername.length === 2 &&
      uiStore.loginScreenUsername_ === ""
    ) {
      setTimeout(() => {
        uiStore.setLoginScreenUsername_(successMessage);
      }, loginDuration);
    }
  } else if (type === "password") {
    uiStore.setLoginScreenPassword(input.value);
  }
  // console.log(input.value);
};

export const onLogout = (stores: IStores) => (): void => {
  _logout()
    .then(() => {
      stores.userStore.setUser({ username: "" });
      stores.savedStore.clearSaved();
      stores.knowbookStore.clearKnowbooks();
    })
    .then(() => {
      stores.userStore.goPage(
        stores.userStore.paramsPage,
        stores.userStore.GUI_CONFIG.paths.pages.Landing
      );
      stores.uiStore.setLoginScreenUsername_("");
    })
    .catch(function (error) {
      // console.log("error in logout...");
    });
};

export const onSubmitLoginSignup = (stores: IStores) => (
  type: string
) => (): void => {
  if (type === "login") {
    _login(
      stores.uiStore.loginScreenUsername,
      stores.uiStore.loginScreenPassword
    )
      .then(() => {
        stores.userStore.setUser({
          username: stores.uiStore.loginScreenUsername,
        });
        // console.log("logged successfully!");
      })
      .then(() => {
        stores.userStore.initializeUserData(stores);
        //Go Home
        stores.userStore.goPage(
          stores.userStore.paramsPage,
          stores.userStore.GUI_CONFIG.paths.pages.Home
        );
      })
      .catch(function (error) {
        // console.log(error);
        // console.log("error in login...");
        stores.uiStore.setLoginScreenError(
          stores.userStore.GUI_CONFIG.language.landing.loginSignup.login_error
        );
      });
  } else if (type === "signup") {
    if (stores.uiStore.loginScreenUsername_ !== successMessage) {
      stores.uiStore.setLoginScreenError(
        stores.userStore.GUI_CONFIG.language.landing.loginSignup
          .signup_error_duration
      );
      return;
    }

    _signup(
      stores.uiStore.loginScreenUsername,
      stores.uiStore.loginScreenUsername_,
      stores.uiStore.loginScreenPassword
    )
      .then(() => {
        stores.userStore.setUser({
          username: stores.uiStore.loginScreenUsername,
        });
        // console.log("signed successfully!");
      })
      .then(() => {
        stores.userStore.initializeUserData(stores);
        //Go Home
        stores.userStore.goPage(
          stores.userStore.paramsPage,
          stores.userStore.GUI_CONFIG.paths.pages.Home
        );
      })
      .catch(function (error) {
        // console.log("error in signing...");
        stores.uiStore.setLoginScreenError(
          stores.userStore.GUI_CONFIG.language.landing.loginSignup.signup_error
        );
      });
  }
};

/*******************Navigation*************************** */

export const onMenuButtonPath = (stores: IStores) => (
  buttonId: ButtonIDType
): string => {
  const buttons = stores.userStore.GUI_CONFIG.language.buttons;
  const path = buttons[buttonId].path;
  return path;
};

// export const onDisplayModeClick = (uiStore: UIStore) => (
//   buttonId: ButtonIDType
// ) => () => {
//   let mode;
//   if (buttonId === ButtonIDType.ARTICLE) {
//     mode = IItemDisplayMode.Article;
//   } else {
//     mode = IItemDisplayMode.Network;
//   }
//   uiStore.setItemDisplayMode(mode);
// };
