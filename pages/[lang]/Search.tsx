import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import AppLayout from "../../src/components/layout/AppLayout";
import { useStores } from "../../src/stores/RootStoreHook";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { initializeApp } from "../../src/libs/helpersInitialize";
import ContentLoading from "../../src/components/ContentLoading";
import CardAtomGrid from "../../src/components/CardAtomGrid";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../../src/handlers/handlers_Saved";
import { onEditKnowbooks } from "../../src/handlers/handlers_Knowbooks";

const Search: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;

  initializeApp(stores, paramsPage);

  // To be checked/deleted: Initialyzed until userData to avoid allRelatedIdsForHome being refreshed 1000s times because of home update
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  const page_content = (
    <>
      <CardAtomGrid
        id="Search"
        stores={stores}
        atoms={stores.baseStore.feedItemsToDisplay}
        isItemSaved_handler={isItemSaved(stores)}
        isItemSavedActionable_handler={isItemSavedActivated(stores)}
        saved_handler={onSaved(stores)}
        edit_handler={onEditKnowbooks(stores)}
        // static={props.static}
      />
    </>
  );

  return (
    <>
      <AppLayout
        stores={stores}
        titleSEO={
          stores.baseStore.GUI_CONFIG.language.SEO.title_description.Home.title
        }
        isBodySVG={false}
      >
        {page_content}
      </AppLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(Search);
