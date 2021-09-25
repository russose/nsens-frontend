import { Box, Image, TapArea } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import SearchBar from "../SearchBar";
import MenuBarNavigation from "../MenuBarNavigation";
import PageLayoutHybrid from "./PageLayoutHybrid";
import { useRouter } from "next/router";
import {
  onSearchHomeKeyboard,
  onSearchHomeSubmit,
  onSearchHomeText,
  onTapLogo,
} from "../../handlers/handlers_Searchbar_Navigation";
// import DialogLoading from "../ContentLoading";
import { IStores } from "../../stores/RootStore";
import { TDisplay, configPaths } from "../../config/globals";
import dynamic from "next/dynamic";
import MenuBarDisplayNotLogged from "../MenuBarDisplayNotLogged";
import { isHome } from "../../libs/helpersBase";

const DialogsLoggedDynamic = dynamic(() => import("../DialogsLogged"));

const MenuBarDisplayLoggedDynamic = dynamic(
  () => import("../MenuBarDisplayLogged"),
  { ssr: true }
);

interface IAppLayoutProps {
  stores: IStores;
  display: TDisplay;
}

const AppLayoutMobile: React.FunctionComponent<IAppLayoutProps> = (props) => {
  const stores = props.stores;
  const router = useRouter();

  stores.baseStore.setGUICONFIGFromDisplay(props.display);

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const path_logo_image = configPaths.image_logo_W_small;

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

  // IMPORTANT: ce free space évite aussi que le menu du bas disparaisse (50vh pour avoir un contenu qui dépasse les 100vh)
  const free_space_buttom_mobile = !(
    router.pathname.includes(configPaths.pages.ItemArticle) ||
    router.pathname.includes(configPaths.pages.ItemNetwork) ||
    router.pathname.includes(configPaths.pages.StaticArticle) ||
    isHome(router)
  ) && <Box height="50vh" />;

  return (
    <>
      <PageLayoutHybrid stores={stores} top={top_mobile} bottom={menu_mobile}>
        {props.children}
        {free_space_buttom_mobile}
        {dialogs_Logged}
      </PageLayoutHybrid>
      {/* <DialogLoading stores={stores} /> */}
      {/* {dialogs_Logged} */}
    </>
  );
};

export default observer(AppLayoutMobile);
