import { Box } from "gestalt";
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
import dynamic from "next/dynamic";
// import CatchupMessage from "../../../src/components/CatchupMessage";
import Separator from "../../../src/components/Separator";
import KnowbooksStatic from "../../../src/components/KnowbooksStatic";
// import CatchupMessage from "../../../src/components/CatchupMessage";

const KnowbooksLoggedDynamic = dynamic(
  () => import("../../../src/components/KnowbooksLogged"),
  { ssr: true }
);
const CatchupMessageDynamic = dynamic(
  () => import("../../../src/components/CatchupMessage"),
  { ssr: false }
);

const Knowbooks: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = props.guiConfigData;
  initialize(stores, GUI_CONFIG);

  const title = GUI_CONFIG.language.knowbooks.knowbooks_title;

  let message;
  let knowbooksUser;
  if (stores.baseStore.isLogged) {
    knowbooksUser = (
      <>
        <KnowbooksLoggedDynamic stores={stores} />
        <Separator with_line={true} />
      </>
    );
    message = <></>;
  } else {
    knowbooksUser = <></>;
    message = (
      <>
        <Separator with_line={true} />
        <CatchupMessageDynamic stores={stores} withButton={true} />
      </>
    );
  }

  return (
    <AppLayout stores={stores}>
      <Box>
        <HeaderTitle stores={stores} title={title} />
        {knowbooksUser}
        <KnowbooksStatic stores={stores} />

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
