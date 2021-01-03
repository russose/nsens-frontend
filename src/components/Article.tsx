import React from "react";
import { CONFIG_FETCHING, LANGUAGE, GUI_CONFIG } from "../common/config";
import { fetchArticle } from "../libs/fetch";
import { UIStore } from "../stores/UIStore";
import { observer } from "mobx-react-lite";
import Separator from "./Separator";
import { Text } from "gestalt";
import { useStores } from "../stores/_RootStoreHook";

interface IArticleProps {
  item_title: string;
  uiStore: UIStore;
}

const language = LANGUAGE;
const last_section_header = GUI_CONFIG.language.WIKI_LAST_SECTION_HEADER.replaceAll(
  " ",
  "\\s"
);
// References

function prepareArticle(article: string): string {
  const link_open_regex = /<\s*a[^>]*>/gi;
  const link_close_regex = /<\s*\/a[^>]*>/gi;
  const sections_ending_including_body = new RegExp(
    "<section(.)*" + last_section_header + "(.|\n)*</body>",
    "gi"
  );
  // const base = /<base[^>]*>/gi;
  const base_url = "//" + language + ".wikipedia.org/";
  const test_regex = /<title(.|\n)*?title>/gi;

  const article_clean = article
    // .replaceAll(base, "") //remove base to not destroy navigation...
    .replaceAll('href="/', 'href="' + base_url) //add path to relative link of stylesheet
    .replaceAll(sections_ending_including_body, "</body>") //remove end of article
    .replaceAll(link_open_regex, "") //remove links
    .replaceAll(link_close_regex, "")
    .replaceAll(test_regex, "")
    .replaceAll('"//', '"https://');

  return article_clean;
}

const path = CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_REST;

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const deltaScreenViewport = GUI_CONFIG.display.deltaScreenViewport;
  const stores = useStores();

  if (props.item_title === undefined) {
    return <Text>{"..."}</Text>;
  }

  // const title = props.item_title;
  const title = props.item_title.replaceAll(" ", "_");

  fetchArticle(title, path)
    .then((value) => {
      props.uiStore.setArticleContent(prepareArticle(value));
    })
    .catch((error) => {
      // console.log("error in fetching article");
    });

  const article = (
    <iframe
      srcDoc={props.uiStore.articleContent}
      sandbox=""
      frameBorder={0}
      marginWidth={0}
      marginHeight={0}
      height={stores.uiStore.screen.height - deltaScreenViewport}
      width="100%"
    />
    //   <div
    //   dangerouslySetInnerHTML={{
    //     __html: props.uiStore.articleContent,
    //   }}
    // />
  );

  return (
    // <Box>
    <>
      <Text>{article}</Text>
      <Separator with_line={true} />
      <Text>Source: Wikipedia</Text>
    </>
    //  </Box>
  );
};

export default observer(Article);
