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
import {
  initializeApp,
  initializeStaticKnowbooksFullPage,
} from "../../src/libs/helpersInitialize";
// import CatchupMessage from "../../src/components/CatchupMessage";
import KnowbooksStatic from "../../src/components/KnowbooksStatic";
import ContentLoading from "../../src/components/ContentLoading";
// import CatchupMessage from "../../src/components/CatchupMessage";

const Knowbooks: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;

  initializeApp(stores, paramsPage);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  initializeStaticKnowbooksFullPage(stores);
  if (stores.baseStore.initCompleted.staticKnowbooksFull !== true) {
    //Loading StaticKnowbooks Full (blocking)
    return <ContentLoading stores={stores} />;
  }

  return (
    <AppLayout stores={stores}>
      <Box>
        <SEOHeaderTitle
          stores={stores}
          title={
            stores.baseStore.GUI_CONFIG.language.SEO.title_description
              .Knowbooks_Featured.title
          }
        />
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
