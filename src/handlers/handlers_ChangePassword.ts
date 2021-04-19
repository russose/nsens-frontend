import { eventT } from "../common/globals";
import {
  _login,
  _signup,
  _logout,
  _getValidationNewPassword,
  _setNewPassword,
} from "../libs/_apiUserData";
import { IStores } from "../stores/_RootStore";
import { configPaths } from "../common/globals";

/*******************Change Password*************************** */

export const onChangePassword_text = (stores: IStores) => (
  type: string
) => (input: { value: string; syntheticEvent: eventT }): void => {
  if (type === "username") {
    stores.uiStore.setChangePasswordUsername(input.value);
  } else if (type === "password") {
    stores.uiStore.setChangePasswordPassword(input.value);
  } else if (type === "validationCode") {
    stores.uiStore.setChangePasswordValidationCode(input.value);
  }
  // console.log(input.value);
};

export const onChangePassword_button = (stores: IStores) => (
  type: string
) => (): void => {
  if (type === "sendValidationCode") {
    _getValidationNewPassword(stores.uiStore.changePasswordUsername)
      .then(() => {
        stores.uiStore.setChangePasswordError(
          stores.userStore.GUI_CONFIG.language.changePassword
            .sendValidationCode_success
        );
      })
      .catch(function (error) {
        // console.log("error in logout...");
        stores.uiStore.setChangePasswordError(
          stores.userStore.GUI_CONFIG.language.changePassword
            .sendValidationCode_error
        );
      });
  } else if (type === "changePassword") {
    _setNewPassword(
      stores.uiStore.changePasswordUsername,
      stores.uiStore.changePasswordPassword,
      stores.uiStore.changePasswordValidationCode
    )
      // .then(() => {
      //   //
      // })
      .then(() => {
        stores.userStore.goPage(
          stores.userStore.paramsPage,
          configPaths.pages.Home,
          true
        );
      })
      .catch(function (error) {
        // console.log("error in logout...");
        stores.uiStore.setChangePasswordError(
          stores.userStore.GUI_CONFIG.language.changePassword
            .changePassword_error
        );
      });
  }
};
