import { observer } from "mobx-react-lite";
import React from "react";
import { configGeneral, IButton, RoundingT } from "../config/globals";
import { ButtonIDType } from "../config/globals";
import { isMobile } from "../libs/helpersBase";
import { IStores } from "../stores/RootStore";
import MenuBarButtonLayout from "./layout/MenuBarButtonLayout";

interface IMenuBarNavigationProps {
  stores: IStores;
  rounding: RoundingT;
  // isMobile: boolean;
}

const MenuBarNavigation: React.FunctionComponent<IMenuBarNavigationProps> = (
  props
) => {
  const color_menu = configGeneral.colors.menu;

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
    {
      Id: ButtonIDType.INFO,
    },
  ];

  const displayLabel = !isMobile(props.stores);

  return (
    <>
      <MenuBarButtonLayout
        stores={props.stores}
        // name={props.name}
        name="NavigationMenuBar"
        color={color_menu}
        direction="row"
        // width={width}
        rounding={props.rounding}
        buttons={buttons}
        displayLabel={displayLabel}
      />
    </>
  );
};

export default observer(MenuBarNavigation);
