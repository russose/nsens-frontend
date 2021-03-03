import { observer } from "mobx-react-lite";
import React from "react";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/utilsConfigGui";
import CardAtomGrid from "../../../src/components/CardAtomGrid";
import {
  isItemSaved,
  isItemSavedActivated,
  onEditKnowbooks,
  onSaved,
} from "../../../src/handlers";
import { displayCompactedGridCondition } from "../../../src/libs/utils";
import { useStores } from "../../../src/stores/_RootStoreHook";
import AppLayout from "../../../src/components/layout/AppLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import HeaderTitle from "../../../src/components/HeaderTitle";

const KnowbookSpecialSaved: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG);
  const title = GUI_CONFIG.language.knowbooks.AllSaved_title;

  return (
    <AppLayout>
      <HeaderTitle stores={stores} title={title} />
      <CardAtomGrid
        id="Saved"
        stores={stores}
        atoms={Array.from(stores.savedStore.saved.values())}
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

export default observer(KnowbookSpecialSaved);
