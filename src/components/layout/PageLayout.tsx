import { Box, Sticky } from "gestalt";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import { USER_DISPLAY, USER_GUI_CONFIG } from "../../common/config";
import {
  onSearchHomeKeyboard,
  onSearchHomeSubmit,
  onSearchHomeText,
} from "../../handlers";
import { initializeApp } from "../../initialization";
import { useStores } from "../../stores/_RootStoreHook";
import Dialogs from "../Dialogs";
import { JsHeading } from "../_js_components";
import MenuBarDisplay from "../MenuBarDisplay";
import SearchBar from "../SearchBar";
import MenuBarNavigation from "../MenuBarNavigation";

const header_size = USER_DISPLAY.header_size;
const color_menu = USER_DISPLAY.colors.menu;
const color_headers = USER_DISPLAY.colors.headers as any;

const PageLayout: React.FunctionComponent = (props) => {
  const stores = useStores();
  const router = useRouter();

  if (stores.userStore.user === null) {
    initializeApp(
      stores.savedStore,
      stores.userStore,
      stores.knowbookStore,
      stores.feedStore
    );
  }

  // const navigationButtonsIds: ButtonIDType[] = [
  //   ButtonIDType.HOME,
  //   ButtonIDType.KNOWBOOKS,
  //   // ButtonIDType.VIZS,
  //   ButtonIDType.LOGIN,
  // ];
  const navigationMenu = (
    <MenuBarNavigation name="NavigationMenuBar" color={color_menu} />
    // <Box color="white" padding={1} display="block">
    //   <MenuBarLink
    //     name="NavigationMenuBar"
    //     buttonsIds={navigationButtonsIds}
    //     color={color_menu}
    //     path_handler={onMenuButtonPath(stores.uiStore, stores.userStore)}
    //   />
    // </Box>
  );

  const displayMenuDisplayed = router.pathname.includes("ItemView");
  const displayMenu = displayMenuDisplayed && (
    <MenuBarDisplay name="MenuBarDisplay" color={color_menu} />
  );

  const searchbar = (
    <SearchBar
      placeholder={USER_GUI_CONFIG.searchBar}
      handlerText={onSearchHomeText(stores.uiStore)}
      handlerSubmit={onSearchHomeSubmit(
        stores.feedStore,
        stores.uiStore,
        stores.userStore
      )}
      handlerKeyboard={onSearchHomeKeyboard(
        stores.feedStore,
        stores.uiStore,
        stores.userStore
      )}
      value={stores.uiStore.searchPattern}
    />
  );

  // const avatar = (
  //   <AvatarLink
  //     username={savedStore.user === null ? "" : savedStore.user.username}
  //     logged={savedStore.isLogged}
  //     pathname="/User"
  //   />
  // );

  const headerText = (title: string) => {
    return (
      <Box
        color={color_headers}
        borderSize="lg"
        flex="grow"
        rounding={2}
        padding={2}
      >
        <JsHeading size={header_size} align="center">
          {title}
        </JsHeading>
      </Box>
    );
  };

  let header;
  if (router.pathname === "/" || router.pathname === "/index") {
    header = searchbar;
  } else if (router.pathname === "/User") {
    if (stores.userStore.isLogged) {
      header = headerText(
        stores.userStore.user === null ? "" : stores.userStore.user.username
      );
    } else {
      header = headerText(USER_GUI_CONFIG.loginSignup.title);
    }
  } else if (router.pathname === "/Knowbooks") {
    header = headerText(USER_GUI_CONFIG.knowbooks.knowbooks_title);
  } else if (router.pathname === "/Saved") {
    header = headerText(USER_GUI_CONFIG.knowbooks.AllSaved_title);
  } else if (router.pathname === "/None") {
    header = headerText(USER_GUI_CONFIG.knowbooks.None_Title);
  } else {
    header = headerText(router.query.title as string);
  }

  return (
    <>
      <Box
        color="white"
        padding={0}
        display="flex"
        direction="column"
        height="98vh"
        alignItems="center"
        overflow="hidden"
      >
        <Box column={12} smColumn={12} mdColumn={12} lgColumn={10}>
          <Sticky top={0}>
            <Box display="flex" alignItems="center" wrap={true}>
              <Box
                padding={2}
                display="inlineBlock"
                column={7}
                smColumn={8}
                mdColumn={8}
                lgColumn={9}
              >
                <Box
                  padding={0}
                  display="flex"
                  flex="grow"
                  alignItems="center"
                  // justifyContent="start"
                >
                  {displayMenu}
                  {header}
                </Box>
              </Box>

              <Box
                padding={0}
                column={5}
                smColumn={4}
                mdColumn={4}
                lgColumn={3}
                display="inlineBlock"
                smDisplay="inlineBlock"
                mdDisplay="inlineBlock"
                lgDisplay="inlineBlock"
              >
                {navigationMenu}
              </Box>

              {/* <Box
              padding={1}
              display="inlineBlock"
              column={1}
              smColumn={1}
              mdColumn={1}
              lgColumn={1}
            >
              {avatar}
            </Box> */}
            </Box>
          </Sticky>

          <Box
            color="white"
            padding={0}
            display="flex"
            direction="column"
            height="90vh"
            width="100"
            justifyContent="between"
            overflow="auto"
            //overflow="scrollY"
          >
            {props.children}
          </Box>

          {/* <Sticky bottom={0}>
          <Box
            display="block"
            smDisplay="block"
            mdDisplay="none"
            lgDisplay="none"
          >
            {navigationMenu}
          </Box>
        </Sticky> */}
        </Box>
      </Box>
      <Dialogs />
    </>
  );
};

export default observer(PageLayout);
