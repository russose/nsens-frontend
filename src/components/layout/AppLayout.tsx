import { Box, Image } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  onSearchHomeKeyboard,
  onSearchHomeSubmit,
  onSearchHomeText,
} from "../../handlers";
import SearchBar from "../SearchBar";
import MenuBarNavigation from "../MenuBarNavigation";
import PageLayoutHybrid from "./PageLayoutHybrid";
import Dialogs from "../Dialogs";
import { useStores } from "../../stores/_RootStoreHook";
import { isMobile } from "../../libs/utils";

const AppLayout: React.FunctionComponent = (props) => {
  const stores = useStores();

  const GUI_CONFIG = stores.userStore.GUI_CONFIG;
  const color_menu = GUI_CONFIG.general.colors.menu;
  const path_logo_image = GUI_CONFIG.paths.image_logo_W;

  const navigationMenu = (
    <MenuBarNavigation
      stores={stores}
      name="NavigationMenuBar"
      color={color_menu}
    />
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

  const top_mobile = (
    <>
      <Box height="100%" padding={1} column={2}>
        <Image
          alt="image"
          color="transparent"
          fit="contain"
          naturalHeight={1}
          naturalWidth={1}
          loading="lazy"
          src={path_logo_image}
        ></Image>
      </Box>

      <Box column={8}>
        <Box display="flex" flex="grow" alignItems="center">
          {searchbar}
        </Box>
      </Box>
    </>
  );

  const top_desktop = (
    <>
      <Box
        height="100%"
        padding={1}
        column={3}
        smColumn={3}
        mdColumn={2}
        lgColumn={1}
      >
        <Image
          alt="image"
          color="transparent"
          fit="contain"
          naturalHeight={1}
          naturalWidth={1}
          loading="auto"
          src={path_logo_image}
        ></Image>
      </Box>

      <Box
        display="flex"
        // justifyContent="end"
        alignItems="center"
        column={8}
        smColumn={8}
        mdColumn={6}
        lgColumn={4}
      >
        <Box column={6} smColumn={6} mdColumn={8} lgColumn={8}>
          <Box display="flex" flex="grow" alignItems="center">
            {searchbar}
          </Box>
        </Box>

        <Box column={6} smColumn={6} mdColumn={4} lgColumn={4}>
          {navigationMenu}
        </Box>
      </Box>
    </>
  );

  const bottom_mobile = navigationMenu;

  let top;
  let bottom;
  if (isMobile(GUI_CONFIG.id)) {
    top = top_mobile;
    bottom = bottom_mobile;
    bottom = navigationMenu;
  } else {
    top = top_desktop;
  }

  return (
    <>
      <PageLayoutHybrid stores={stores} top={top} bottom={bottom}>
        {props.children}
      </PageLayoutHybrid>
      <Dialogs />
    </>
  );
};

export default observer(AppLayout);
