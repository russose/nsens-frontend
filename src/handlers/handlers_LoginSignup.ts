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
      stores.uiStore.setUiStringStorage(
        TUiStringStorage.loginScreenUsername,
        input.value
      );
      if (
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenUsername)
          .length !== 0 &&
        stores.uiStore.getUiStringStorage(
          TUiStringStorage.loginScreenUsername_
        ) === ""
      ) {
        setTimeout(() => {
          stores.uiStore.setUiStringStorage(
            TUiStringStorage.loginScreenUsername_,
            configGeneral.successMessage
          );
        }, configGeneral.loginDuration);
      }
    } else if (type === "password") {
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
      stores.uiStore.setUiStringStorage(
        TUiStringStorage.loginScreenUsername,
        ""
      );
      stores.uiStore.setUiStringStorage(
        TUiStringStorage.loginScreenUsername_,
        ""
      );
      stores.uiStore.setUiStringStorage(
        TUiStringStorage.loginScreenPassword,
        ""
      );
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
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenUsername),
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenPassword)
      )
        .then(() => {
          stores.baseStore.setUser({
            username: stores.uiStore.getUiStringStorage(
              TUiStringStorage.loginScreenUsername
            ),
          });
          // console.log("logged successfully!");
        })
        .then(() => {
          //Go Home
          initStateAfterLoginOrLoggout(stores);
          goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
        })
        .catch(function (error) {
          // console.log(error);
          // console.log("error in login...");
          stores.uiStore.setUiStringStorage(
            TUiStringStorage.loginScreenError,
            stores.baseStore.GUI_CONFIG.language.user.loginSignup.login_error
          );
        });
    } else if (type === "signup") {
      if (
        stores.uiStore.getUiStringStorage(
          TUiStringStorage.loginScreenUsername_
        ) !== configGeneral.successMessage
      ) {
        stores.uiStore.setUiStringStorage(
          TUiStringStorage.loginScreenError,
          stores.baseStore.GUI_CONFIG.language.user.loginSignup
            .signup_error_duration
        );
        return;
      }

      api_signup(
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenUsername),
        stores.uiStore.getUiStringStorage(
          TUiStringStorage.loginScreenUsername_
        ),
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenPassword)
      )
        .then(() => {
          stores.baseStore.setUser({
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
          stores.uiStore.setUiStringStorage(
            TUiStringStorage.loginScreenError,
            stores.baseStore.GUI_CONFIG.language.user.loginSignup.signup_error
          );
        });
    }
  };
