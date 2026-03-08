import { observer } from "mobx-react-lite";
import React from "react";
import {
  IButton,
  RoundingT,
  SizeT,
  TButtonID,
  TUiBooleanStorage,
  configGeneral,
  configPaths,
} from "../config/globals";
import { goPage } from "../libs/helpersBase";

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
  const icon_size: SizeT = GUI_CONFIG.display.size_icon_menu_navigation;
  const color_menu = configGeneral.colors.menu;

  const buttons: IButton[] = [
    {
      Id: TButtonID.KNOWBOOKS_BEST,
      onClick: () => {
        // updateHome(props.stores);
        goPage(props.stores, configPaths.pages.Home);
      },
    },
    {
      Id: TButtonID.KNOWBOOK_FOLLOWED,
      onClick: () => {
        // updateHome(props.stores);
        goPage(props.stores, configPaths.pages.KnowbooksSaved);
      },
      hidden: !props.stores.baseStore.isLogged,
    },
    {
      Id: TButtonID.KNOWBOOK_MINE,
      onClick: () => {
        // updateHome(props.stores);
        goPage(props.stores, configPaths.pages.KnowbooksMine);
      },
      hidden: !props.stores.baseStore.isLogged,
    },
    {
      Id: TButtonID.SEARCH,
      onClick: () => {
        // updateHome(props.stores);
        goPage(props.stores, configPaths.pages.Search);
      },
    },

    // {
    //   Id: TButtonID.,
    //   onClick: () => {
    //     goPage(props.stores, configPaths.pages.Search);
    //   },
    // },

    {
      Id: TButtonID.HISTORY,
      onClick: () => {
        props.stores.uiStore.setUiBooleanStorage(
          TUiBooleanStorage.showHistory,
          true
        );
      },
    },
    {
      Id: TButtonID.LOGIN,
      onClick: () => {
        goPage(props.stores, configPaths.pages.User);
      },
    },
    // {
    //   Id: TButtonID.INFO,
    //   onClick: () => {
    //     goLanding(props.stores);
    //   },
    // },
  ];

  // const displayLabel = !isMobile(props.stores);
  const displayLabel = false;

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
