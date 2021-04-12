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

/*******************Change Password*************************** */

export const onChangePassword_text = (uiStore: UIStore) => (
  type: string
) => (input: { value: string; syntheticEvent: eventT }): void => {
  if (type === "username") {
    uiStore.setChangePasswordUsername(input.value);
  } else if (type === "password") {
    uiStore.setChangePasswordPassword(input.value);
  } else if (type === "validationCode") {
    uiStore.setChangePasswordValidationCode(input.value);
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
          stores.userStore.GUI_CONFIG.paths.pages.Home,
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
