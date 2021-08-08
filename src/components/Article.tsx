import React from "react";
import { observer } from "mobx-react";
// import Separator from "./Separator";
import { Box, Link, Text } from "gestalt";
import { ROOT_URL_WIKIPEDIA } from "../config/configURLs";
import { IStores } from "../stores/RootStore";

interface IArticleProps {
  item_title: string;
  stores: IStores;
}

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const height = props.stores.baseStore.GUI_CONFIG.display.heightArticle;
  const source_wikipedia =
    props.stores.baseStore.GUI_CONFIG.language.source_wikipedia;

  if (props.item_title === undefined) {
    return <Text>{"..."}</Text>;
  }

  const article = (
    <iframe
      srcDoc={props.stores.uiStore.articleContent}
      sandbox="allow-scripts" //DANGEROUS BUT NECESSARY FOR SCRIPTS
      frameBorder={0}
      marginWidth={0}
      marginHeight={0}
      // height={props.height - 0}
      height="100%"
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
      <Box paddingY={0} paddingX={2}>
        <Link
          href={
            ROOT_URL_WIKIPEDIA(props.stores.baseStore.paramsPage.lang) +
            props.item_title
          }
          target="blank"
        >
          <Text size="sm" weight="bold">
            {source_wikipedia}
          </Text>
        </Link>
      </Box>
      <Box padding={1} height={height}>
        {article}
      </Box>
    </>
  );
};

export default observer(Article);
