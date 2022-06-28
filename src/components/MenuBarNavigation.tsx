import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import {
  configGeneral,
  configPaths,
  IButton,
  RoundingT,
  SizeT,
} from "../config/globals";
import { TButtonID } from "../config/globals";
import { goLanding, goPage, isMobile, updateHome } from "../libs/helpersBase";

import { IStores } from "../stores/RootStore";
import MenuBarButtonLayout from "./MenuBarButtonLayout";

interface IMenuBarNavigationProps {
  stores: IStores;
  rounding: RoundingT;
}

const MenuBarNavigation: React.FunctionComponent<IMenuBarNavigationProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const icon_size: SizeT = GUI_CONFIG.display.size_icon_menu;
  const color_menu = configGeneral.colors.menu;
  const router = useRouter();

  const buttons: IButton[] = [
    {
      Id: TButtonID.HOME,
      onClick: () => {
        updateHome(props.stores);
        goPage(
          props.stores,
          props.stores.baseStore.paramsPage,
          configPaths.pages.Home
        );
      },
    },
    {
      Id: TButtonID.BACK,
      onClick: () => {
        router.back();
      },
    },
    {
      Id: TButtonID.KNOWBOOKS,
    },
    {
      Id: TButtonID.CIRCLE,
      hidden:
        !router.pathname.includes(configPaths.pages.ItemNetwork) &&
        !router.pathname.includes(configPaths.pages.ItemFlat),
      onClick: () => {
        goPage(
          props.stores,
          props.stores.baseStore.paramsPage,
          configPaths.pages.ItemCircle,
          {
            title: props.stores.uiStore.selectedAtom.title,
            id: props.stores.uiStore.selectedAtom.id,
          }
        );
      },
    },
    {
      Id: TButtonID.NETWORK,
      hidden:
        !router.pathname.includes(configPaths.pages.ItemCircle) &&
        !router.pathname.includes(configPaths.pages.ItemFlat),
      onClick: () => {
        goPage(
          props.stores,
          props.stores.baseStore.paramsPage,
          configPaths.pages.ItemNetwork,
          {
            title: props.stores.uiStore.selectedAtom.title,
            id: props.stores.uiStore.selectedAtom.id,
          }
        );
      },
    },
    {
      Id: TButtonID.NETWORKFLAT,
      hidden:
        !router.pathname.includes(configPaths.pages.ItemCircle) &&
        !router.pathname.includes(configPaths.pages.ItemNetwork),
      onClick: () => {
        goPage(
          props.stores,
          props.stores.baseStore.paramsPage,
          configPaths.pages.ItemFlat,
          {
            title: props.stores.uiStore.selectedAtom.title,
            id: props.stores.uiStore.selectedAtom.id,
          }
        );
      },
    },
    {
      Id: TButtonID.LOGIN,
    },
    {
      Id: TButtonID.INFO,
      onClick: () => {
        goLanding(props.stores);
      },
    },
  ];

  const displayLabel = !isMobile(props.stores);

  return (
    <>
      <MenuBarButtonLayout
        stores={props.stores}
        name="NavigationMenuBar"
        icon_size={icon_size}
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
