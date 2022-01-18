import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import AppLayout from "../../src/components/layout/AppLayout";
import { useStores } from "../../src/stores/RootStoreHook";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { initializeApp } from "../../src/libs/helpersInitialize";
import ContentLoading from "../../src/components/ContentLoading";
import {
  SVG_T,
  TPageHeaderModes,
  TPages,
  TUiNumberStorage,
} from "../../src/config/globals";
import SVGKnowbooksFeatured from "../../src/components/SVGKnowbooksFeatured";
import SVGKnowbooksUser from "../../src/components/SVGKnowbooksUser";

const Home: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;

  initializeApp(stores, paramsPage, true);
  // To be checked/deleted: Initialyzed until userData to avoid allRelatedIdsForHome being refreshed 1000s times because of home update
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  let content: SVG_T;
  if (
    stores.baseStore.isLogged &&
    stores.uiStore.isPageHeaderMode(
      TPages.Home,
      TPageHeaderModes.homeUserKnowbooks
    )
  ) {
    content = (
      <SVGKnowbooksUser
        stores={stores}
        // R0_large={R0}
        // amountElementsLevel={amountElementsLevel}
        R0_large={stores.uiStore.getUiNumberStorage(TUiNumberStorage.R0)}
        amountElementsLevel={stores.uiStore.getUiNumberStorage(
          TUiNumberStorage.SVGMaxElementCircle
        )}
        closed={false}
      />
    );
  } else {
    content = (
      <SVGKnowbooksFeatured
        stores={stores}
        // R0_large={R0}
        // amountElementsLevel={amountElementsLevel}
        R0_large={stores.uiStore.getUiNumberStorage(TUiNumberStorage.R0)}
        amountElementsLevel={stores.uiStore.getUiNumberStorage(
          TUiNumberStorage.SVGMaxElementCircle
        )}
        closed={false}
      />
    );
  }

  return (
    <>
      <AppLayout
        stores={stores}
        titleSEO={
          stores.baseStore.GUI_CONFIG.language.SEO.title_description.Home.title
        }
        isBodySVG={true}
      >
        {content}
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
