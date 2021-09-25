import { observer } from "mobx-react-lite";
import React from "react";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import CardAtomGrid from "../../src/components/CardAtomGrid";

import { useStores } from "../../src/stores/RootStoreHook";
import AppLayout from "../../src/components/layout/AppLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import SEOHeaderTitle from "../../src/components/SEOHeaderTitle";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../../src/handlers/handlers_Saved";
import { onEditKnowbooks } from "../../src/handlers/handlers_Knowbooks";
import { initializeApp } from "../../src/libs/helpersInitialize";
import ContentLoading from "../../src/components/ContentLoading";

const KnowbookSpecialSaved: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  // initializeKnowbooks(stores);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }
  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const title = GUI_CONFIG.language.SEO.title_description.KnowbookSaved.title;

  return (
    <AppLayout stores={stores}>
      <SEOHeaderTitle stores={stores} title={title} />
      <CardAtomGrid
        id="Saved"
        stores={stores}
        atoms={stores.savedStore.savedItems}
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

export default observer(KnowbookSpecialSaved);
