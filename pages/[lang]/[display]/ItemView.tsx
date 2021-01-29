import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import {
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/utilsConfigGui";
import { IPage } from "../../../src/libs/utilsConfigGui";
import { useStores } from "../../../src/stores/_RootStoreHook";
import dynamic from "next/dynamic";

const ItemViewNoSSR = dynamic(
  () => import("../../../src/components/ItemViewNoSSR"),
  { ssr: false }
);

const ItemView: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();

  const GUI_CONFIG = { ...props.guiConfigData };
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG);

  return <ItemViewNoSSR stores={stores} GUI_CONFIG={GUI_CONFIG} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (constext) => {
  return await I_getStaticPaths(constext);
};

export default observer(ItemView);
