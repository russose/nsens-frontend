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
} from "../../../../src/libs/getConfigDataStaticArticle";
import { initialize } from "../../../../src/libs/helpersInitialize";
import { prepareArticle } from "../../../../src/libs/utils";
import { useStores } from "../../../../src/stores/RootStoreHook";

// const MenuBarDisplayLoggedDynamic = dynamic(
//   () => import("../../../../src/components/MenuBarDisplayLogged"),
//   { ssr: true }
// );

const ItemStaticArticle: React.FunctionComponent<IPageStaticArticle> = (
  props
) => {
  const stores = useStores();
  const GUI_CONFIG = props.guiConfigData;
  const item_id = props.id;
  const item_title = props.title;
  const articleContent = props.articleContent;
  initialize(stores, GUI_CONFIG);

  stores.uiStore.setSelectedAtom(item_id, item_title);

  stores.uiStore.setArticleContent(prepareArticle(articleContent));

  // let navigation;
  // if (!stores.baseStore.isLogged) {
  //   navigation = (
  //     <>
  //       <MenuBarDisplayNotLogged
  //         stores={stores}
  //         isMobile={isMobile(GUI_CONFIG.id)}
  //       />
  //     </>
  //   );
  // } else {
  //   navigation = (
  //     <>
  //       <MenuBarDisplayLoggedDynamic
  //         stores={stores}
  //         isMobile={isMobile(GUI_CONFIG.id)}
  //       />
  //     </>
  //   );
  // }

  return (
    <AppLayout stores={stores}>
      <HeaderTitle stores={stores} title={item_title} hidden={true} />
      {/* {navigation} */}
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
