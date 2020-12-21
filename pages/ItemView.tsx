import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import Article from "../src/components/Article";
import NetworkZoomable from "../src/components/vizs/NetworkZoomable";
import { IItemDisplayMode } from "../src/stores/UIStore";
import { useStores } from "../src/stores/_RootStoreHook";

const ItemView: React.FunctionComponent = (props) => {
  const { uiStore, graphStore } = useStores();

  const router = useRouter();
  const item_title = router.query.title as string;
  const item_id = router.query.id as string;

  const article = (
    <Box padding={2}>
      <Article item_title={item_title} uiStore={uiStore} />
    </Box>
  );

  const network = (
    <>
      <NetworkZoomable
        itemId={item_id}
        title={item_title}
        graphStore={graphStore}
      />
    </>
  );

  let page;
  if (uiStore.itemDisplayMode === IItemDisplayMode.Network) {
    // if (true) {
    page = network;
  } else {
    page = article;
  }

  return page;
};

export default observer(ItemView);
