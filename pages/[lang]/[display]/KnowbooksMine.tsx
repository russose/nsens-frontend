import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect } from "react";
import HeaderSEO from "../../../src/components/HeaderSEO";
import AppLayout from "../../../src/components/layout/AppLayout";
import { initStateCat } from "../../../src/config/globals";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";

import dynamic from "next/dynamic";
import HeaderTitle from "../../../src/components/HeaderTitle";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import { useStores } from "../../../src/stores/RootStoreHook";

const CardKnowGridMyKnowbooks_D = dynamic(
  () => import("../../../src/components/ContentCardKnowGridMyKnowbooks"),
  {
    ssr: false,
  }
);

const KnowbooksMine: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  // initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  useEffect(() => {
    initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  }, []);
  if (stores.uiStore.getInitCompleted(initStateCat.core) !== true) {
    return <></>;
  }

  const GUI_CONFIG = props.GUI_CONFIG;
  const title = GUI_CONFIG.language.SEO.title_description.KnowbooksMine.title;

  return (
    <>
      <AppLayout paramsPage={props.paramsPage}>
        <HeaderSEO stores={stores} title={title} additional_description={""} />
        <HeaderTitle
          stores={stores}
          title={title}
          // addtional_buttons_right={[]}
          hidden={false}
        />
        {/* <ContentKnowbooks stores={stores} /> */}
        <CardKnowGridMyKnowbooks_D stores={stores} />
      </AppLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(KnowbooksMine);
