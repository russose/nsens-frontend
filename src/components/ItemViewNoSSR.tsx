import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import { GUI_CONFIG_T } from "../common/types";
import { isMobile } from "../libs/utils";
import { IItemDisplayMode } from "../stores/UIStore";
import { IStores } from "../stores/_RootStore";
import Article from "./Article";
import HeaderTitle from "./HeaderTitle";
import AppLayout from "./layout/AppLayout";
import MenuBarDisplay from "./MenuBarDisplay";
import NetworkZoomable from "./vizs/NetworkZoomable";

interface IItemViewNoSSRProps {
  stores: IStores;
  GUI_CONFIG: GUI_CONFIG_T;
}

const ItemViewNoSSR: React.FunctionComponent<IItemViewNoSSRProps> = (props) => {
  const stores = props.stores;
  const router = useRouter();

  const item_title = router.query.title as string;
  const item_id = router.query.id as string;

  const GUI_CONFIG = props.GUI_CONFIG;
  const heightTopAndBottom = GUI_CONFIG.display.heightTopAndBottom;
  const height = stores.userStore.screen.height - 1.0 * heightTopAndBottom;
  const width = stores.userStore.screen.width;
  const color_menu = GUI_CONFIG.general.colors.menu;

  stores.uiStore.setSelectedAtomId(item_id);

  const displayMenu = (
    <MenuBarDisplay stores={stores} name="MenuBarDisplay" color={color_menu} />
  );
  let displayMenuWithLayout;
  if (isMobile(GUI_CONFIG.id)) {
    displayMenuWithLayout = <Box column={12}>{displayMenu}</Box>;
  } else {
    displayMenuWithLayout = (
      <Box display="flex" direction="column" flex="grow" alignItems="end">
        <Box padding={2} column={4} smColumn={3} mdColumn={3} lgColumn={2}>
          {displayMenu}
        </Box>
      </Box>
    );
  }

  const article = (
    <Box padding={1}>
      <Article item_title={item_title} stores={stores} height={height} />
    </Box>
  );

  const network = (
    <>
      <NetworkZoomable
        itemId={item_id}
        stores={stores}
        title={item_title}
        height={height}
        width={width}
      />
    </>
  );

  let page;
  if (stores.uiStore.itemDisplayMode === IItemDisplayMode.Network) {
    page = (
      <>
        {displayMenuWithLayout}
        <HeaderTitle stores={stores} title={item_title} /> {network}
      </>
    );
  } else {
    page = (
      <>
        {displayMenuWithLayout}
        {/* <HeaderTitle stores={stores} title={item_title} />  */}
        {article}
      </>
    );
  }

  return <AppLayout>{page}</AppLayout>;
};

export default observer(ItemViewNoSSR);
