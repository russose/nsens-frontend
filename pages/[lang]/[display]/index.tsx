import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect } from "react";
import HeaderSEO from "../../../src/components/HeaderSEO";
import AppLayout from "../../../src/components/layout/AppLayout";
import { configGeneral, initStateCat } from "../../../src/config/globals";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";

import { Box, Button } from "gestalt";
import dynamic from "next/dynamic";
import HeaderTitle from "../../../src/components/HeaderTitle";
import { fetchMoreBestPublicKnowbooks } from "../../../src/libs/helpersBase";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import { makeScreenshoots } from "../../../src/libs/utilsServer";
import { useStores } from "../../../src/stores/RootStoreHook";

const CardKnowGridPublicKnowbooks_D = dynamic(
  () => import("../../../src/components/ContentCardKnowGridPublicKnowbooks"),
  {
    ssr: false,
  }
);

const Notebooks: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  // initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  useEffect(() => {
    initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  }, []);
  if (stores.uiStore.getInitCompleted(initStateCat.core) !== true) {
    return <></>;
  }

  const GUI_CONFIG = props.GUI_CONFIG;
  const title = GUI_CONFIG.language.SEO.title_description.Home.title;
  const size_button = GUI_CONFIG.display.size_button_generic as any;
  const button_color = configGeneral.colors.button_color_default as any;

  const button_more = (
    <Box
      display="flex"
      direction="row"
      flex="grow"
      justifyContent="center"
      padding={0}
    >
      <Box
        column={6}
        smColumn={5}
        mdColumn={2}
        lgColumn={1}
        padding={0}
        alignItems="center"
      >
        <Box height={100}></Box>
        <Box padding={0}>
          <Button
            accessibilityLabel="More best knowbooks"
            text={GUI_CONFIG.language.moreBestKnowbooksLabel}
            size={size_button}
            onClick={() => {
              fetchMoreBestPublicKnowbooks(stores);
            }}
            color={button_color}
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  );

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
        <CardKnowGridPublicKnowbooks_D stores={stores} />
        {button_more}
      </AppLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (configGeneral.demoModeForScreenshoots) {
    makeScreenshoots();
  }
  // if (configFetching.staticKnowbooks.refreshAllStaticKnowbooks) {
  //   buildAllStaticKnowbooks();
  // }
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(Notebooks);
