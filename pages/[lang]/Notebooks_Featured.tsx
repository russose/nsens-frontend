import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import SEOHeaderTitle from "../../src/components/SEOHeaderTitle";
import AppLayout from "../../src/components/layout/AppLayout";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { useStores } from "../../src/stores/RootStoreHook";
import { initializeApp } from "../../src/libs/helpersInitialize";
// import CatchupMessage from "../../src/components/CatchupMessage";
import KnowbooksStatic from "../../src/components/KnowbooksStatic";
// import CatchupMessage from "../../src/components/CatchupMessage";

// const topLevelPattern_ = "Category:Wikipedia level-2 vital articles by topic";
// const languages_list = Object.values(ConfigLanguage);
// buildVitalStaticKnowbooksAllLanguages(
//   topLevelPattern_,
//   ROOT_URL_WIKIPEDIA_ACTION(ConfigLanguage.en),
//   URLs.ROOT_URL_WIKIDATA_ACTION,
//   languages_list
// );

const Knowbooks: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  // initializeKnowbooks(stores);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <></>;
  }

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;

  const title = GUI_CONFIG.language.knowbooks_Featured.knowbooks_title;

  return (
    <AppLayout stores={stores}>
      <Box>
        <SEOHeaderTitle stores={stores} title={title} />
        <KnowbooksStatic stores={stores} />
      </Box>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(Knowbooks);
