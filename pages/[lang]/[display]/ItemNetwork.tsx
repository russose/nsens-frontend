import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import HeaderTitle from "../../../src/components/HeaderTitle";
import AppLayout from "../../../src/components/layout/AppLayout";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getConfigDataGui";
import { initialize } from "../../../src/libs/helpersInitialize";
import { useStores } from "../../../src/stores/RootStoreHook";

const ItemNetworkNoSSRDynamic = dynamic(
  () => import("../../../src/components/ItemNetworkNoSSR"),
  { ssr: false }
);

const ItemNetwork: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = props.guiConfigData;
  initialize(stores, GUI_CONFIG);

  const router = useRouter();
  const item_title = router.query.title as string;
  const item_id = router.query.id as string;

  stores.uiStore.setSelectedAtom(item_id, item_title);

  // stores.uiStore.setSelectedAtomId(item_id);

  // let navigation;
  // if (!stores.baseStore.isLogged) {
  //   navigation = (
  //     <>
  //       <MenuBarDisplayNotLogged
  //         stores={stores}
  //         isMobile={isMobile(GUI_CONFIG.id)}
  //       />
  //     </>
  //   );
  // } else {
  //   navigation = (
  //     <>
  //       <MenuBarDisplayLoggedDynamic
  //         stores={stores}
  //         isMobile={isMobile(GUI_CONFIG.id)}
  //       />
  //     </>
  //   );
  // }

  return (
    <AppLayout stores={stores}>
      {/* <MenuBarDisplay stores={stores} isMobile={isMobile(GUI_CONFIG.id)} /> */}
      {/* {navigation} */}
      <HeaderTitle stores={stores} title={item_title} />
      <ItemNetworkNoSSRDynamic
        stores={stores}
        item_title={item_title}
        item_id={item_id}
      />
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(ItemNetwork);
