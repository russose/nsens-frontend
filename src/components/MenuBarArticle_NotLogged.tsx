import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import {
  configGeneral,
  configPaths,
  eventT,
  IButton,
  RoundingT,
  SizeT,
  TUiBooleanStorage,
} from "../config/globals";
import { TButtonID } from "../config/globals";
import { showArticleBackNext } from "../handlers/handlers_Articles";
import { goPage } from "../libs/helpersBase";

import { IStores } from "../stores/RootStore";
import MenuBarButtonLayout from "./MenuBarButtonLayout";

interface IProps {
  stores: IStores;
  rounding: RoundingT;
  specific_buttons: IButton[];
}

const MenuBarArticle_NotLogged: React.FunctionComponent<IProps> = (props) => {
  const color_menu = configGeneral.colors.menu;
  const router = useRouter();
  const stores = props.stores;
  const icon_size: SizeT =
    stores.baseStore.GUI_CONFIG.display.size_icon_menu_article;

  const displayNavigationArrows =
    router.pathname.includes(configPaths.pages.Knowbook) ||
    router.pathname.includes(configPaths.pages.StaticKnowbook) ||
    router.pathname.includes(configPaths.pages.ItemCircle) ||
    router.pathname.includes(configPaths.pages.ItemNetwork);

  // const isLogged = props.stores.baseStore.isLogged;

  const buttons: IButton[] = [
    {
      Id: TButtonID.ARTICLE_BACK,
      disabled: !displayNavigationArrows,
      onClick: showArticleBackNext(props.stores, router, -1),
    },
    {
      Id: TButtonID.ARTICLE_NEXT,
      disabled: !displayNavigationArrows,
      onClick: showArticleBackNext(props.stores, router, 1),
    },
    ...props.specific_buttons,
    {
      Id: TButtonID.NETWORK,
      onClick: (input: { event: eventT }) => {
        stores.uiStore.setUiBooleanStorage(
          TUiBooleanStorage.showArticle,
          false
        );
        goPage(props.stores, configPaths.pages.ItemNetwork, {
          title: stores.uiStore.selectedAtom.title,
          id: stores.uiStore.selectedAtom.id,
        });
        input.event.preventDefault();
      },
    },
    // {
    //   Id: TButtonID.CIRCLE,
    //   // hidden: !router.pathname.includes(configPaths.pages.ItemCircle),
    //   onClick: (input: { event: eventT }) => {
    //     stores.uiStore.setUiBooleanStorage(
    //       TUiBooleanStorage.showArticle,
    //       false
    //     );
    //     goPage(
    //       props.stores,
    //       // props.stores.baseStore.paramsPage,
    //       configPaths.pages.ItemCircle,
    //       {
    //         title: stores.uiStore.selectedAtom.title,
    //         id: stores.uiStore.selectedAtom.id,
    //       }
    //     );
    //     input.event.preventDefault();
    //   },
    // },
    {
      Id: TButtonID.NETWORKFLAT,
      onClick: (input: { event: eventT }) => {
        stores.uiStore.setUiBooleanStorage(
          TUiBooleanStorage.showArticle,
          false
        );
        goPage(props.stores, configPaths.pages.ItemFlat, {
          title: props.stores.uiStore.selectedAtom.title,
          id: props.stores.uiStore.selectedAtom.id,
        });
        input.event.preventDefault();
      },
    },
  ];

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

export default observer(MenuBarArticle_NotLogged);
