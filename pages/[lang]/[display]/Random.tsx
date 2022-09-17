import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { useStores } from "../../../src/stores/RootStoreHook";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";
import CardAtomGridDynamic from "../../../src/components/CardAtomGridDynamic";
import HeaderSEO from "../../../src/components/HeaderSEO";
import AppLayout from "../../../src/components/layout/AppLayout";
import { initializeApp } from "../../../src/libs/helpersInitialize";

const Random: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  initializeApp(stores, props.paramsPage, props.GUI_CONFIG);

  const content = (
    <>
      <HeaderSEO
        stores={stores}
        title={
          stores.baseStore.GUI_CONFIG.language.SEO.title_description.Home.title
        }
      />
      <CardAtomGridDynamic
        id={"Home"}
        stores={stores}
        // atoms={stores.baseStore.feedItemsToDisplay}
        atoms={[]}
      />
    </>
  );

  return <AppLayout paramsPage={props.paramsPage}>{content}</AppLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  // if (configGeneral.demoModeForScreenshoots) {
  //   makeScreenshoots();
  // }
  // if (configFetching.staticKnowbooks.refreshAllStaticKnowbooks) {
  //   buildAllStaticKnowbooks();
  // }
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(Random);
