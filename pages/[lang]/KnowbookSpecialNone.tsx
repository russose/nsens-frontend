import { observer } from "mobx-react";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import CardAtomGrid from "../../src/components/CardAtomGrid";
import SEOHeaderTitle from "../../src/components/SEOHeaderTitle";
import AppLayout from "../../src/components/layout/AppLayout";
import { onEditKnowbooks } from "../../src/handlers/handlers_Knowbooks";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../../src/handlers/handlers_Saved";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { ItemsInNoKnowbook } from "../../src/libs/helpersSavedKnowbooks";
import { useStores } from "../../src/stores/RootStoreHook";
import { initializeApp } from "../../src/libs/helpersInitialize";

const KnowbookSpecialNone: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  // initializeKnowbooks(stores);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <></>;
  }
  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const title = GUI_CONFIG.language.knowbooks.None_Title;

  return (
    <AppLayout stores={stores}>
      <SEOHeaderTitle stores={stores} title={title} />
      <CardAtomGrid
        id="None"
        stores={stores}
        atoms={ItemsInNoKnowbook(stores)}
        isItemSaved_handler={isItemSaved(stores)}
        isItemSavedActionable_handler={isItemSavedActivated(stores)}
        saved_handler={onSaved(stores)}
        edit_handler={onEditKnowbooks(stores)}
      />
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(KnowbookSpecialNone);
