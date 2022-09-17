import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Link, Sheet, Text } from "gestalt";
import { ROOT_URL_WIKIPEDIA } from "../config/configURLs";
import { IStores } from "../stores/RootStore";
import { TUiBooleanStorage, TUiStringStorage } from "../config/globals";
import dynamic from "next/dynamic";
import MenuBarArticle_NotLogged from "./MenuBarArticle_NotLogged";

const MenuBarArticle_Logged_D = dynamic(
  () => import("./MenuBarArticle_Logged")
);

interface IArticleProps {
  stores: IStores;
}

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const source_wikipedia =
    props.stores.baseStore.GUI_CONFIG.language.source_wikipedia;

  const item_title = props.stores.uiStore.selectedAtom.title;
  const rounding = props.stores.baseStore.GUI_CONFIG.display.rounding_menu;

  const isLogged = props.stores.baseStore.isLogged;

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

  const subHeading = (
    <Box width="100%" paddingX={1}>
      <Box
        display="flex"
        direction="row"
        justifyContent="between"
        alignItems="center"
      >
        {source}
        {/* <Box column={6}> */}
        <Box column={11} smColumn={8} mdColumn={5} lgColumn={5}>
          {/* <MenuBarArticle stores={props.stores} rounding={rounding} /> */}
          {!isLogged ? (
            <MenuBarArticle_NotLogged
              stores={props.stores}
              rounding={rounding}
              specific_buttons={[]}
            />
          ) : (
            <MenuBarArticle_Logged_D
              stores={props.stores}
              rounding={rounding}
            />
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {
        // props.stores.uiStore.getUiBooleanStorage(
        //   TUiBooleanStorage.showArticle
        // ) &&
        <Sheet
          accessibilityDismissButtonLabel="Close wikipedia sheet"
          accessibilitySheetLabel="Wikipedia Article"
          heading={item_title}
          subHeading={subHeading}
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

export default observer(Article);
