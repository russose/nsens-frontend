import { observer } from "mobx-react-lite";
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
import { useStores } from "../../src/stores/RootStoreHook";
import { initializeApp } from "../../src/libs/helpersInitialize";
import ContentLoading from "../../src/components/ContentLoading";

const NotebookMostviewed: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  // initializeKnowbooks(stores);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  return (
    <AppLayout stores={stores}>
      <SEOHeaderTitle
        stores={stores}
        title={
          stores.baseStore.GUI_CONFIG.language.SEO.title_description
            .KnowbookMostviewed.title
        }
      />
      <CardAtomGrid
        id="None"
        stores={stores}
        atoms={stores.baseStore
          .getHistoryItems(stores.baseStore.mostviewedIds)
          .filter((item) => {
            return item.image_url !== "";
          })}
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

export default observer(NotebookMostviewed);
