import { Box, Image, TapArea, Sticky } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import SearchBar from "../SearchBar";
import MenuBarNavigation from "../MenuBarNavigation";
import PageLayoutHybrid from "./PageLayoutHybrid";
import { isMobile } from "../../libs/utils";
import { useRouter } from "next/router";
import {
  onSearchHomeKeyboard,
  onSearchHomeSubmit,
  onSearchHomeText,
  onTapLogo,
} from "../../handlers/handlers_Searchbar_Navigation";
import DialogLoading from "../DialogLoading";
import { IStores } from "../../stores/RootStore";
import { configPaths } from "../../config/globals";
import dynamic from "next/dynamic";
import MenuBarDisplayNotLogged from "../MenuBarDisplayNotLogged";

const DialogsLoggedDynamic = dynamic(() => import("../DialogsLogged"));

const MenuBarDisplayLoggedDynamic = dynamic(
  () => import("../../../src/components/MenuBarDisplayLogged"),
  { ssr: true }
);

interface IAppLayoutProps {
  stores: IStores;
}

const AppLayout: React.FunctionComponent<IAppLayoutProps> = (props) => {
  const stores = props.stores;
  const router = useRouter();

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const path_logo_image = configPaths.image_logo_W_small;
  const rounding = stores.baseStore.GUI_CONFIG.display.rounding_menu;

  const searchbar = (
    <SearchBar
      placeholder={GUI_CONFIG.language.searchBar}
      handlerText={onSearchHomeText(stores)}
      handlerSubmit={onSearchHomeSubmit(stores)}
      handlerKeyboard={onSearchHomeKeyboard(stores)}
      value={stores.uiStore.searchPattern}
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

  let displayMenu;
  let dialogs_Logged;
  if (!stores.baseStore.isLogged) {
    displayMenu = <MenuBarDisplayNotLogged stores={stores} />;
    dialogs_Logged = <></>;
  } else {
    displayMenu = <MenuBarDisplayLoggedDynamic stores={stores} />;
    dialogs_Logged = <DialogsLoggedDynamic stores={stores} />;
  }

  const menu_mobile = (
    <Box
      display="flex"
      flex="grow"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box paddingY={1}>{displayMenu}</Box>
      <Box width="100%">
        <MenuBarNavigation stores={stores} rounding={0} />
      </Box>
    </Box>
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
      mdColumn={3}
      lgColumn={2}
    >
      <MenuBarNavigation stores={stores} rounding={rounding} />
    </Box>
  );

  const display_desktop = !isMobile(GUI_CONFIG.id) && (
    <Box display="flex" width="100%" justifyContent="center">
      <Box paddingY={1} column={4} smColumn={4} mdColumn={3} lgColumn={2}>
        {displayMenu}
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

  let top;
  let bottom = <></>;
  let free_space_buttom;
  if (isMobile(GUI_CONFIG.id)) {
    top = top_mobile;
    bottom = menu_mobile;
    if (!router.pathname.includes(configPaths.pages.ItemArticle)) {
      free_space_buttom = <Box height="50vh" />;
    }
  } else {
    top = top_desktop;
    free_space_buttom = <> </>;
  }

  return (
    <>
      <PageLayoutHybrid stores={stores} top={top} bottom={bottom}>
        {display_desktop}
        {props.children}
        {free_space_buttom}
      </PageLayoutHybrid>
      <DialogLoading stores={stores} />
      {dialogs_Logged}
    </>
  );
};

export default observer(AppLayout);
