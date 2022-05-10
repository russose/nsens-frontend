import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import {
  configGeneral,
  configPaths,
  CONFIG_ENV,
  IButton,
  RoundingT,
  SizeT,
} from "../config/globals";
import { TButtonID } from "../config/globals";
import { goPage, isMobile } from "../libs/helpersBase";

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
    },
    {
      Id: TButtonID.BACK,
      onClick: () => {
        router.back();
      },
    },
    {
      Id: TButtonID.CIRCLE,
      hidden: !router.pathname.includes(configPaths.pages.ItemNetwork),
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
      hidden: !router.pathname.includes(configPaths.pages.ItemCircle),
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
      Id: TButtonID.LOGIN,
    },
    {
      Id: TButtonID.INFO,
      onClick: () => {
        if (typeof window !== "undefined") {
          const url_landing_en = CONFIG_ENV.LANDING_URL_EN;
          const url_landing = url_landing_en.replace(
            ".en.",
            "." + props.stores.baseStore.paramsPage.lang + "."
          );
          window.open(
            url_landing,
            "_blank" // <- This is what makes it open in a new window.
          );
        }
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
