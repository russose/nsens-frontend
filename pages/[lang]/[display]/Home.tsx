import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import CardAtomGrid from "../../../src/components/CardAtomGrid";
import HeaderTitle from "../../../src/components/HeaderTitle";
import AppLayout from "../../../src/components/layout/AppLayout";
import { onEditKnowbooks } from "../../../src/handlers/handlers_Knowbooks";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../../../src/handlers/handlers_Saved";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getConfigData";
import { useStores } from "../../../src/stores/_RootStoreHook";
import { initializeAppAndRedirect } from "../../../src/libs/helpers_InitAndRedirect";

const Home: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  initializeAppAndRedirect(stores, GUI_CONFIG);
  const slogan = GUI_CONFIG.language.landing.slogan;

  return (
    <AppLayout stores={stores}>
      <HeaderTitle stores={stores} title={slogan} hidden={true} />
      <CardAtomGrid
        id="Home"
        stores={stores}
        atoms={stores.baseStore.getFeedList()}
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

export default observer(Home);
