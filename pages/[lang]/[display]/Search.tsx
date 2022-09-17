import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { useStores } from "../../../src/stores/RootStoreHook";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";
import { useRouter } from "next/router";
import { setFeedFromSearch } from "../../../src/libs/helpersBase";
import { TUiStringStorage } from "../../../src/config/globals";
import CardAtomGridDynamic from "../../../src/components/CardAtomGridDynamic";
import HeaderSEO from "../../../src/components/HeaderSEO";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import AppLayout from "../../../src/components/layout/AppLayout";

const Search: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  initializeApp(stores, props.paramsPage, props.GUI_CONFIG);

  const router = useRouter();
  const search_string = router.query.search as string;

  if (search_string !== undefined) {
    if (
      stores.uiStore.getUiStringStorage(TUiStringStorage.searchPattern) === ""
    ) {
      setFeedFromSearch(stores, search_string);
      stores.uiStore.setUiStringStorage(
        TUiStringStorage.searchPattern,
        search_string
      );
    }
  }

  const content = (
    <>
      <HeaderSEO
        stores={stores}
        title={
          stores.baseStore.GUI_CONFIG.language.SEO.title_description.Home.title
        }
      />
      <CardAtomGridDynamic
        id={"Search"}
        stores={stores}
        atoms={stores.baseStore.feedItems}
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
