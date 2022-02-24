import { Box, Image, TapArea } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import SearchBar from "../SearchBar";
import MenuBarNavigation from "../MenuBarNavigation";
import AppLayoutPageHybrid from "./AppLayoutPageHybrid";
import {
  onSearchHomeKeyboard,
  onSearchHomeSubmit,
  onSearchHomeText,
  onTapLogo,
} from "../../handlers/handlers_Searchbar_Navigation";
import { configPaths, TUiStringStorage } from "../../config/globals";
import { IAppLayoutProps } from "./AppLayoutMobile";

const AppLayoutDesktop: React.FunctionComponent<IAppLayoutProps> = (props) => {
  const stores = props.stores;

  stores.baseStore.setGUICONFIGFromDisplay(props.display);
  stores.uiStore.setSVGGlobalDimensions();

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const path_logo_image = configPaths.image_logo_W_small;
  const rounding = stores.baseStore.GUI_CONFIG.display.rounding_menu;

  const searchbar = (
    <SearchBar
      placeholder={GUI_CONFIG.language.searchBar}
      handlerText={onSearchHomeText(stores)}
      handlerSubmit={onSearchHomeSubmit(stores)}
      handlerKeyboard={onSearchHomeKeyboard(stores)}
      value={stores.uiStore.getUiStringStorage(TUiStringStorage.searchPattern)}
    />
  );

  const logo_with_tap = (
    <TapArea fullHeight={true} onTap={onTapLogo(stores)}>
      <Image
        alt="logo"
        color="transparent"
        fit="contain"
        naturalHeight={1}
        naturalWidth={1}
        loading="lazy"
        src={path_logo_image}
      ></Image>
    </TapArea>
  );

  const navigation_desktop = (
    <Box
      height="100%"
      padding={0}
      display="flex"
      direction="column"
      justifyContent="center"
      column={5}
      smColumn={4}
      mdColumn={4}
      lgColumn={3}
    >
      <MenuBarNavigation stores={stores} rounding={rounding} />
    </Box>
  );

  const top_desktop = (
    <Box
      height="100%"
      display="flex"
      flex="grow"
      direction="row"
      alignItems="center"
      justifyContent="between"
    >
      <Box
        height="100%"
        padding={2}
        column={2}
        smColumn={2}
        mdColumn={2}
        lgColumn={1}
      >
        {logo_with_tap}
      </Box>

      <Box>{searchbar}</Box>

      {navigation_desktop}
    </Box>
  );

  return (
    <>
      <AppLayoutPageHybrid
        stores={stores}
        titleSEO={props.titleSEO}
        top={top_desktop}
        bottom={<></>}
        svgBody={props.svgBody}
      >
        {props.children}
      </AppLayoutPageHybrid>
    </>
  );
};

export default observer(AppLayoutDesktop);
