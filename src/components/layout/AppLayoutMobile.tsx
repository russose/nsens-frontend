import { Box, Image, TapArea } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import SearchBar from "../SearchBar";
import MenuBarNavigation from "../MenuBarNavigation";
import AppLayoutPageHybrid from "./AppLayoutPageHybrid";
import { useRouter } from "next/router";
import {
  onSearchHomeKeyboard,
  onSearchHomeSubmit,
  onSearchHomeText,
  onTapLogo,
} from "../../handlers/handlers_Searchbar_Navigation";
import { IStores } from "../../stores/RootStore";
import { TDisplay, configPaths, TUiStringStorage } from "../../config/globals";

import { isHome } from "../../libs/helpersBase";

export interface IAppLayoutProps {
  stores: IStores;
  titleSEO: string;
  display: TDisplay;
  svgBody: boolean;
}

const AppLayoutMobile: React.FunctionComponent<IAppLayoutProps> = (props) => {
  const stores = props.stores;
  const router = useRouter();

  stores.baseStore.setGUICONFIGFromDisplay(props.display);
  stores.uiStore.setSVGGlobalDimensions();

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const path_logo_image = configPaths.image_logo_W_small;

  const searchbar = (
    <SearchBar
      placeholder={GUI_CONFIG.language.searchBar}
      handlerText={onSearchHomeText(stores)}
      handlerSubmit={onSearchHomeSubmit(stores)}
      handlerKeyboard={onSearchHomeKeyboard(stores)}
      // value={stores.uiStore.searchPattern}
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

  const menu_mobile = (
    <Box
      display="flex"
      flex="grow"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {/* <Box paddingY={1}>{displayMenu}</Box> */}
      <Box width="100%">
        <MenuBarNavigation stores={stores} rounding={0} />
      </Box>
    </Box>
  );

  const top_mobile = (
    <>
      <Box height="100%" padding={1} column={3}>
        {logo_with_tap}
      </Box>
      <Box padding={2} />
      <Box display="flex" flex="grow" alignItems="center" justifyContent="end">
        {searchbar}
      </Box>
    </>
  );

  // IMPORTANT: ce free space évite aussi que le menu du bas disparaisse
  // (50vh pour avoir un contenu qui dépasse les 100vh)

  const free_space_buttom_mobile =
    // router.pathname.includes(configPaths.pages.ItemArticle) ||
    (router.pathname.includes(configPaths.pages.ItemNetwork) ||
      router.pathname.includes(configPaths.pages.User) ||
      router.pathname.includes(configPaths.pages.Search) ||
      router.pathname.includes(configPaths.pages.About)) && (
      <Box height="30vh" />
    );

  return (
    <>
      <AppLayoutPageHybrid
        stores={stores}
        titleSEO={props.titleSEO}
        top={top_mobile}
        bottom={menu_mobile}
        svgBody={props.svgBody}
      >
        {props.children}
        {free_space_buttom_mobile}
      </AppLayoutPageHybrid>
    </>
  );
};

export default observer(AppLayoutMobile);
