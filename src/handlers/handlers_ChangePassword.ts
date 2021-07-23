import { eventT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { configPaths } from "../config/globals";
import {
  api_getValidationNewPassword,
  api_setNewPassword,
} from "../libs/apiUser";
import { goPage } from "../libs/helpersBase";

/*******************Change Password*************************** */

export const onChangePassword_text =
  (stores: IStores) =>
  (type: string) =>
  (input: { value: string; syntheticEvent: eventT }): void => {
    if (type === "username") {
      stores.uiStore.setChangePasswordUsername(input.value);
    } else if (type === "password") {
      stores.uiStore.setChangePasswordPassword(input.value);
    } else if (type === "validationCode") {
      stores.uiStore.setChangePasswordValidationCode(input.value);
    }
    // console.log(input.value);
  };

export const onChangePassword_button =
  (stores: IStores) => (type: string) => (): void => {
    if (type === "sendValidationCode") {
      api_getValidationNewPassword(stores.uiStore.changePasswordUsername)
        .then(() => {
          stores.uiStore.setChangePasswordError(
            stores.baseStore.GUI_CONFIG.language.changePassword
              .sendValidationCode_success
          );
        })
        .catch(function (error) {
          // console.log("error in logout...");
          stores.uiStore.setChangePasswordError(
            stores.baseStore.GUI_CONFIG.language.changePassword
              .sendValidationCode_error
          );
        });
    } else if (type === "changePassword") {
      api_setNewPassword(
        stores.uiStore.changePasswordUsername,
        stores.uiStore.changePasswordPassword,
        stores.uiStore.changePasswordValidationCode
      )
        // .then(() => {
        //   //
        // })
        .then(() => {
          goPage(
            stores,
            stores.baseStore.paramsPage,
            configPaths.pages.Home,
            true
          );
        })
        .catch(function (error) {
          // console.log("error in logout...");
          stores.uiStore.setChangePasswordError(
            stores.baseStore.GUI_CONFIG.language.changePassword
              .changePassword_error
          );
        });
    }
  };
