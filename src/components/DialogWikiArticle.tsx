import { Box, Link, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import { ROOT_URL_WIKIPEDIA } from "../config/configURLs";
import { TUiStringStorage } from "../config/globals";
import { closeAllDialogs, isMobile } from "../libs/helpersBase";
import { IStores } from "../stores/RootStore";
import DialogPanel from "./DialogPanel";
import MenuBarItem from "./MenuBarItem";
import { buttons_MenuBarItem } from "./_buttons_definition";

// const MenuBarArticle_Logged_D = dynamic(() => import("./MenuBarItem_Logged"));

interface IArticleProps {
  stores: IStores;
}

const DialogWikiArticle: React.FunctionComponent<IArticleProps> = (props) => {
  const router = useRouter();

  const root = props.stores.baseStore.GUI_CONFIG;
  const source_wikipedia = root.language.source_wikipedia;
  const text_size = root.display.size_text_generic as any;

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
        <Text size={text_size} weight="bold">
          {source_wikipedia}
        </Text>
      </Link>
    </Box>
  );

  const menuBar = (
    <MenuBarItem
      stores={props.stores}
      titleComponent={source}
      buttons={buttons_MenuBarItem(props.stores, router)}
    />
  );

  const content_mobile = (
    <DialogPanel
      stores={props.stores}
      // heading={item_title}
      heading={menuBar}
      // subHeading={menuBar}
      onDismiss={() => {
        closeAllDialogs(props.stores);
      }}
    >
      <Box height={"70vh"}>{article}</Box>
    </DialogPanel>
  );

  const content_desktop = (
    <DialogPanel
      stores={props.stores}
      heading={item_title}
      subHeading={menuBar}
      onDismiss={() => {
        closeAllDialogs(props.stores);
      }}
    >
      {article}
    </DialogPanel>
  );

  return <>{isMobile(props.stores) ? content_mobile : content_desktop}</>;
};

export default observer(DialogWikiArticle);
