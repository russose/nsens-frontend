import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import HeaderTitle from "../../../src/components/HeaderTitle";
import AppLayout from "../../../src/components/layout/AppLayout";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getConfigDataGui";
import { useStores } from "../../../src/stores/RootStoreHook";
import { initialize } from "../../../src/libs/helpersInitialize";
import { configPaths } from "../../../src/config/globals";
import {
  getParamsPageFromContext,
  goPage,
} from "../../../src/libs/helpersBase";
import dynamic from "next/dynamic";
import CardAtomGridNotLogged from "../../../src/components/CardAtomGridNotLogged";

const CardAtomGridLoggedDynamic = dynamic(
  () => import("../../../src/components/CardAtomGridLogged")
);

const Home: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = props.guiConfigData;
  /****************************************************************************/
  //Initialyzation extended for Home to adapt Home to Context (display, lang)
  let paramsPageContext = undefined;
  if (stores.baseStore.user === null) {
    paramsPageContext = getParamsPageFromContext(stores);
  }
  initialize(stores, GUI_CONFIG);
  if (
    stores.baseStore.user === null &&
    paramsPageContext !== undefined &&
    (paramsPageContext.lang !== stores.baseStore.paramsPage.lang ||
      paramsPageContext.display !== stores.baseStore.paramsPage.display)
  ) {
    goPage(
      {
        lang: paramsPageContext.lang,
        display: paramsPageContext.display,
      },
      configPaths.pages.Home
    );
  }
  /****************************************************************************/

  // const slogan = GUI_CONFIG.language.about.slogan;

  let page_content;
  if (!stores.baseStore.isLogged) {
    page_content = (
      <>
        <CardAtomGridNotLogged
          stores={stores}
          id="Home_not_logged"
          items={stores.baseStore.getFeedList()}
        />
      </>
    );
  } else {
    page_content = (
      <>
        <CardAtomGridLoggedDynamic
          stores={stores}
          id="Home_logged"
          items={stores.baseStore.getFeedList()}
        />
      </>
    );
  }

  return (
    <AppLayout stores={stores}>
      <HeaderTitle stores={stores} title={undefined} hidden={true} />
      {page_content}
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(Home);
