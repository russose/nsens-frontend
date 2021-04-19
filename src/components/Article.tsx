import React from "react";
import { fetchArticle } from "../libs/fetch";
import { observer } from "mobx-react-lite";
import Separator from "./Separator";
import { Text } from "gestalt";
import { ROOT_URL_WIKIPEDIA_REST } from "../common/configURLs";
import { IStores } from "../stores/_RootStore";

interface IArticleProps {
  item_title: string;
  stores: IStores;
  height: number;
}

// const path = URLs.ROOT_URL_WIKIPEDIA_REST;

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  // const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  // const language = GUI_CONFIG.general.language;
  // const last_section_header = GUI_CONFIG.language.WIKI_LAST_SECTION_HEADER.replaceAll(
  //   " ",
  //   "\\s"
  // );
  // References

  function prepareArticle(article: string): string {
    const href_with_including_a_regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gi;
    const link_open_regex = /<\s*a[^>]*>/gi;
    const link_close_regex = /<\s*\/a[^>]*>/gi;

    // const sections_ending_including_body = new RegExp(
    //   "<section(.)*" + last_section_header + "(.|\n)*</body>",
    //   "gi"
    // );

    // const base_url = "//" + language + ".wikipedia.org/";

    const article_clean = article
      .replace(href_with_including_a_regex, "<a") //Remove complex href, cf article "tenseur de Ricci"
      .replace(link_open_regex, "") //remove links
      .replace(link_close_regex, "");
    // .replaceAll('"//', '"https://');
    // .replaceAll(base, "") //remove base to not destroy navigation...
    // .replaceAll('href="/', 'href="' + base_url) //add path to relative link of stylesheet
    // .replaceAll(sections_ending_including_body, "</body>") //remove end of article

    return article_clean;
  }

  if (props.item_title === undefined) {
    return <Text>{"..."}</Text>;
  }

  props.stores.uiStore.setShowLoading(true);

  fetchArticle(
    props.item_title,
    ROOT_URL_WIKIPEDIA_REST(props.stores.userStore.paramsPage.lang)
  )
    .then((value) => {
      props.stores.uiStore.setArticleContent(prepareArticle(value));
      props.stores.uiStore.setShowLoading(false);
    })
    .catch((error) => {
      props.stores.uiStore.setShowLoading(false);
      // console.log("error in fetching article");
    });

  const article = (
    <iframe
      srcDoc={props.stores.uiStore.articleContent}
      sandbox="allow-scripts" //DANGEROUS BUT NECESSARY FOR SCRIPTS
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
      {article}
      <Separator with_line={false} />
      <Text>Source: Wikipedia</Text>
    </>
  );
};

export default observer(Article);
