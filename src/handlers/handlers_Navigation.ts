import { ButtonIDType } from "../common/types";

import {
  _login,
  _signup,
  _logout,
  _getValidationNewPassword,
  _setNewPassword,
} from "../_api";
import { IStores } from "../stores/_RootStore";

/*******************Navigation*************************** */

export const onMenuButtonPath = (stores: IStores) => (
  buttonId: ButtonIDType
): string => {
  const buttons = stores.userStore.GUI_CONFIG.language.buttons;
  const path = buttons[buttonId].path;
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
