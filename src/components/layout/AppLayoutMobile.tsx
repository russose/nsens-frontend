import { Box, TapArea, Image } from "gestalt";
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
} from "../../handlers/handlers_Searchbar";
import { configPaths, TUiStringStorage } from "../../config/globals";
import { useStores } from "../../stores/RootStoreHook";
import { onTapLogo } from "../../handlers/handlers_Navigation";

interface IProps {
  children?: React.ReactNode;
}

const AppLayoutMobile: React.FunctionComponent<IProps> = (props) => {
  const stores = useStores();
  const router = useRouter();

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const path_logo_image = configPaths.image_logo_W_small;

  const svgBody = router.pathname.includes(configPaths.pages.ItemCircle);

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
        // loading="eager"
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
      <Box
        paddingX={1}
        display="flex"
        flex="grow"
        alignItems="center"
        justifyContent="end"
      >
        {searchbar}
      </Box>
    </>
  );

  // IMPORTANT: ce free space évite aussi que le menu du bas disparaisse
  // (50vh pour avoir un contenu qui dépasse les 100vh)
  const free_space_buttom_mobile = !(
    router.pathname.includes(configPaths.pages.ItemCircle) ||
    router.pathname.includes(configPaths.pages.Search)
  ) && <Box height="30vh" />;

  return (
    <>
      <AppLayoutPageHybrid
        stores={stores}
        top={top_mobile}
        bottom={menu_mobile}
        svgBody={svgBody}
      >
        {props.children}
        {free_space_buttom_mobile}
      </AppLayoutPageHybrid>
    </>
  );
};

export default observer(AppLayoutMobile);
