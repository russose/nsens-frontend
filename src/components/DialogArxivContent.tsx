import { Box, Button, Link, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React from "react";
import {
  IAtom,
  TLogAction,
  configGeneral,
  configPaths,
} from "../config/globals";
import { closeAllDialogs, goNewPage, submitLog } from "../libs/helpersBase";
import { IStores } from "../stores/RootStore";
import CardAtomGridDynamic from "./CardAtomGridDynamic";
import DialogPanel from "./DialogPanel";

// const MenuBarArticle_Logged_D = dynamic(() => import("./MenuBarItem_Logged"));

interface IArticleProps {
  stores: IStores;
}

const DialogArxivContent: React.FunctionComponent<IArticleProps> = (props) => {
  const router = useRouter();

  const desactivateGoNetwork =
    router.pathname.includes(configPaths.pages.ItemNetwork) &&
    router.query.id === props.stores.uiStore.selectedAtom.id;

  const root = props.stores.baseStore.GUI_CONFIG;
  const labels_root = root.language.arxiv_Details;

  const size_button = root.display.size_button_generic as any;

  const item: IAtom = props.stores.baseStore.getHistoryItem(
    props.stores.uiStore.selectedAtom.id
  );

  const text_size = root.display.size_text_generic as any;
  const size_text_header = root.display.size_text_header as any;

  const button_color = configGeneral.colors.button_color_default as any;

  const source_wikipedia = root.language.source_arxiv;

  const source = (
    <Box paddingY={0} paddingX={0}>
      <Link
        href={item.url}
        onClick={() => {
          // goNewPage(item.url);
          submitLog(
            props.stores,
            TLogAction.arxivMoreInfo,
            item.id + ":" + item.title,
            false
          );
        }}
        target="blank"
      >
        <Text size={size_text_header} weight="bold">
          {source_wikipedia}
        </Text>
      </Link>
    </Box>
  );

  const download_button = (
    <Box
      padding={1}
      display="flex"
      direction="column"
      alignItems="center"
      width={"100%"}
      color="elevationRaised"
    >
      <Box width={"50%"}>
        <Button
          accessibilityLabel={labels_root.download}
          text={labels_root.download}
          size={size_button}
          onClick={() => {
            goNewPage(item.attachment);
            submitLog(
              props.stores,
              TLogAction.arxivDownload,
              item.id + ":" + item.title,
              false
            );
          }}
          color={button_color}
          fullWidth
        />
      </Box>
    </Box>
  );

  const content = (
    <Box padding={0}>
      <CardAtomGridDynamic
        id={"Details Books"}
        stores={props.stores}
        atoms={[item]}
        desactivateGoNetwork={desactivateGoNetwork}
      />

      <Box padding={0}>
        <Text size={size_text_header} weight="bold">
          {labels_root.title}
        </Text>
        <Box padding={1}></Box>
        <Text size={text_size} weight="normal">
          {item.title}
        </Text>
      </Box>

      <Box padding={4}></Box>

      {download_button}

      <Box padding={4}></Box>

      {item.author !== undefined && item.author.length !== 0 ? (
        <Box padding={0}>
          <Text size={size_text_header} weight="bold">
            {labels_root.Author}
          </Text>
          <Box padding={1}></Box>
          <Text size={text_size} weight="normal">
            {item.author}
          </Text>
        </Box>
      ) : (
        <></>
      )}

      <Box padding={4}></Box>

      {item.summary !== undefined && item.summary.length !== 0 ? (
        <Box padding={0}>
          <Text size={size_text_header} weight="bold">
            {labels_root.summary}
          </Text>
          <Box padding={1}></Box>
          <Text size={text_size} weight="normal">
            {item.summary}
          </Text>
        </Box>
      ) : (
        <></>
      )}

      <Box padding={4}></Box>

      {source}
    </Box>
  );

  return (
    <>
      {
        <DialogPanel
          stores={props.stores}
          heading={labels_root.header}
          // subHeading={source}
          onDismiss={() => {
            closeAllDialogs(props.stores);
          }}
        >
          {content}
        </DialogPanel>
      }
    </>
  );
};

export default observer(DialogArxivContent);
