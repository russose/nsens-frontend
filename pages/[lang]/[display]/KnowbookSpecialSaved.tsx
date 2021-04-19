import { observer } from "mobx-react-lite";
import React from "react";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getConfigData";
import CardAtomGrid from "../../../src/components/CardAtomGrid";

import { useStores } from "../../../src/stores/_RootStoreHook";
import AppLayout from "../../../src/components/layout/AppLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import HeaderTitle from "../../../src/components/HeaderTitle";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../../../src/handlers/handlers_Saved";
import { onEditKnowbooks } from "../../../src/handlers/handlers_Knowbooks";
import { initializeAppAndRedirect } from "../../../src/libs/helpers_InitAndRedirect";

const KnowbookSpecialSaved: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  initializeAppAndRedirect(stores, GUI_CONFIG);
  const title = GUI_CONFIG.language.knowbooks.AllSaved_title;

  return (
    <AppLayout stores={stores}>
      <HeaderTitle stores={stores} title={title} />
      <CardAtomGrid
        id="Saved"
        stores={stores}
        atoms={Array.from(stores.savedStore.saved.values())}
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
export const getStaticPaths: GetStaticPaths = async (constext) => {
  return await I_getStaticPaths(constext);
};

export default observer(KnowbookSpecialSaved);
