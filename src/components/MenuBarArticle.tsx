import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import {
  configGeneral,
  configPaths,
  eventT,
  IButton,
  RoundingT,
  TUiBooleanStorage,
} from "../config/globals";
import { TButtonID } from "../config/globals";
import { showArticleBackNext } from "../handlers/handlers_Articles";
import { onEditKnowbooks } from "../handlers/handlers_Knowbooks";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../handlers/handlers_Saved";
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
  const color_menu = configGeneral.colors.menu;
  const router = useRouter();
  const stores = props.stores;

  const displayNavigationArrows =
    router.pathname.includes(configPaths.pages.Knowbook) ||
    router.pathname.includes(configPaths.pages.StaticKnowbook) ||
    router.pathname.includes(configPaths.pages.ItemCircle) ||
    router.pathname.includes(configPaths.pages.ItemNetwork);

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
    {
      Id: TButtonID.EDIT,
      onClick: onEditKnowbooks(stores)(stores.uiStore.selectedAtom.id),
      hidden: !isItemSaved(stores)(stores.uiStore.selectedAtom.id),
    },
    {
      Id: TButtonID.SAVE,
      onClick: onSaved(stores)(stores.uiStore.selectedAtom.id),
      disabled: !isItemSavedActivated(stores)(stores.uiStore.selectedAtom.id),
      iconColor: isItemSaved(stores)(stores.uiStore.selectedAtom.id)
        ? configGeneral.colors.iconColorDefaultSelected
        : configGeneral.colors.iconColorDefaultNotSelected,
    },
    {
      Id: TButtonID.NETWORK,
      // hidden: !router.pathname.includes(configPaths.pages.ItemCircle),
      onClick: (input: { event: eventT }) => {
        stores.uiStore.setUiBooleanStorage(
          TUiBooleanStorage.showArticle,
          false
        );
        goPage(
          props.stores,
          props.stores.baseStore.paramsPage,
          configPaths.pages.ItemNetwork,
          {
            title: stores.uiStore.selectedAtom.title,
            id: stores.uiStore.selectedAtom.id,
          }
        );
        input.event.preventDefault();
      },
    },
    {
      Id: TButtonID.CIRCLE,
      // hidden: !router.pathname.includes(configPaths.pages.ItemCircle),
      onClick: (input: { event: eventT }) => {
        stores.uiStore.setUiBooleanStorage(
          TUiBooleanStorage.showArticle,
          false
        );
        goPage(
          props.stores,
          props.stores.baseStore.paramsPage,
          configPaths.pages.ItemCircle,
          {
            title: stores.uiStore.selectedAtom.title,
            id: stores.uiStore.selectedAtom.id,
          }
        );
        input.event.preventDefault();
      },
    },
    {
      Id: TButtonID.NETWORKFLAT,
      onClick: (input: { event: eventT }) => {
        stores.uiStore.setUiBooleanStorage(
          TUiBooleanStorage.showArticle,
          false
        );
        goPage(
          props.stores,
          props.stores.baseStore.paramsPage,
          configPaths.pages.ItemFlat,
          {
            title: props.stores.uiStore.selectedAtom.title,
            id: props.stores.uiStore.selectedAtom.id,
          }
        );
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
        icon_size="xs"
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
