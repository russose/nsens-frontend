import { NextRouter } from "next/router";
import { configGeneral, configPaths } from "../config/configLocalAndEnv";
import {
  IButton,
  IKnowbook,
  KnowbookID,
  TButtonID,
  TKnowbooksPages,
} from "../config/globals";
import { showArticleBackNext } from "../handlers/handlers_Content";
import {
  onEditKnowbookProps,
  onEditKnowbooks,
  onFollowPublicKnowbook,
} from "../handlers/handlers_Knowbooks";
import { copyLink, goUserHandler_ } from "../handlers/handlers_Navigation";
import { goPage } from "../libs/helpersBase";
import { IStores } from "../stores/RootStore";
import { IsItemInAnyKnowbook } from "../libs/helpersSavedKnowbooks";

export function buttons_sharing(
  stores: IStores,
  router: NextRouter,
  disabled = false
): IButton[] {
  // const display_link = true;
  const buttons: IButton[] = [
    {
      Id: TButtonID.LINK,
      onClick: copyLink(stores)(router),
      // hidden: !display_link,
      disabled: disabled,
    },
  ];

  return buttons;
}

export function buttons_back(router: NextRouter): IButton[] {
  // const display_link = true;
  const buttons: IButton[] = [
    {
      Id: TButtonID.BACK,
      onClick: () => {
        router.back();
      },
    },
  ];

  return buttons;
}

export function buttons_network_knowbook(
  stores: IStores,
  knowbook: IKnowbook,
  desactivateNetwork = false
): IButton[] {
  if (knowbook === undefined) {
    return [];
  }

  const buttons: IButton[] = [
    {
      Id: TButtonID.NETWORK,
      onClick: () => {
        if (desactivateNetwork) {
          return;
        }
        goPage(stores, configPaths.pages.ItemNetwork, {
          title: knowbook.name,
          id: knowbook.id,
        });
      },
      iconColor: undefined,
      hidden: false,
    },
  ];

  return buttons;
}

export function buttons_Knowbook_Card(
  stores: IStores,
  knowbook: IKnowbook,
  desactivateNetwork = false
): IButton[] {
  if (knowbook === undefined) {
    return [];
  }

  const isLogged = stores.baseStore.isLogged;

  // const id_public: IPublicKnowbookKey = {
  //   owner: knowbook.owner,
  //   name: knowbook.name,
  // };
  const id_public: KnowbookID = knowbook.id;

  const buttons: IButton[] = [
    ...buttons_network_knowbook(stores, knowbook, desactivateNetwork),
    {
      Id: TButtonID.FOLLOW_PUBLIC,
      onClick: isLogged
        ? onFollowPublicKnowbook(stores)(knowbook)
        : goUserHandler_(stores)(stores.uiStore.selectedAtom.id),
      iconColor: stores.knowbookStore.followedPublicKnowbooks.has(knowbook.id)
        ? (configGeneral.colors.iconColorDefaultSelected as any)
        : (configGeneral.colors.iconColorDefault as any),
      hidden:
        (isLogged && knowbook.owner === stores.baseStore.user.userId) ||
        !knowbook.public,
    },
    {
      Id: TButtonID.EDIT_KNOWBOOK,
      onClick: onEditKnowbookProps(stores)(id_public),
      iconColor: undefined,
      hidden:
        stores.baseStore.user === null || stores.baseStore.user === undefined
          ? true
          : knowbook.owner !== stores.baseStore.user.userId,
    },
  ];

  return buttons;
}

export function buttons_MenuBarItem(
  stores: IStores,
  router: NextRouter
): IButton[] {
  const displayNavigationArrows =
    router.pathname.includes(configPaths.pages.Knowbook) ||
    // router.pathname.includes(configPaths.pages.StaticKnowbook) ||
    // &&!router.pathname.includes(configPaths.pages.KnowbookSpecial);
    router.query.type === TKnowbooksPages.Mostviewed;

  // const display_link =
  //   // router.pathname.includes(configPaths.pages.ItemFlat) ||
  //   router.pathname.includes(configPaths.pages.ItemNetwork);

  const hide_network =
    router.pathname.includes(configPaths.pages.ItemNetwork) &&
    router.query.id === stores.uiStore.selectedAtom.id;

  const isLogged = stores.baseStore.isLogged;

  const buttons_nav: IButton[] = [
    {
      Id: TButtonID.ARTICLE_BACK,
      hidden: !displayNavigationArrows,
      onClick: showArticleBackNext(stores, router, -1),
    },
    {
      Id: TButtonID.ARTICLE_NEXT,
      hidden: !displayNavigationArrows,
      onClick: showArticleBackNext(stores, router, 1),
    },
  ];

  const buttons_edit_Logged: IButton[] = [
    {
      Id: TButtonID.EDIT_CONTENT,
      onClick: onEditKnowbooks(stores)(stores.uiStore.selectedAtom.id),
      iconColor: IsItemInAnyKnowbook(stores.uiStore.selectedAtom.id, stores)
        ? (configGeneral.colors.iconColorDefaultSelected as any)
        : (configGeneral.colors.iconColorDefaultNotSelected as any),
    },
  ];

  const buttons_edit_NotLogged: IButton[] = [
    {
      Id: TButtonID.EDIT_CONTENT,
      onClick: goUserHandler_(stores)(stores.uiStore.selectedAtom.id),
      hidden: isLogged,
      iconColor: configGeneral.colors.iconColorDefault,
    },
  ];

  const buttons_network: IButton[] = [
    {
      Id: TButtonID.NETWORK,
      onClick: () => {
        goPage(stores, configPaths.pages.ItemNetwork, {
          title: stores.uiStore.selectedAtom.title,
          id: stores.uiStore.selectedAtom.id,
        });
      },
      hidden: hide_network,
    },
  ];

  const buttons = isLogged
    ? [...buttons_network, ...buttons_edit_Logged, ...buttons_nav]
    : [...buttons_network, ...buttons_edit_NotLogged, ...buttons_nav];

  return buttons;
}
