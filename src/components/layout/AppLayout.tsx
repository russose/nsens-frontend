import { Box, Heading, Sticky } from "gestalt";
import { observer } from "mobx-react-lite";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import {
  onSearchHomeKeyboard,
  onSearchHomeSubmit,
  onSearchHomeText,
} from "../../handlers";
import MenuBarDisplay from "../MenuBarDisplay";
import SearchBar from "../SearchBar";
import MenuBarNavigation from "../MenuBarNavigation";
import { IStores } from "../../stores/_RootStore";
import { paths } from "../../common/configPaths";
import PageLayoutHybrid from "./PageLayoutHybrid";
import {
  handlerT,
  reactComponentT,
  RoundingT,
  SizeT,
} from "../../common/types";
import Dialogs from "../Dialogs";
import { useStores } from "../../stores/_RootStoreHook";
import { isMobile } from "../../libs/utils";

const AppLayout: React.FunctionComponent = (props) => {
  const stores = useStores();
  const router = useRouter();

  const GUI_CONFIG = stores.userStore.GUI_CONFIG;
  const header_size: SizeT = GUI_CONFIG.display.header_size;
  const color_menu = GUI_CONFIG.general.colors.menu;
  const color_headers = GUI_CONFIG.general.colors.headers as handlerT;
  const rounding_menu: RoundingT = GUI_CONFIG.display.rounding_menu;

  const isDisplayMenuDisplayed: boolean = router.pathname.includes(
    paths.pages.Item
  );

  const navigationMenu = (
    <MenuBarNavigation
      stores={stores}
      name="NavigationMenuBar"
      color={color_menu}
    />
  );

  const displayMenu = (
    <MenuBarDisplay stores={stores} name="MenuBarDisplay" color={color_menu} />
  );

  const searchbar = (
    <SearchBar
      placeholder={GUI_CONFIG.language.searchBar}
      handlerText={onSearchHomeText(stores.uiStore)}
      handlerSubmit={onSearchHomeSubmit(stores)}
      handlerKeyboard={onSearchHomeKeyboard(stores)}
      value={stores.uiStore.searchPattern}
    />
  );

  const titleText = (title: string) => {
    return (
      <Box
        color={color_headers}
        borderStyle="lg"
        flex="grow"
        rounding={rounding_menu}
        padding={1}
      >
        <Heading size={header_size} align="center" overflow="normal">
          {title}
        </Heading>
      </Box>
    );
  };

  const header = (stores: IStores, router: NextRouter) => {
    let header: reactComponentT | handlerT;
    if (router.pathname.includes(paths.pages.Home)) {
      header = searchbar;
    } else if (router.pathname.includes(paths.pages.User)) {
      header = titleText(
        stores.userStore.user === null ? "" : stores.userStore.user.username
      );
    } else if (router.pathname.includes(paths.pages.Knowbooks)) {
      header = titleText(GUI_CONFIG.language.knowbooks.knowbooks_title);
    } else if (router.pathname.includes(paths.pages.KnowbookSaved)) {
      header = titleText(GUI_CONFIG.language.knowbooks.AllSaved_title);
    } else if (router.pathname.includes(paths.pages.KnowbookNone)) {
      header = titleText(GUI_CONFIG.language.knowbooks.None_Title);
    } else {
      header = titleText(router.query.title as string);
    }

    return header;
  };

  const top_mobile = (
    <>
      <Box column={12}>
        <Box display="flex" flex="grow" alignItems="center">
          {header(stores, router)}
        </Box>
      </Box>
    </>
  );

  const top_desktop = (
    <>
      <Box column={8} smColumn={8} mdColumn={8} lgColumn={10}>
        <Box display="flex" flex="grow" alignItems="center">
          {header(stores, router)}
        </Box>
      </Box>

      <Box column={4} smColumn={4} mdColumn={4} lgColumn={2}>
        {navigationMenu}
      </Box>
    </>
  );

  const bottom_mobile = navigationMenu;

  let top;
  let bottom;
  let displayMenuWithLayout;
  if (isMobile(GUI_CONFIG.id)) {
    top = top_mobile;
    bottom = bottom_mobile;
    displayMenuWithLayout = <Box column={12}>{displayMenu}</Box>;
    bottom = navigationMenu;
    // navigationMenu_mobile = (
    //   <>
    //     <Box
    //       padding={0}
    //       borderStyle="lg"
    //       rounding={rounding_menu}
    //       color="lightGray"
    //     >
    //       {navigationMenu}
    //     </Box>
    //   </>
    // );
  } else {
    top = top_desktop;
    displayMenuWithLayout = (
      <Box column={4} smColumn={3} mdColumn={3} lgColumn={2}>
        {displayMenu}
      </Box>
    );
  }

  return (
    <>
      <PageLayoutHybrid stores={stores} top={top} bottom={bottom}>
        {isDisplayMenuDisplayed && displayMenuWithLayout}
        {props.children}
      </PageLayoutHybrid>
      <Dialogs />
    </>
  );
};

export default observer(AppLayout);
