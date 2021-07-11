import LZString from "lz-string";
import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Article from "../../../../src/components/Article";
import HeaderTitle from "../../../../src/components/HeaderTitle";
import AppLayout from "../../../../src/components/layout/AppLayout";
import {
  IPageStaticArticle,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../../src/libs/getDataStaticArticle";
import { initializeApp } from "../../../../src/libs/helpersInitialize";
import { prepareArticle } from "../../../../src/libs/utils";
import { useStores } from "../../../../src/stores/RootStoreHook";

const ItemStaticArticle: React.FunctionComponent<IPageStaticArticle> = (
  props
) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  if (stores.baseStore.GUI_CONFIG === undefined) {
    //Not yet initialyzed
    return <></>;
  }

  const item_title = props.title;
  const item_id = props.id;
  const articleContent = LZString.decompress(props.articleContentCompressed);
  stores.uiStore.setSelectedAtom(item_id, item_title);

  stores.uiStore.setArticleContent(prepareArticle(articleContent));

  return (
    <AppLayout stores={stores}>
      <HeaderTitle stores={stores} title={item_title} hidden={true} />
      <Article item_title={item_title} stores={stores} />
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(ItemStaticArticle);
