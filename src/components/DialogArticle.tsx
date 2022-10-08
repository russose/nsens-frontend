import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Link, Sheet, Text } from "gestalt";
import { ROOT_URL_WIKIPEDIA } from "../config/configURLs";
import { IStores } from "../stores/RootStore";
import { TUiBooleanStorage, TUiStringStorage } from "../config/globals";
import MenuBarItem from "./MenuBarItem";

// const MenuBarArticle_Logged_D = dynamic(() => import("./MenuBarItem_Logged"));

interface IArticleProps {
  stores: IStores;
}

const DialogArticle: React.FunctionComponent<IArticleProps> = (props) => {
  const source_wikipedia =
    props.stores.baseStore.GUI_CONFIG.language.source_wikipedia;

  const item_title = props.stores.uiStore.selectedAtom.title;

  const article = (
    <iframe
      srcDoc={props.stores.uiStore.getUiStringStorage(
        TUiStringStorage.articleContent
      )}
      sandbox="allow-scripts" //DANGEROUS BUT NECESSARY FOR SCRIPTS
      frameBorder={0}
      marginWidth={0}
      marginHeight={0}
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
    <Box paddingY={0} paddingX={1}>
      <Link
        href={
          ROOT_URL_WIKIPEDIA(props.stores.baseStore.paramsPage.lang) +
          item_title
        }
        target="blank"
      >
        <Text size="100" weight="bold">
          {source_wikipedia}
        </Text>
      </Link>
    </Box>
  );

  const menuBar = <MenuBarItem stores={props.stores} titleComponent={source} />;

  return (
    <>
      {
        // props.stores.uiStore.getUiBooleanStorage(
        //   TUiBooleanStorage.showArticle
        // ) &&
        <Sheet
          accessibilityDismissButtonLabel="Close wikipedia Panel"
          accessibilitySheetLabel="Wikipedia Article"
          heading={item_title}
          subHeading={menuBar}
          onDismiss={() => {
            props.stores.uiStore.setUiBooleanStorage(
              TUiBooleanStorage.showArticle,
              false
            );
          }}
          size="lg"
        >
          {article}
        </Sheet>
      }
    </>
  );
};

export default observer(DialogArticle);
