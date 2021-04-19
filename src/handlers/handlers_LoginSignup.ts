import { eventT } from "../config/globals";
import { _login, _signup, _logout } from "../libs/_apiUser";
import { IStores } from "../stores/_RootStore";
import { configPaths, configGeneral } from "../config/globals";
import { goPage, initializeUserData } from "../libs/helpers_InitAndRedirect";

/*******************Login and Signup*************************** */

export const onChangeUsernamePassword = (stores: IStores) => (
  type: string
) => (input: { value: string; syntheticEvent: eventT }): void => {
  if (type === "username") {
    stores.uiStore.setLoginScreenUsername(input.value);
    if (
      // uiStore.loginScreenUsername.length === 2 &&
      stores.uiStore.loginScreenUsername.length !== 0 &&
      stores.uiStore.loginScreenUsername_ === ""
    ) {
      setTimeout(() => {
        stores.uiStore.setLoginScreenUsername_(configGeneral.successMessage);
      }, configGeneral.loginDuration);
    }
  } else if (type === "password") {
    stores.uiStore.setLoginScreenPassword(input.value);
  }
  // console.log(input.value);
};

export const onLogout = (stores: IStores) => (): void => {
  _logout()
    .then(() => {
      stores.baseStore.setUser({ username: "" });
      stores.savedStore.clearSaved();
      stores.knowbookStore.clearKnowbooks();
    })
    .then(() => {
      goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Landing);
      //To do: faire une fonction initLoginScreen
      stores.uiStore.setLoginScreenUsername("");
      stores.uiStore.setLoginScreenUsername_("");
      stores.uiStore.setLoginScreenPassword("");
      stores.uiStore.setLoginScreenError("");
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
        stores.baseStore.setUser({
          username: stores.uiStore.loginScreenUsername,
        });
        // console.log("logged successfully!");
      })
      .then(() => {
        initializeUserData(stores);
        //Go Home
        goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
      })
      .catch(function (error) {
        // console.log(error);
        // console.log("error in login...");
        stores.uiStore.setLoginScreenError(
          stores.baseStore.GUI_CONFIG.language.landing.loginSignup.login_error
        );
      });
  } else if (type === "signup") {
    if (stores.uiStore.loginScreenUsername_ !== configGeneral.successMessage) {
      stores.uiStore.setLoginScreenError(
        stores.baseStore.GUI_CONFIG.language.landing.loginSignup
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
        stores.baseStore.setUser({
          username: stores.uiStore.loginScreenUsername,
        });
        // console.log("signed successfully!");
      })
      .then(() => {
        initializeUserData(stores);
        //Go Home
        goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
      })
      .catch(function (error) {
        // console.log("error in signing...");
        stores.uiStore.setLoginScreenError(
          stores.baseStore.GUI_CONFIG.language.landing.loginSignup.signup_error
        );
      });
  }
};
