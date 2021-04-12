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
import { loginDuration, successMessage } from "../common/config";

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
