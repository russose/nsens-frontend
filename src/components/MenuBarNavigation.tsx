import { observer } from "mobx-react-lite";
import React from "react";
import { configGeneral, IButton, RoundingT } from "../config/globals";
import { TButtonID } from "../config/globals";
import { isMobile } from "../libs/helpersBase";
import { IStores } from "../stores/RootStore";
import LayoutMenuBarButton from "./layout/LayoutMenuBarButton";

interface IMenuBarNavigationProps {
  stores: IStores;
  rounding: RoundingT;
}

const MenuBarNavigation: React.FunctionComponent<IMenuBarNavigationProps> = (
  props
) => {
  const color_menu = configGeneral.colors.menu;

  const buttons: IButton[] = [
    {
      Id: TButtonID.HOME,
    },
    // {
    //   Id: TButtonID.KNOWBOOKS_FEATURED,
    // },
    // {
    //   Id: TButtonID.KNOWBOOKS_USER,
    // },
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
      <LayoutMenuBarButton
        stores={props.stores}
        // name={props.name}
        name="NavigationMenuBar"
        color={color_menu}
        direction="row"
        rounding={props.rounding}
        buttons={buttons}
        displayLabel={displayLabel}
      />
    </>
  );
};

export default observer(MenuBarNavigation);
