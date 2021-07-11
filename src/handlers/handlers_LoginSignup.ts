import { eventT, initStateCat } from "../config/globals";
import { api_login, api_signup, api_logout } from "../libs/apiUser";
import { IStores } from "../stores/RootStore";
import { configPaths, configGeneral } from "../config/globals";
import { goPage } from "../libs/helpersBase";
import { initializeSaved } from "../libs/helpersInitialize";

/*******************Login and Signup*************************** */

function initStateSavedKnowbooks(stores: IStores): void {
  // stores.savedStore.clearSaved();
  // stores.knowbookStore.clearKnowbooks();
  stores.baseStore.setInitCompleted(initStateCat.feed, undefined);
  stores.baseStore.setInitCompleted(initStateCat.saved, undefined);
  stores.baseStore.setInitCompleted(initStateCat.knowbooks, undefined);
  initializeSaved(stores); //Relaunch initializeSaved after login/logout even if stores.baseStore.initCompleted.app !== undefined
}

export const onChangeUsernamePassword =
  (stores: IStores) =>
  (type: string) =>
  (input: { value: string; syntheticEvent: eventT }): void => {
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
  api_logout()
    .then(() => {
      stores.baseStore.setUser({ username: "" });
    })
    .then(() => {
      goPage(stores.baseStore.paramsPage, configPaths.pages.Home);
      initStateSavedKnowbooks(stores);
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

export const onSubmitLoginSignup =
  (stores: IStores) => (type: string) => (): void => {
    if (type === "login") {
      api_login(
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
          // initializeUserDataBaseLogged(stores);
          //Go Home
          // stores.baseStore.setInitCompleted(initStateCat.saved, undefined);
          // stores.baseStore.setInitCompleted(initStateCat.knowbooks, undefined);
          initStateSavedKnowbooks(stores);
          goPage(stores.baseStore.paramsPage, configPaths.pages.Home);
        })
        .catch(function (error) {
          // console.log(error);
          // console.log("error in login...");
          stores.uiStore.setLoginScreenError(
            stores.baseStore.GUI_CONFIG.language.user.loginSignup.login_error
          );
        });
    } else if (type === "signup") {
      if (
        stores.uiStore.loginScreenUsername_ !== configGeneral.successMessage
      ) {
        stores.uiStore.setLoginScreenError(
          stores.baseStore.GUI_CONFIG.language.user.loginSignup
            .signup_error_duration
        );
        return;
      }

      api_signup(
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
          // initializeUserDataBaseLogged(stores);
          //Go Home
          initStateSavedKnowbooks(stores);
          goPage(stores.baseStore.paramsPage, configPaths.pages.Home);
        })
        .catch(function (error) {
          // console.log("error in signing...");
          stores.uiStore.setLoginScreenError(
            stores.baseStore.GUI_CONFIG.language.user.loginSignup.signup_error
          );
        });
    }
  };
