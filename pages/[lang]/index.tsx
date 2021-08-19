import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import SEOHeaderTitle from "../../src/components/SEOHeaderTitle";
import AppLayout from "../../src/components/layout/AppLayout";
import { useStores } from "../../src/stores/RootStoreHook";
import dynamic from "next/dynamic";
import CardAtomGridNotLogged from "../../src/components/CardAtomGridNotLogged";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { initializeApp } from "../../src/libs/helpersInitialize";
import DialogLoading from "../../src/components/DialogLoading";
import { Box } from "gestalt";
import { IStores } from "../../src/stores/RootStore";
import { is_testing_mode } from "../../src/config/globals";

const CardAtomGridLoggedDynamic = dynamic(
  () => import("../../src/components/CardAtomGridLogged")
);

// let i = 0;
const increaseFeedDisplayed = (stores: IStores) => {
  // console.log("in increase!", i++);
  const baseStore = stores.baseStore;
  let time_increment_ms = 200;
  if (is_testing_mode) {
    time_increment_ms = 1000;
  }
  if (!baseStore.enableIncreaseFeedDisplay) {
    return;
  }

  setTimeout(() => {
    baseStore.incrementFeedDisplay();
  }, time_increment_ms);
};

const Home: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;

  /*******************************************************************************************/
  //Initialyzation extended for Home to adapt Home to Context (display, lang) if changed
  initializeApp(stores, paramsPage);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed (Core part)
    return (
      <Box
        height="100vh"
        display="flex"
        direction="column"
        justifyContent="center"
      >
        <DialogLoading stores={stores} />
      </Box>
    );
  }

  // getParamsPageFromContext(stores).then((paramsPageContext) => {
  //   if (
  //     paramsPageContext !== undefined &&
  //     (paramsPageContext.lang !== paramsPage.lang ||
  //       paramsPageContext.display !== paramsPage.display)
  //   ) {
  //     stores.baseStore
  //       .setParamsPageAndGUICONFIGFromParamsPageData(paramsPageContext)
  //       .then(() => {
  //         goPage(
  //           stores,
  //           {
  //             lang: paramsPageContext.lang,
  //             display: paramsPageContext.display,
  //           },
  //           configPaths.pages.Home
  //         );
  //       });
  //   }
  // });

  /*******************************************************************************************/

  let page_content;
  if (!stores.baseStore.isLogged) {
    page_content = (
      <>
        <CardAtomGridNotLogged
          stores={stores}
          id="Home_not_logged"
          // items={stores.baseStore.getFeedItems()}
          items={stores.baseStore.feedItemsToDisplay}
        />
      </>
    );
  } else {
    page_content = (
      <>
        <CardAtomGridLoggedDynamic
          stores={stores}
          id="Home_logged"
          // items={stores.baseStore.getFeedItems()}
          items={stores.baseStore.feedItemsToDisplay}
        />
      </>
    );
  }

  increaseFeedDisplayed(stores);

  return (
    <>
      <AppLayout stores={stores}>
        <SEOHeaderTitle stores={stores} title={undefined} hidden={true} />
        {page_content}
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

export default observer(Home);
