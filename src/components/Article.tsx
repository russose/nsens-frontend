import React from "react";
import { CONFIG_FETCHING } from "../common/config";
import { fetchArticle } from "../libs/fetch";
import { observer } from "mobx-react-lite";
import Separator from "./Separator";
import { Box, Text } from "gestalt";
import { IStores } from "../stores/_RootStore";

interface IArticleProps {
  item_title: string;
  stores: IStores;
  height: number;
}

const path = CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_REST;

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const language = GUI_CONFIG.general.language;
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

  if (props.item_title === undefined) {
    return <Text>{"..."}</Text>;
  }

  // const title = props.item_title;
  const title = props.item_title.replaceAll(" ", "_");

  fetchArticle(title, path)
    .then((value) => {
      props.stores.uiStore.setArticleContent(prepareArticle(value));
    })
    .catch((error) => {
      // console.log("error in fetching article");
    });

  const article = (
    <iframe
      srcDoc={props.stores.uiStore.articleContent}
      sandbox=""
      frameBorder={0}
      marginWidth={0}
      marginHeight={0}
      height={props.height - 0}
      width="100%"
    />
    //   <div
    //   dangerouslySetInnerHTML={{
    //     __html: props.uiStore.articleContent,
    //   }}
    // />
  );

  return (
    <>
      {/* <Text>{article}</Text> */}
      {article}
      <Separator with_line={false} />
      <Text>Source: Wikipedia</Text>
    </>
  );
};

export default observer(Article);
