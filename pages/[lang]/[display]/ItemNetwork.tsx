import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";
import { useStores } from "../../../src/stores/RootStoreHook";
import { fetchRelated } from "../../../src/libs/helpersRelated";
import HeaderSEO from "../../../src/components/HeaderSEO";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import AppLayout from "../../../src/components/layout/AppLayout";
import dynamic from "next/dynamic";
import { initStateCat } from "../../../src/config/globals";
import HeaderTitle from "../../../src/components/HeaderTitle";
import {
  buttons_back,
  buttons_sharing,
} from "../../../src/components/_buttons_definition";
import { isMobile } from "../../../src/libs/helpersBase";

const Network_D = dynamic(
  () => import("../../../src/components/network/Network"),
  {
    ssr: false,
  }
);

const ItemNetwork: React.FunctionComponent<IPage> = (props) => {
  const router = useRouter();
  const stores = useStores();
  useEffect(() => {
    initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  }, []);

  const item_title = router.query.title as string;
  const item_id = router.query.id as string;
  let scenario_index = Number(router.query.scenario_index);
  if (isNaN(scenario_index)) {
    scenario_index = undefined;
  }

  stores.uiStore.setSelectedAtom(item_id, item_title);

  useEffect(() => {
    if (
      item_id !== stores.graphStore.rootNetworkId &&
      stores.uiStore.getInitCompleted(initStateCat.userData) === true
    ) {
      stores.graphStore.setRootNetworkId(item_id);
      fetchRelated(item_id, item_title, stores);
    }
  }, [
    item_id,
    router.isReady,
    stores.uiStore.getInitCompleted(initStateCat.userData),
  ]);

  if (stores.uiStore.getInitCompleted(initStateCat.userData) !== true) {
    return <></>;
  }

  let addtional_buttons_left = [...buttons_back(router)];
  let addtional_buttons_right = [...buttons_sharing(stores, router)];

  if (!isMobile(stores)) {
    addtional_buttons_right = addtional_buttons_left.concat(
      addtional_buttons_right
    );
    addtional_buttons_left = [];
  }

  const content = (
    <>
      <HeaderSEO stores={stores} title={item_title} />
      <HeaderTitle
        stores={stores}
        title={item_title}
        hidden={false}
        addtional_buttons_left={addtional_buttons_left}
        addtional_buttons_right={addtional_buttons_right}
      />
      <Network_D
        stores={stores}
        item_title={item_title}
        item_id={item_id}
        scenario_index={scenario_index}
      />
    </>
  );

  return <AppLayout paramsPage={props.paramsPage}>{content}</AppLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(ItemNetwork);
