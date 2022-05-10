import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import AppLayout from "../../src/components/layout/AppLayout";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { initializeApp } from "../../src/libs/helpersInitialize";
import { useStores } from "../../src/stores/RootStoreHook";
import ContentLoading from "../../src/components/ContentLoading";

const ItemNetworkNoSSRDynamic = dynamic(
  () => import("../../src/components/ItemNetworkNoSSR"),
  { ssr: false }
);

const ItemNetwork: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  // if (stores.baseStore.initCompleted.core !== true) {
  if (stores.baseStore.initCompleted.userData !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  const router = useRouter();
  const item_title = router.query.title as string;
  const item_id = router.query.id as string;

  stores.uiStore.setSelectedAtom(item_id, item_title);

  // stores.uiStore.setSelectedAtomId(item_id);

  return (
    <AppLayout stores={stores} titleSEO={item_title} isBodySVG={false}>
      <ItemNetworkNoSSRDynamic
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
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(ItemNetwork);
