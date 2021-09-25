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
import dynamic from "next/dynamic";
// import CatchupMessage from "../../src/components/CatchupMessage";
import Separator from "../../src/components/Separator";
import ContentLoading from "../../src/components/ContentLoading";
// import CatchupMessage from "../../src/components/CatchupMessage";

const KnowbooksLoggedDynamic = dynamic(
  () => import("../../src/components/KnowbooksLogged"),
  { ssr: true }
);
const CatchupMessageDynamic = dynamic(
  () => import("../../src/components/CatchupMessage"),
  { ssr: false }
);

const Knowbooks: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  // initializeKnowbooks(stores);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;

  const title = GUI_CONFIG.language.SEO.title_description.Knowbooks_User.title;

  let message;
  let knowbooksUser;
  if (stores.baseStore.isLogged) {
    knowbooksUser = <KnowbooksLoggedDynamic stores={stores} />;
    message = <></>;
  } else {
    knowbooksUser = <></>;
    message = (
      <>
        <Separator with_line={false} />
        <Separator with_line={false} />
        <CatchupMessageDynamic stores={stores} withButton={true} />
      </>
    );
  }

  return (
    <AppLayout stores={stores}>
      <Box>
        <SEOHeaderTitle stores={stores} title={title} />
        {knowbooksUser}
        {message}
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
