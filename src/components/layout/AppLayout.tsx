import { Box, Image, TapArea } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  onSearchHomeKeyboard,
  onSearchHomeSubmit,
  onSearchHomeText,
  onTapLogo,
} from "../../handlers";
import SearchBar from "../SearchBar";
import MenuBarNavigation from "../MenuBarNavigation";
import PageLayoutHybrid from "./PageLayoutHybrid";
import Dialogs from "../Dialogs";
import { useStores } from "../../stores/_RootStoreHook";
import { isMobile } from "../../libs/utils";
import { useRouter } from "next/router";

const AppLayout: React.FunctionComponent = (props) => {
  const stores = useStores();

  const router = useRouter();

  const GUI_CONFIG = stores.userStore.GUI_CONFIG;
  const path_logo_image = GUI_CONFIG.paths.image_logo_W;

  const navigationMenu = <MenuBarNavigation stores={stores} />;

  const searchbar = (
    <SearchBar
      placeholder={GUI_CONFIG.language.searchBar}
      handlerText={onSearchHomeText(stores.uiStore)}
      handlerSubmit={onSearchHomeSubmit(stores)}
      handlerKeyboard={onSearchHomeKeyboard(stores)}
      value={stores.uiStore.searchPattern}
    />
  );

  const logo_with_tap = (
    <TapArea fullHeight={true} onTap={onTapLogo(stores, GUI_CONFIG)}>
      <Image
        alt="image"
        color="transparent"
        fit="contain"
        naturalHeight={1}
        naturalWidth={1}
        loading="lazy"
        src={path_logo_image}
      ></Image>
    </TapArea>
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
    <>
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

      <Box display="flex" column={9} smColumn={9} mdColumn={7} lgColumn={5}>
        <Box column={6} smColumn={6} mdColumn={8} lgColumn={8}>
          <Box
            display="flex"
            flex="grow"
            alignItems="center"
            justifyContent="start"
          >
            {searchbar}
          </Box>
        </Box>
        <Box padding={3} />
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
  let free_space_buttom;
  if (
    isMobile(GUI_CONFIG.id) &&
    !router.pathname.includes(GUI_CONFIG.paths.pages.ItemArticle)
  ) {
    free_space_buttom = <Box height="30vh" />;
  } else {
    free_space_buttom = <> </>;
  }

  return (
    <>
      <PageLayoutHybrid stores={stores} top={top} bottom={bottom}>
        {props.children}
        {free_space_buttom}
      </PageLayoutHybrid>
      <Dialogs />
    </>
  );
};

export default observer(AppLayout);
