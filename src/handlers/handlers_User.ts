import {
  Tlanguage,
  eventT,
  initStateCat,
  IparamsPage,
  TUiStringStorage,
  TUiBooleanStorage,
  TLogAction,
} from "../config/globals";
import {
  api_login,
  api_signup,
  api_logout,
  api_getUser,
} from "../libs/apiUser";
import { IStores } from "../stores/RootStore";
import { configPaths, configGeneral } from "../config/globals";
import {
  closeAllDialogs,
  goPage,
  submitLog,
  updateUserProps,
} from "../libs/helpersBase";

function initStateAfterLoginOrLoggoutOrChangeLanguage(stores: IStores): void {
  stores.uiStore.setInitCompleted(initStateCat.core, undefined);
  stores.uiStore.setInitCompleted(initStateCat.userData, undefined);
  // stores.uiStore.setInitCompleted(initStateCat.staticKnowbooks, undefined);
}

export const onChangeLanguage =
  (stores: IStores, language: Tlanguage) => (): void => {
    // stores.baseStore.setInitCompleted(initStateCat.core, undefined);
    // stores.baseStore.setInitCompleted(initStateCat.userData, undefined);
    // stores.baseStore.setInitCompleted(initStateCat.staticKnowbooks, undefined);
    initStateAfterLoginOrLoggoutOrChangeLanguage(stores);

    const paramsPage: IparamsPage = {
      lang: language,
      display: stores.baseStore.paramsPage.display,
    };

    stores.baseStore.setParamsPage(paramsPage);
    goPage(stores, configPaths.pages.User, {}, true);
  };

/*******************Login and Signup*************************** */

export const onChangeUsernamePassword =
  (stores: IStores) =>
  (type: string) =>
  (input: { value: string; syntheticEvent: eventT }): void => {
    if (type === "email") {
      stores.uiStore.setUiStringStorage(
        TUiStringStorage.loginScreenEmail,
        input.value
      );
      if (
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenEmail)
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
      // stores.baseStore.setUser({ username: "" });
      stores.baseStore.setUser(undefined);
    })
    .then(() => {
      initStateAfterLoginOrLoggoutOrChangeLanguage(stores);
      // goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
      goPage(stores, configPaths.pages.Home);

      //To do: faire une fonction initLoginScreen
      stores.uiStore.setUiStringStorage(TUiStringStorage.loginScreenEmail, "");
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
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenEmail),
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenPassword)
      )
        .then(() => {
          const user = api_getUser();
          return user;
        })
        .then((user) => {
          if (user === undefined) {
            throw "banned";
          }
          // stores.baseStore.setUser({
          //   username: stores.uiStore.getUiStringStorage(
          //     TUiStringStorage.loginScreenUsername
          //   ),
          // });
          stores.baseStore.setUser(user);
          // console.log("logged successfully!");
        })
        .then(() => {
          //Go Home
          initStateAfterLoginOrLoggoutOrChangeLanguage(stores);
          // goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
          goPage(stores, configPaths.pages.Home);
        })
        .catch(function (error) {
          // console.log("error in login...");
          if (error === "banned") {
            stores.uiStore.setUiStringStorage(
              TUiStringStorage.loginScreenError,
              "banned"
            );
          } else {
            submitLog(
              stores,
              TLogAction.error,
              "login error for: " +
                stores.uiStore.getUiStringStorage(
                  TUiStringStorage.loginScreenEmail
                ),
              true
            );

            stores.uiStore.setUiStringStorage(
              TUiStringStorage.loginScreenError,
              stores.baseStore.GUI_CONFIG.language.user.loginSignup.login_error
            );
          }

          // Ensures that cookies are removed or banned users are logout
          api_logout();
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

      // api_logout()
      //   .then(() => {
      //     api_signup(
      //       stores.uiStore.getUiStringStorage(
      //         TUiStringStorage.loginScreenEmail
      //       ),
      //       stores.uiStore.getUiStringStorage(
      //         TUiStringStorage.loginScreenUsername_
      //       ),
      //       stores.uiStore.getUiStringStorage(
      //         TUiStringStorage.loginScreenPassword
      //       )
      //     );
      //   })
      api_signup(
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenEmail),
        stores.uiStore.getUiStringStorage(
          TUiStringStorage.loginScreenUsername_
        ),
        stores.uiStore.getUiStringStorage(TUiStringStorage.loginScreenPassword)
      )
        // .then(() => {
        //   stores.baseStore.setUser({
        //     username: stores.uiStore.getUiStringStorage(
        //       TUiStringStorage.loginScreenEmail
        //     ),
        //   });
        //   // console.log("signed successfully!");
        // })
        .then(() => {
          const user = api_getUser();
          return user;
        })
        .then((user) => {
          stores.baseStore.setUser(user);
          // console.log("signed successfully!");
        })
        .then(() => {
          // initializeUserDataBaseLogged(stores);
          //Go Home
          initStateAfterLoginOrLoggoutOrChangeLanguage(stores);
          // goPage(stores, stores.baseStore.paramsPage, configPaths.pages.Home);
          goPage(stores, configPaths.pages.Home);
        })
        .catch(function (error) {
          // console.log("error in signing...");

          submitLog(
            stores,
            TLogAction.error,
            "sigup error for: " +
              stores.uiStore.getUiStringStorage(
                TUiStringStorage.loginScreenEmail
              ),
            true
          );

          stores.uiStore.setUiStringStorage(
            TUiStringStorage.loginScreenError,
            stores.baseStore.GUI_CONFIG.language.user.loginSignup.signup_error
          );
          // Ensures that cookies are removed
          api_logout();
        });
    }
  };

/******************* Edit User Props ****************************************** */

export const onEditUserProps =
  (stores: IStores) =>
  (input: { event: eventT }): void => {
    stores.uiStore.setUiBooleanStorage(
      TUiBooleanStorage.showEditUserProps,
      true
    );
    // input.event.preventDefault();
    input.event.stopPropagation();
  };

export const onSubmitChangesEditUserProps =
  (stores: IStores) => (username: string, email: string) => (): void => {
    updateUserProps(stores, username, email);
    // stores.uiStore.setUiBooleanStorage(
    //   TUiBooleanStorage.showEditUserProps,
    //   false
    // );
    closeAllDialogs(stores);
  };
