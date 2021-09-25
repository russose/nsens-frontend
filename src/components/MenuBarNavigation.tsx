import { observer } from "mobx-react-lite";
import React from "react";
import { configGeneral, IButton, RoundingT } from "../config/globals";
import { TButtonID } from "../config/globals";
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
      Id: TButtonID.HOME,
    },
    {
      Id: TButtonID.KNOWBOOKS_FEATURED,
    },
    {
      Id: TButtonID.KNOWBOOKS_USER,
    },
    {
      Id: TButtonID.LOGIN,
    },
    {
      Id: TButtonID.INFO,
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
