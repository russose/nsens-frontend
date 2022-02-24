import React from "react";
import { observer } from "mobx-react-lite";
// import Separator from "./Separator";
import { Box, Link, Sheet, Text } from "gestalt";
import { ROOT_URL_WIKIPEDIA } from "../config/configURLs";
import { IStores } from "../stores/RootStore";
import { TUiBooleanStorage, TUiStringStorage } from "../config/globals";

interface IArticleProps {
  stores: IStores;
}

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const source_wikipedia =
    props.stores.baseStore.GUI_CONFIG.language.source_wikipedia;

  const item_title = props.stores.uiStore.selectedAtom.title;

  const article = (
    <iframe
      // srcDoc={props.stores.uiStore.articleContent}
      srcDoc={props.stores.uiStore.getUiStringStorage(
        TUiStringStorage.articleContent
      )}
      sandbox="allow-scripts" //DANGEROUS BUT NECESSARY FOR SCRIPTS
      frameBorder={0}
      marginWidth={0}
      marginHeight={0}
      // height={props.height - 0}
      height="98%"
      width="100%"
    />
    //   <div
    //   dangerouslySetInnerHTML={{
    //     __html: props.uiStore.articleContent,
    //   }}
    // />
  );

  const source = (
    <Box paddingY={0} paddingX={2}>
      <Link
        href={
          ROOT_URL_WIKIPEDIA(props.stores.baseStore.paramsPage.lang) +
          item_title
        }
        target="blank"
      >
        <Text size="sm" weight="bold">
          {source_wikipedia}
        </Text>
      </Link>
    </Box>
  );

  return (
    <>
      {props.stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.showArticle
      ) && (
        <Sheet
          accessibilityDismissButtonLabel="Close wikipedia sheet"
          accessibilitySheetLabel="Wikipedia Article"
          heading={item_title}
          onDismiss={() => {
            props.stores.uiStore.setUiBooleanStorage(
              TUiBooleanStorage.showArticle,
              false
            );
          }}
          footer={source}
          size="lg"
        >
          {article}
        </Sheet>
      )}
    </>
  );
};

export default observer(Article);
