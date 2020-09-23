import { observer } from "mobx-react";
import { useStores } from "../src/stores/_RootStore";
import { useRouter } from "next/router";
import { Box } from "gestalt";
import { JsText } from "../src/components/js_components";
import { CONFIG_FETCHING } from "../src/common/config";
import { fetchArticle } from "../src/common/fetchAtom";

const Article: React.FunctionComponent = (props) => {
  const { uiStore } = useStores();

  const router = useRouter();
  let article_title = router.query.k as string;

  fetchArticle(article_title, CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA).then(
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
  return (
    <Box>
      <JsText>{article}</JsText>
    </Box>
  );
};

export default observer(Article);
