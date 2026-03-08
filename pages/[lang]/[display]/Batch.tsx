import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect } from "react";
import FormBatch from "../../../src/components/FormBatch";
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

const Batch: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  // initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  useEffect(() => {
    initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  }, []);
  if (stores.uiStore.getInitCompleted(initStateCat.userData) !== true) {
    return <></>;
  }

  const title = "Batch Processing (to be user carefully)";

  const isLogged = stores.baseStore.isLogged;

  let content_inside;
  if (!isLogged) {
    content_inside = <>You must be logged...</>;
  } else {
    content_inside = (
      <Box height={"100%"} padding={1}>
        <FormBatch stores={stores} />
      </Box>
    );
  }

  const content = (
    <>
      <HeaderTitle
        stores={stores}
        title={title}
        // addtional_buttons_right={[]}
        hidden={false}
      />
      {content_inside}
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

export default observer(Batch);
