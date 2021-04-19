import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import {
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getConfigData";
import { IPage } from "../../../src/libs/getConfigData";
import { useStores } from "../../../src/stores/_RootStoreHook";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import AppLayout from "../../../src/components/layout/AppLayout";
import HeaderTitle from "../../../src/components/HeaderTitle";
import MenuBarDisplay from "../../../src/components/MenuBarDisplay";
import { isMobile } from "../../../src/libs/utils";

const ItemNetworkNoSSR = dynamic(
  () => import("../../../src/components/dynamic/ItemNetworkNoSSR"),
  { ssr: false }
);

const ItemNetwork: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG);

  const router = useRouter();
  const item_title = router.query.title as string;
  const item_id = router.query.id as string;

  // stores.uiStore.setSelectedAtomId(item_id);

  return (
    <AppLayout stores={stores}>
      <MenuBarDisplay stores={stores} isMobile={isMobile(GUI_CONFIG.id)} />
      <HeaderTitle stores={stores} title={item_title} />
      <ItemNetworkNoSSR
        stores={stores}
        item_title={item_title}
        item_id={item_id}
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

export default observer(ItemNetwork);
