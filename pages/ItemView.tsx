import { observer } from "mobx-react-lite";
import { useStores } from "../src/stores/_RootStore";
import { useRouter } from "next/router";
import { Box } from "gestalt";
import { JsText } from "../src/components/js_components";
import { CONFIG_FETCHING } from "../src/common/config";
import { fetchArticle } from "../src/common/fetchAtom";
import Network from "../src/components/vizs/Network";
import { ParentSize } from "@visx/responsive";
import EditKnowbooks from "../src/components/EditKnowbooks";
import { IItemDisplayMode } from "../src/stores/UIStore";

const ItemView: React.FunctionComponent = (props) => {
  const { dataStore, uiStore } = useStores();

  const router = useRouter();
  const item_title = router.query.title as string;
  const item_id = router.query.id as string;

  fetchArticle(item_title, CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA).then(
    (value) => {
      uiStore.setArticleContent(value);
    }
  );
  const article = (
    <div
      dangerouslySetInnerHTML={{
        __html: uiStore.articleContent,
      }}
    />
    // </div>
  );

  const network = (
    <ParentSize>
      {(parent) => (
        <Box>
          <Network
            width={parent.width - 5}
            height={parent.height - 5}
            itemId={item_id}
            title={item_title}
          />
          <EditKnowbooks />
        </Box>
      )}
    </ParentSize>
  );

  let page;
  if (uiStore.itemDisplayMode === IItemDisplayMode.Network) {
    page = network;
  } else {
    page = (
      <Box>
        <JsText>{article}</JsText>
      </Box>
    );
  }

  return page;
};

export default observer(ItemView);
