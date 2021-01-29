import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import { GUI_CONFIG_T } from "../common/types";
import { IItemDisplayMode } from "../stores/UIStore";
import { IStores } from "../stores/_RootStore";
import Article from "./Article";
import AppLayout from "./layout/AppLayout";
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

  const heightTopAndBottom = props.GUI_CONFIG.display.heightTopAndBottom;
  const height = stores.userStore.screen.height - 1.0 * heightTopAndBottom;
  const width = stores.userStore.screen.width;

  stores.uiStore.setSelectedAtomId(item_id);

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
    page = network;
  } else {
    page = article;
  }

  return <AppLayout>{page}</AppLayout>;
};

export default observer(ItemViewNoSSR);
