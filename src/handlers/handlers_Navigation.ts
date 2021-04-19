import { ButtonIDType } from "../common/globals";
import {
  _login,
  _signup,
  _logout,
  _getValidationNewPassword,
  _setNewPassword,
} from "../libs/_apiUserData";
import { configButtonsPath } from "../common/globals";

/*******************Navigation*************************** */

export const onMenuButtonPath = (buttonId: ButtonIDType): string => {
  // const buttons = stores.userStore.GUI_CONFIG.language.buttons;
  // const path = buttons[buttonId].path;
  const path = configButtonsPath[buttonId];
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
