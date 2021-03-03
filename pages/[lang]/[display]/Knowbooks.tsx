import { Box, Divider } from "gestalt";
import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { paths } from "../../../src/common/configPaths";
import { ICardKnowProps } from "../../../src/components/CardKnow";
import CardKnowGrid from "../../../src/components/CardKnowGrid";
import CardKnowGridSpecial from "../../../src/components/CardKnowGridSpecial";
import HeaderTitle from "../../../src/components/HeaderTitle";
import AppLayout from "../../../src/components/layout/AppLayout";
import { onDeleteKnowbook, onOpenRenameKnowbook } from "../../../src/handlers";
import { displayCompactedGridCondition } from "../../../src/libs/utils";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/utilsConfigGui";
import { useStores } from "../../../src/stores/_RootStoreHook";

const Knowbooks: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG);

  const knowbook_all_title = GUI_CONFIG.language.knowbooks.AllSaved_title;
  const knowbook_none_title = GUI_CONFIG.language.knowbooks.None_Title;
  const knowbook_all_image = GUI_CONFIG.paths.knowbook_all_image;
  const knowbook_none_image = GUI_CONFIG.paths.knowbook_none_image;
  const pathKnowbookSaved = paths.pages.KnowbookSaved;
  const pathKnowbookNone = paths.pages.KnowbookNone;
  const title = GUI_CONFIG.language.knowbooks.knowbooks_title;

  const cardKnowPropsSavedNone: ICardKnowProps[] = [
    {
      id: pathKnowbookSaved,
      stores: stores,
      title: knowbook_all_title,
      image_url: knowbook_all_image,
      // pathname: pathKnowbookSaved,
      // queryObject: {},
      pathname: pathKnowbookSaved,
      queryObject: { ...stores.userStore.paramsPage },
      amount: stores.savedStore.saved.size,
      edit_handler: undefined,
      delete_handler: undefined,
    },
    {
      id: pathKnowbookNone,
      stores: stores,
      title: knowbook_none_title,
      image_url: knowbook_none_image,
      // pathname: pathKnowbookNone,
      // queryObject: {},
      pathname: pathKnowbookNone,
      queryObject: { ...stores.userStore.paramsPage },
      amount: "-",
      edit_handler: undefined,
      delete_handler: undefined,
    },
  ];

  return (
    <AppLayout>
      <Box>
        <HeaderTitle stores={stores} title={title} />
        <CardKnowGrid
          id="knowbooks"
          stores={stores}
          knowbooks={Array.from(stores.knowbookStore.knowbooks.values())}
          edit_handler={onOpenRenameKnowbook(stores.uiStore)}
          delete_handler={onDeleteKnowbook(
            stores.savedStore,
            stores.knowbookStore
          )}
          savedStore={stores.savedStore}
          knowbookStore={stores.knowbookStore}
          compact={displayCompactedGridCondition(GUI_CONFIG.id)}
        />
        <Divider />
        <CardKnowGridSpecial
          id="knowbooksSpecial"
          stores={stores}
          cardKnowProps={cardKnowPropsSavedNone}
          compact={displayCompactedGridCondition(GUI_CONFIG.id)}
        />
        {/* <Box paddingY={10}></Box> */}
      </Box>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (constext) => {
  return await I_getStaticPaths(constext);
};

export default observer(Knowbooks);
