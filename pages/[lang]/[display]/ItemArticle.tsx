import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Article from "../../../src/components/Article";
import HeaderTitle from "../../../src/components/HeaderTitle";
import AppLayout from "../../../src/components/layout/AppLayout";
import { ROOT_URL_WIKIPEDIA_REST } from "../../../src/config/configURLs";
import { fetchArticle } from "../../../src/libs/fetch";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getConfigDataGui";
import { initialize } from "../../../src/libs/helpersInitialize";
import { prepareArticle } from "../../../src/libs/utils";
import { useStores } from "../../../src/stores/RootStoreHook";

// const ItemArticleNoSSRDynamic = dynamic(
//   () => import("../../../src/components/ItemArticleNoSSR"),
//   { ssr: false }
// );

// const MenuBarDisplayLoggedDynamic = dynamic(
//   () => import("../../../src/components/MenuBarDisplayLogged"),
//   { ssr: true }
// );

const ItemArticle: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = props.guiConfigData;
  initialize(stores, GUI_CONFIG);

  const router = useRouter();
  const item_title = router.query.title as string;
  const item_id = router.query.id as string;

  if (item_title !== undefined && item_id !== undefined) {
    stores.uiStore.setSelectedAtom(item_id, item_title);
    stores.uiStore.setShowLoading(true);
    fetchArticle(
      item_title,
      ROOT_URL_WIKIPEDIA_REST(stores.baseStore.paramsPage.lang)
    )
      .then((value) => {
        stores.uiStore.setArticleContent(prepareArticle(value));
        stores.uiStore.setShowLoading(false);
      })
      .catch((error) => {
        stores.uiStore.setShowLoading(false);
        // console.log("error in fetching article");
      });
  }

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
      {/* <ItemArticleNoSSRDynamic stores={stores} item_title={item_title} /> */}
      <Article item_title={item_title} stores={stores} />
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
