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
import PageLayoutHybrid from "./PageLayoutHybrid";
import { IStores } from "../../stores/_RootStore";
import { displayDesktop } from "../../common/configDesktop";
import { displayMobile } from "../../common/configMobile";
import { paths } from "../../common/configPaths";

export interface IPageLayoutProps {
  displayMenu: any;
  navigationMenu: any;
  header: any;
}

const PagesLayout: React.FunctionComponent = (props) => {
  const stores = useStores();
  const router = useRouter();

  if (stores.uiStore.screen.isMobile) {
    GUI_CONFIG.display = displayMobile;
  } else {
    GUI_CONFIG.display = displayDesktop;
  }

  const header_size: any = GUI_CONFIG.display.header_size;
  const color_menu = GUI_CONFIG.display.colors.menu;
  const color_headers = GUI_CONFIG.display.colors.headers as any;

  const navigationMenu = () => {
    return <MenuBarNavigation name="NavigationMenuBar" color={color_menu} />;
  };

  const displayMenu = (displayMenuDisplayed: boolean) => {
    return (
      displayMenuDisplayed && (
        <MenuBarDisplay name="MenuBarDisplay" color={color_menu} />
      )
    );
  };

  const searchbar = (stores: IStores) => {
    return (
      <SearchBar
        placeholder={GUI_CONFIG.language.searchBar}
        handlerText={onSearchHomeText(stores.uiStore)}
        handlerSubmit={onSearchHomeSubmit(stores)}
        handlerKeyboard={onSearchHomeKeyboard(stores)}
        value={stores.uiStore.searchPattern}
      />
    );
  };

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
      header = searchbar(stores);
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
        <PageLayoutHybrid
          displayMenu={displayMenu(router.pathname.includes("ItemView"))}
          navigationMenu={navigationMenu()}
          header={header(stores, router)}
        >
          {props.children}
        </PageLayoutHybrid>
      ) : (
        <PageLayoutHybrid
          displayMenu={displayMenu(router.pathname.includes("ItemView"))}
          navigationMenu={navigationMenu()}
          header={header(stores, router)}
        >
          {props.children}
        </PageLayoutHybrid>
      )}
    </>
  );
};

export default observer(PagesLayout);
