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
import ContentLoading from "../../src/components/ContentLoading";

const CardAtomGridLoggedDynamic = dynamic(
  () => import("../../src/components/CardAtomGridLogged")
);

const Home: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;

  initializeApp(stores, paramsPage);

  // Initialyzed until userData to avoid allRelatedIdsForHome being refreshed 1000s times because of home update
  if (stores.baseStore.initCompleted.userData !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  let page_content;
  if (!stores.baseStore.isLogged) {
    page_content = (
      <>
        <CardAtomGridNotLogged
          stores={stores}
          id="Home_not_logged"
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
          items={stores.baseStore.feedItemsToDisplay}
        />
      </>
    );
  }

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
