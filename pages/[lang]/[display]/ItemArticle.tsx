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
import MenuBarDisplay from "../../../src/components/MenuBarDisplay";
import { isMobile } from "../../../src/libs/utils";
import AppLayout from "../../../src/components/layout/AppLayout";
import HeaderTitle from "../../../src/components/HeaderTitle";

const ItemArticleNoSSR = dynamic(
  () => import("../../../src/components/dynamic/ItemArticleNoSSR"),
  { ssr: false }
);

const ItemArticle: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG);

  const router = useRouter();
  const item_title = router.query.title as string;
  const item_id = router.query.id as string;

  stores.uiStore.setSelectedAtom(item_id, item_title);

  return (
    <AppLayout stores={stores}>
      <HeaderTitle stores={stores} title={item_title} hidden={true} />
      <MenuBarDisplay stores={stores} isMobile={isMobile(GUI_CONFIG.id)} />
      <ItemArticleNoSSR stores={stores} item_title={item_title} />
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (constext) => {
  return await I_getStaticPaths(constext);
};

export default observer(ItemArticle);
