import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { IAtom } from "../../../src/config/globals";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";
import { useStores } from "../../../src/stores/RootStoreHook";
import ContentLoading from "../../../src/components/ContentLoading";
import HeaderTitle from "../../../src/components/HeaderTitle";
import CardAtomGridDynamic from "../../../src/components/CardAtomGridDynamic";
import HeaderSEO from "../../../src/components/HeaderSEO";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import AppLayout from "../../../src/components/layout/AppLayout";

const Knowbook: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  initializeApp(stores, props.paramsPage, props.GUI_CONFIG);

  const router = useRouter();
  const selected_knowbook = router.query.nameOrPeriod as string;
  if (stores.knowbookStore.knowbooks.get(selected_knowbook) === undefined) {
    return <ContentLoading stores={stores} />;
  }

  const items: IAtom[] =
    stores.knowbookStore.knowbookAtomsList(selected_knowbook);

  const content = (
    <>
      <HeaderSEO
        stores={stores}
        title={
          stores.baseStore.GUI_CONFIG.language.SEO.title_description.Knowbook
            .title +
          " " +
          selected_knowbook
        }
      />

      <HeaderTitle stores={stores} title={selected_knowbook} />
      <CardAtomGridDynamic id={"Knowbook"} stores={stores} atoms={items} />
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

export default observer(Knowbook);
