import { Box, Heading } from "gestalt";
import { observer } from "mobx-react-lite";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import { GUI_CONFIG } from "../../common/config";
import {
  onSearchHomeKeyboard,
  onSearchHomeSubmit,
  onSearchHomeText,
} from "../../handlers";
import { useStores } from "../../stores/_RootStoreHook";
import MenuBarDisplay from "../MenuBarDisplay";
import SearchBar from "../SearchBar";
import MenuBarNavigation from "../MenuBarNavigation";
import PageLayoutDesktop from "./PageLayoutDesktop";
import { IStores } from "../../stores/_RootStore";
import { displayDesktop } from "../../common/configDesktop";
import { paths } from "../../common/configPaths";
import PageLayoutMobile from "./PageLayoutMobile";
import { displayMobile } from "../../common/configMobile";
import { goLanding } from "../../libs/utils";

export interface IPageLayoutProps {
  displayMenu: any;
  navigationMenu: any;
  header: any;
}

const AppLayout: React.FunctionComponent = (props) => {
  const stores = useStores();
  const router = useRouter();

  stores.uiStore.setScreen();

  //when username==="", it means the user is not logged!
  //When username===null, it means the App is not initialyzed
  if (stores.userStore.user === null) {
    stores.userStore.initializeApp(stores);
    return <></>;
  }

  if (!stores.userStore.isLogged) {
    // Not Logged
    if (process.browser) {
      goLanding();
    }
  }

  if (stores.uiStore.screen.isMobile) {
    GUI_CONFIG.display = displayMobile;
    //Minimum of 3 card compact
    if (
      stores.uiStore.screen.width <
      3 * (GUI_CONFIG.display.atom_compact_sizes.width + 20)
    ) {
      const dim = stores.uiStore.screen.width / 3.0 - 20;
      GUI_CONFIG.display.atom_compact_sizes.width = dim;
      GUI_CONFIG.display.atom_compact_sizes.width = dim;
    }
  } else {
    GUI_CONFIG.display = displayDesktop;
    if (
      stores.uiStore.screen.width > GUI_CONFIG.general.large_screen_breakpoint
    ) {
      GUI_CONFIG.display.atom_sizes.lgColumn = 1;
      GUI_CONFIG.display.knowbook_sizes.lgColumn = 1;
    }
  }

  const header_size: any = GUI_CONFIG.display.header_size;
  const color_menu = GUI_CONFIG.display.colors.menu;
  const color_headers = GUI_CONFIG.display.colors.headers as any;

  // const navigationMenu = () => {
  //   return
  const navigationMenu = (
    <MenuBarNavigation name="NavigationMenuBar" color={color_menu} />
  );
  // };

  // const displayMenu = (displayMenuDisplayed: boolean) => {
  //   return (
  //     displayMenuDisplayed && (
  const displayMenu = (
    <MenuBarDisplay name="MenuBarDisplay" color={color_menu} />
  );
  //     )
  //   );
  // };

  // const searchbar = (stores: IStores) => {
  //   return (
  const searchbar = (
    <SearchBar
      placeholder={GUI_CONFIG.language.searchBar}
      handlerText={onSearchHomeText(stores.uiStore)}
      handlerSubmit={onSearchHomeSubmit(stores)}
      handlerKeyboard={onSearchHomeKeyboard(stores)}
      value={stores.uiStore.searchPattern}
    />
  );
  //   );
  // };

  const headerText = (title: string) => {
    return (
      <Box
        color={color_headers}
        borderStyle="lg"
        flex="grow"
        rounding={2}
        padding={2}
      >
        <Heading size={header_size} align="center" overflow="normal">
          {title}
        </Heading>
      </Box>
    );
  };

  const header = (stores: IStores, router: NextRouter) => {
    let header: any;
    if (router.pathname === paths.pages.Home) {
      // header = searchbar(stores);
      header = searchbar;
    } else if (router.pathname === paths.pages.User) {
      // if (stores.userStore.isLogged) {
      //   header = headerText(
      //     stores.userStore.user === null ? "" : stores.userStore.user.username
      //   );
      // } else {
      //   header = headerText(GUI_CONFIG.language.loginSignup.title);
      // }
      header = headerText(
        stores.userStore.user === null ? "" : stores.userStore.user.username
      );
    } else if (router.pathname === paths.pages.Knowbooks) {
      header = headerText(GUI_CONFIG.language.knowbooks.knowbooks_title);
    } else if (router.pathname === "/" + paths.pages.KnowbookSaved) {
      header = headerText(GUI_CONFIG.language.knowbooks.AllSaved_title);
    } else if (router.pathname === "/" + paths.pages.KnowbookNone) {
      header = headerText(GUI_CONFIG.language.knowbooks.None_Title);
    } else {
      header = headerText(router.query.title as string);
    }

    return header;
  };

  return (
    <>
      {stores.uiStore.screen.isMobile ? (
        <PageLayoutMobile
          displayMenu={router.pathname.includes("ItemView") && displayMenu}
          navigationMenu={navigationMenu}
          header={header(stores, router)}
        >
          {props.children}
        </PageLayoutMobile>
      ) : (
        <PageLayoutDesktop
          displayMenu={router.pathname.includes("ItemView") && displayMenu}
          navigationMenu={navigationMenu}
          header={header(stores, router)}
        >
          {props.children}
        </PageLayoutDesktop>
      )}
      {/* {stores.uiStore.screen.isMobile ? (
        <PageLayoutMobile
          displayMenu={displayMenu(router.pathname.includes("ItemView"))}
          navigationMenu={navigationMenu()}
          header={header(stores, router)}
        >
          {props.children}
        </PageLayoutMobile>
      ) : (
        <PageLayoutDesktop
          displayMenu={displayMenu(router.pathname.includes("ItemView"))}
          navigationMenu={navigationMenu()}
          header={header(stores, router)}
        >
          {props.children}
        </PageLayoutDesktop>
      )} */}
    </>
  );
};

export default observer(AppLayout);
