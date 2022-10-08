import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";
import { useStores } from "../../../src/stores/RootStoreHook";
import { fetchRelatedItems } from "../../../src/libs/helpersRelated";
import HeaderSEO from "../../../src/components/HeaderSEO";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import AppLayout from "../../../src/components/layout/AppLayout";
import dynamic from "next/dynamic";
import HeaderTitle from "../../../src/components/HeaderTitle";
import HeaderItem from "../../../src/components/HeaderItem";

const NetworkItem_D = dynamic(
  () => import("../../../src/components/vizs/NetworkItem"),
  {
    ssr: false,
  }
);

const ItemNetwork: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  initializeApp(stores, props.paramsPage, props.GUI_CONFIG);

  const router = useRouter();
  const item_title = router.query.title as string;
  const item_id = router.query.id as string;

  stores.uiStore.setSelectedAtom(item_id, item_title);

  if (item_id !== stores.graphStore.rootItemId) {
    stores.graphStore.setRootItemId(item_id);
    fetchRelatedItems(item_id, item_title, stores);
  }

  const content = (
    <>
      <HeaderSEO stores={stores} title={item_title} />
      <HeaderTitle stores={stores} title={item_title} hidden={true} />
      <HeaderItem stores={stores} title={item_title} />
      <NetworkItem_D
        stores={stores}
        item_title={item_title}
        item_id={item_id}
      />
    </>
  );

  return <AppLayout paramsPage={props.paramsPage}>{content}</AppLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(ItemNetwork);
