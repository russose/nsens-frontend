import {
  Tlanguage,
  eventT,
  initStateCat,
  IparamsPage,
  TUiStringStorage,
} from "../config/globals";
import { api_login, api_signup, api_logout } from "../libs/apiUser";
import { IStores } from "../stores/RootStore";
import { configPaths, configGeneral } from "../config/globals";
import { goPage } from "../libs/helpersBase";
import { initializeApp } from "../libs/helpersInitialize";

export const onChangeLanguage =
  (stores: IStores, language: Tlanguage) => (): void => {
    stores.baseStore.setInitCompleted(initStateCat.core, undefined);
    stores.baseStore.setInitCompleted(
      initStateCat.staticKnowbooksFull,
      undefined
    );
    stores.baseStore.setInitCompleted(initStateCat.userData, undefined);

    const paramsPage: IparamsPage = {
      // display: stores.baseStore.paramsPage.display,
      lang: language,
    };

    initializeApp(stores, paramsPage)
      .then(() => {
        goPage(stores, paramsPage, configPaths.pages.User, {}, true);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

/*******************Login and Signup*************************** */

function initStateAfterLoginOrLoggout(stores: IStores): void {
  stores.baseStore.setInitCompleted(initStateCat.userData, undefined);
}

export const onChangeUsernamePassword =
  (stores: IStores) =>
  (type: string) =>
  (input: { value: string; syntheticEvent: eventT }): void => {
    if (type === "username") {
      // stores.uiStore.setLoginScreenUsername(input.value);
      stores.uiStore.setUiStringStorage(
        TUiStringStorage.loginScreenUsername,
        input.value
      );
      if (
        // uiStore.loginScreenUsername.length === 2 &&
        // stores.uiStore.loginScreenUsername.length !== 0 &&
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenUsername)
          .length !== 0 &&
        // stores.uiStore.loginScreenUsername_ === ""
        stores.uiStore.getUiStringStorage(
          TUiStringStorage.loginScreenUsername_
        ) === ""
      ) {
        setTimeout(() => {
          // stores.uiStore.setLoginScreenUsername_(configGeneral.successMessage);
          stores.uiStore.setUiStringStorage(
            TUiStringStorage.loginScreenUsername_,
            configGeneral.successMessage
          );
        }, configGeneral.loginDuration);
      }
    } else if (type === "password") {
      // stores.uiStore.setLoginScreenPassword(input.value);
      stores.uiStore.setUiStringStorage(
        TUiStringStorage.loginScreenPassword,
        input.value
      );
    }
    // console.log(input.value);
  };

export const onLogout = (stores: IStores) => (): void => {
  api_logout()
    .then(() => {
      stores.baseStore.setUser({ username: "" });
    })
    .then(() => {
      initStateAfterLoginOrLoggout(stores);
      goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
      //To do: faire une fonction initLoginScreen
      // stores.uiStore.setLoginScreenUsername("");
      stores.uiStore.setUiStringStorage(
        TUiStringStorage.loginScreenUsername,
        ""
      );
      // stores.uiStore.setLoginScreenUsername_("");
      stores.uiStore.setUiStringStorage(
        TUiStringStorage.loginScreenUsername_,
        ""
      );
      // stores.uiStore.setLoginScreenPassword("");
      stores.uiStore.setUiStringStorage(
        TUiStringStorage.loginScreenPassword,
        ""
      );
      // stores.uiStore.setLoginScreenError("");
      stores.uiStore.setUiStringStorage(TUiStringStorage.loginScreenError, "");
    })
    .catch(function (error) {
      // console.log("error in logout...");
    });
};

export const onSubmitLoginSignup =
  (stores: IStores) => (type: string) => (): void => {
    if (type === "login") {
      api_login(
        // stores.uiStore.loginScreenUsername,
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenUsername),
        // stores.uiStore.loginScreenPassword
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenPassword)
      )
        .then(() => {
          stores.baseStore.setUser({
            // username: stores.uiStore.loginScreenUsername,
            username: stores.uiStore.getUiStringStorage(
              TUiStringStorage.loginScreenUsername
            ),
          });
          // console.log("logged successfully!");
        })
        .then(() => {
          // initializeUserDataBaseLogged(stores);
          //Go Home
          // stores.baseStore.setInitCompleted(initStateCat.saved, undefined);
          // stores.baseStore.setInitCompleted(initStateCat.knowbooks, undefined);
          initStateAfterLoginOrLoggout(stores);
          goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
        })
        .catch(function (error) {
          // console.log(error);
          // console.log("error in login...");
          // stores.uiStore.setLoginScreenError(
          //   stores.baseStore.GUI_CONFIG.language.user.loginSignup.login_error
          // );
          stores.uiStore.setUiStringStorage(
            TUiStringStorage.loginScreenError,
            stores.baseStore.GUI_CONFIG.language.user.loginSignup.login_error
          );
        });
    } else if (type === "signup") {
      if (
        // stores.uiStore.loginScreenUsername_ !== configGeneral.successMessage
        stores.uiStore.getUiStringStorage(
          TUiStringStorage.loginScreenUsername_
        ) !== configGeneral.successMessage
      ) {
        // stores.uiStore.setLoginScreenError(
        //   stores.baseStore.GUI_CONFIG.language.user.loginSignup
        //     .signup_error_duration
        // );
        stores.uiStore.setUiStringStorage(
          TUiStringStorage.loginScreenError,
          stores.baseStore.GUI_CONFIG.language.user.loginSignup
            .signup_error_duration
        );
        return;
      }

      api_signup(
        // stores.uiStore.loginScreenUsername,
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenUsername),
        // stores.uiStore.loginScreenUsername_,
        stores.uiStore.getUiStringStorage(
          TUiStringStorage.loginScreenUsername_
        ),
        // stores.uiStore.loginScreenPassword
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenPassword)
      )
        .then(() => {
          stores.baseStore.setUser({
            // username: stores.uiStore.loginScreenUsername,
            username: stores.uiStore.getUiStringStorage(
              TUiStringStorage.loginScreenUsername
            ),
          });
          // console.log("signed successfully!");
        })
        .then(() => {
          // initializeUserDataBaseLogged(stores);
          //Go Home
          initStateAfterLoginOrLoggout(stores);
          goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
        })
        .catch(function (error) {
          // console.log("error in signing...");
          // stores.uiStore.setLoginScreenError(
          //   stores.baseStore.GUI_CONFIG.language.user.loginSignup.signup_error
          // );
          stores.uiStore.setUiStringStorage(
            TUiStringStorage.loginScreenError,
            stores.baseStore.GUI_CONFIG.language.user.loginSignup.signup_error
          );
        });
    }
  };
