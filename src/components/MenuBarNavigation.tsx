import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import {
  configGeneral,
  configPaths,
  IButton,
  RoundingT,
  TUiBooleanStorage,
} from "../config/globals";
import { TButtonID } from "../config/globals";
import { ComputeArticleSlideContent } from "../handlers/handlers_Articles";
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
  const color_menu = configGeneral.colors.menu;
  const router = useRouter();
  const selected_knowbook = router.query.nameOrPeriod as string;
  const isStatic_from_slide = (router.query.isStatic as string) === "true";

  const displaySlide =
    (router.pathname.includes(configPaths.pages.Knowbook) ||
      router.pathname.includes(configPaths.pages.StaticKnowbook)) &&
    !router.pathname.includes(configPaths.pages.KnowbookSpecial);
  const displayKnowbook = router.pathname.includes(
    configPaths.pages.ArticleSlide
  );

  const isStatic = router.pathname.includes(configPaths.pages.StaticKnowbook);

  const buttons: IButton[] = [
    {
      Id: TButtonID.BACK,
      onClick: () => {
        router.back();
      },
    },
    {
      Id: TButtonID.HOME,
    },
    {
      Id: TButtonID.SLIDE,
      hidden: !displaySlide,
      onClick: () => {
        props.stores.uiStore.setUiBooleanStorage(
          TUiBooleanStorage.ArticleSlideFetchingStarted,
          false
        );
        ComputeArticleSlideContent(
          props.stores,
          selected_knowbook,
          isStatic
        ).then(() => {
          goPage(
            props.stores,
            props.stores.baseStore.paramsPage,
            configPaths.pages.ArticleSlide,
            { nameOrPeriod: selected_knowbook, isStatic: isStatic }
          );
        });
      },
    },
    {
      Id: TButtonID.KNOWBOOK,
      hidden: !displayKnowbook,
      onClick: () => {
        goPage(
          props.stores,
          props.stores.baseStore.paramsPage,
          isStatic_from_slide
            ? configPaths.pages.StaticKnowbook
            : configPaths.pages.Knowbook,
          { nameOrPeriod: selected_knowbook }
        );
      },
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
