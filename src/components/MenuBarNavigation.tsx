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

  const displaySlide =
    router.pathname.includes(configPaths.pages.Knowbook) &&
    !router.pathname.includes(configPaths.pages.KnowbookSlide);
  const displayKnowbook = router.pathname.includes(
    configPaths.pages.KnowbookSlide
  );

  const buttons: IButton[] = [
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
        ComputeArticleSlideContent(props.stores, selected_knowbook).then(() => {
          goPage(
            props.stores,
            props.stores.baseStore.paramsPage,
            configPaths.pages.KnowbookSlide,
            { nameOrPeriod: selected_knowbook }
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
          configPaths.pages.Knowbook,
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

    {
      Id: TButtonID.BACK,
      onClick: () => {
        router.back();
      },
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
