import { observer } from "mobx-react-lite";
import { useStores } from "../src/stores/_RootStoreHook";
import { useRouter } from "next/router";
import { Box } from "gestalt";
import EditKnowbooks from "../src/components/EditKnowbooks";
import { IItemDisplayMode } from "../src/stores/UIStore";
import Article from "../src/components/Article";

import ZoomableNetworkWithGroup from "../src/components/vizs/ZoomableNetworkWithGroup";

const ItemView: React.FunctionComponent = (props) => {
  const { uiStore } = useStores();

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
      <ZoomableNetworkWithGroup itemId={item_id} title={item_title} />
      <EditKnowbooks />
    </>
  );

  let page;
  if (uiStore.itemDisplayMode === IItemDisplayMode.Network) {
    page = network;
  } else {
    page = article;
  }

  return page;
};

export default observer(ItemView);
