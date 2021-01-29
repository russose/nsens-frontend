import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import CardAtomGrid from "../../../src/components/CardAtomGrid";
import AppLayout from "../../../src/components/layout/AppLayout";
import {
  isItemSaved,
  isItemSavedActivated,
  onEditKnowbooks,
  onSaved,
} from "../../../src/handlers";
import { displayCompactedGridCondition } from "../../../src/libs/utils";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/utilsConfigGui";
import { useStores } from "../../../src/stores/_RootStoreHook";

const Home: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG);

  return (
    <AppLayout>
      <CardAtomGrid
        id="Home"
        stores={stores}
        atoms={stores.feedStore.getFeedList()}
        isItemSaved_handler={isItemSaved(stores.savedStore)}
        isItemSavedActionable_handler={isItemSavedActivated(
          stores.knowbookStore
        )}
        saved_handler={onSaved(stores)}
        edit_handler={onEditKnowbooks(stores.uiStore, stores.knowbookStore)}
        compact={displayCompactedGridCondition(GUI_CONFIG.id)}
      />
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (constext) => {
  return await I_getStaticPaths(constext);
};

export default observer(Home);
