import React from "react";
import { JsText } from "./js_components";
import { CONFIG_FETCHING, LANGUAGE, USER_GUI_CONFIG } from "../common/config";
import { fetchArticle } from "../libs/fetch";
import { UIStore } from "../stores/UIStore";
import { observer } from "mobx-react-lite";
import Separator from "./Separator";

interface IArticleProps {
  item_title: string;
  uiStore: UIStore;
}

const language = LANGUAGE;
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
  const base = /<base[^>]*>/gi;
  const base_url = "//" + language + ".wikipedia.org/";

  const article_clean = article
    .replaceAll(base, "") //remove base to not destroy navigation...
    .replaceAll('href="/', 'href="' + base_url) //add path to relative link of stylesheet
    .replaceAll(sections_ending_including_body, "</body>") //remove end of article
    .replaceAll(link_open_regex, "") //remove links
    .replaceAll(link_close_regex, "")
    .replaceAll('"//', '"https://');

  return article_clean;
}

const path = CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_REST;
// const path = CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA;
const Article: React.FunctionComponent<IArticleProps> = (props) => {
  if (props.item_title === undefined) {
    return <JsText>{"..."}</JsText>;
  }

  // const title = props.item_title;
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
    // <Box>
    <>
      <JsText>{article}</JsText>
      <Separator />
      <JsText>Source: Wikipedia</JsText>
    </>
    //  </Box>
  );
};

export default observer(Article);
