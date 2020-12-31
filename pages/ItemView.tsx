import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import Article from "../src/components/Article";
import AppLayout from "../src/components/layout/AppLayout";
import NetworkZoomable from "../src/components/vizs/NetworkZoomable";
import { IItemDisplayMode } from "../src/stores/UIStore";
import { useStores } from "../src/stores/_RootStoreHook";

const ItemView: React.FunctionComponent = (props) => {
  const stores = useStores();

  const router = useRouter();
  const item_title = router.query.title as string;
  const item_id = router.query.id as string;

  stores.uiStore.setSelectedAtomId(item_id);

  const article = (
    <Box padding={2}>
      <Article item_title={item_title} uiStore={stores.uiStore} />
    </Box>
  );

  const network = (
    <>
      <NetworkZoomable
        itemId={item_id}
        title={item_title}
        graphStore={stores.graphStore}
      />
    </>
  );

  let page;
  if (stores.uiStore.itemDisplayMode === IItemDisplayMode.Network) {
    page = network;
  } else {
    page = article;
  }

  return <AppLayout> {page}</AppLayout>;
};

export default observer(ItemView);
