import React from "react";
import { JsText } from "./js_components";
import { CONFIG_FETCHING, USER_GUI_CONFIG } from "../common/config";
import { fetchArticle } from "../common/fetch";
import { UIStore } from "../stores/UIStore";
import { observer } from "mobx-react-lite";
import { Box, Divider } from "gestalt";

interface IArticleProps {
  item_title: string;
  uiStore: UIStore;
}

const last_section_header = USER_GUI_CONFIG.WIKI_LAST_SECTION_HEADER.replaceAll(
  " ",
  "\\s"
);
// References

function prepareArticle(article: string): string {
  const link_open_regex = /<\s*a[^>]*>/gi;
  const link_close_regex = /<\s*\/a[^>]*>/gi;
  // const sections_ending_including_body = /<section(.)*Notes\set\sréférences(.|\n)*<\/body>/gi;
  const sections_ending_including_body = new RegExp(
    "<section(.)*" + last_section_header + "(.|\n)*</body>",
    "gi"
  );

  const article_clean = article
    .replaceAll(link_open_regex, "")
    .replaceAll(link_close_regex, "")
    .replaceAll(sections_ending_including_body, "</body>")
    .replaceAll("//", "https://");

  return article_clean;
}

const path = CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_REST;

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  if (props.item_title === undefined) {
    return <JsText>{"..."}</JsText>;
  }

  const title = props.item_title.replaceAll(" ", "_");
  fetchArticle(title, path)
    .then((value) => {
      props.uiStore.setArticleContent(prepareArticle(value));
    })
    .catch((error) => {
      console.log("error in fetching article");
    });

  const article = (
    <div
      dangerouslySetInnerHTML={{
        __html: props.uiStore.articleContent,
      }}
    />
  );

  return (
    <Box>
      <JsText>{article}</JsText>
      <Box padding={1}></Box>
      <Divider />
      <JsText>Source: Wikipedia</JsText>
    </Box>
  );
};

export default observer(Article);
