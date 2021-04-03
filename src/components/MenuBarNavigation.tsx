import { observer } from "mobx-react-lite";
import React from "react";
import { ButtonIDType } from "../common/types";
import { IStores } from "../stores/_RootStore";
import MenuBarButtonLayout from "./layout/MenuBarButtonLayout";
import _Button, { IButton } from "./_Button";

interface IMenuBarNavigationProps {
  stores: IStores;
}

const MenuBarNavigation: React.FunctionComponent<IMenuBarNavigationProps> = (
  props
) => {
  const color_menu = props.stores.userStore.GUI_CONFIG.general.colors.menu;
  const buttons: IButton[] = [
    {
      Id: ButtonIDType.HOME,
    },
    {
      Id: ButtonIDType.KNOWBOOKS,
    },
    {
      Id: ButtonIDType.LOGIN,
    },
  ];

  return (
    <MenuBarButtonLayout
      stores={props.stores}
      // name={props.name}
      name="NavigationMenuBar"
      color={color_menu}
      direction="row"
      buttons={buttons}
    />
  );
};

export default observer(MenuBarNavigation);
