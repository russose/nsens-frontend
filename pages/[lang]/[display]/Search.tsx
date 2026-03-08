import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ContentSearch from "../../../src/components/ContentSearch ";
import HeaderSEO from "../../../src/components/HeaderSEO";
import HeaderTitle from "../../../src/components/HeaderTitle";
import AppLayout from "../../../src/components/layout/AppLayout";
import { initStateCat } from "../../../src/config/globals";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import { useStores } from "../../../src/stores/RootStoreHook";

const Search: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const router = useRouter();
  // initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  useEffect(() => {
    initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  }, []);
  if (stores.uiStore.getInitCompleted(initStateCat.core) !== true) {
    return <></>;
  }

  // const router = useRouter();
  let search_string = router.query.search as string;

  // const previous_search_string: string = stores.uiStore.getUiStringStorage(
  //   TUiStringStorage.searchPattern
  // );

  // if (
  //   search_string === undefined &&
  //   previous_search_string !== undefined &&
  //   previous_search_string.length !== 0
  // ) {
  //   stores.uiStore.setUiStringStorage(
  //     TUiStringStorage.searchPattern,
  //     previous_search_string
  //   );
  // } else {
  //   stores.uiStore.setUiStringStorage(
  //     TUiStringStorage.searchPattern,
  //     search_string
  //   );
  // }

  const refresh = search_string !== undefined && search_string.length !== 0;

  const title =
    stores.baseStore.GUI_CONFIG.language.SEO.title_description.Home.title;

  const content = (
    <>
      <HeaderSEO stores={stores} title={title} />
      <HeaderTitle
        stores={stores}
        title={title}
        // addtional_buttons_right={[]}
        hidden={true}
      />

      <ContentSearch
        stores={stores}
        refresh={refresh}
        search_string={search_string}
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

export default observer(Search);
