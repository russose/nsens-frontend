import { observer } from "mobx-react-lite";
import React from "react";
import { IButton, SizeT, TButtonID, configGeneral } from "../config/globals";

import { onEditUserProps, onLogout } from "../handlers/handlers_User";
import { IStores } from "../stores/RootStore";
import MenuBarButtonLayout from "./MenuBarButtonLayout";
import { goLanding } from "../libs/helpersBase";

interface IProps {
  stores: IStores;
}

const MenuBarUser: React.FunctionComponent<IProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const icon_size: SizeT = GUI_CONFIG.display.size_icon_menu_navigation;
  const color_menu = configGeneral.colors.menu;
  const rounding = GUI_CONFIG.display.rounding_menu;

  const isLogged = props.stores.baseStore.isLogged;

  const buttons: IButton[] = [
    {
      Id: TButtonID.EDIT_USER,
      onClick: onEditUserProps(props.stores),
      hidden: !isLogged,
    },
    {
      Id: TButtonID.INFO,
      onClick: () => {
        goLanding(props.stores);
      },
    },
    {
      Id: TButtonID.LOGOUT,
      onClick: onLogout(props.stores),
      hidden: !isLogged,
    },
  ];

  // const displayLabel = !isMobile(props.stores);

  return (
    <>
      <MenuBarButtonLayout
        stores={props.stores}
        name="MenuBarUser"
        icon_size={icon_size}
        color={color_menu}
        direction="row"
        rounding={rounding}
        buttons={buttons}
        displayLabel={true}
        withoutBorder={true}
      />
    </>
  );
};

export default observer(MenuBarUser);
