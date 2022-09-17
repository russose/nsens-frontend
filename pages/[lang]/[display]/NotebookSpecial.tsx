import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";
import { useStores } from "../../../src/stores/RootStoreHook";
import { useRouter } from "next/router";
import { IAtom, TSpecialPages } from "../../../src/config/globals";
import { ItemsInNoKnowbook } from "../../../src/libs/helpersSavedKnowbooks";
import HeaderTitle from "../../../src/components/HeaderTitle";
import CardAtomGridDynamic from "../../../src/components/CardAtomGridDynamic";
import HeaderSEO from "../../../src/components/HeaderSEO";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import AppLayout from "../../../src/components/layout/AppLayout";
import { initializeMostviewed } from "../../../src/libs/helpersBase";

const NotebookSpecial: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  initializeApp(stores, props.paramsPage, props.GUI_CONFIG);

  const router = useRouter();
  const pageType = router.query.pageType;

  const GUI_CONFIG = props.GUI_CONFIG;

  let knowbook_title = "";
  let items: IAtom[] = [];
  // let url_image = "";

  if (pageType === TSpecialPages.Mostviewed) {
    knowbook_title =
      GUI_CONFIG.language.SEO.title_description.KnowbookSpecial.Mostviewed
        .title;

    if (stores.baseStore.mostviewedIds.length === 0) {
      initializeMostviewed(stores);
    }

    items = stores.baseStore.getHistoryItems(stores.baseStore.mostviewedIds);
  } else if (pageType === TSpecialPages.AllSaved) {
    knowbook_title =
      GUI_CONFIG.language.SEO.title_description.KnowbookSpecial.AllSaved.title;
    items = stores.savedStore.savedItems;
  } else if (pageType === TSpecialPages.NoKnowbook) {
    knowbook_title =
      GUI_CONFIG.language.SEO.title_description.KnowbookSpecial.NoKnowbook
        .title;
    items = ItemsInNoKnowbook(stores);
  } else {
    // console.log("error:page type not implemented");
  }

  const content = (
    <>
      <HeaderSEO stores={stores} title={knowbook_title} />
      <HeaderTitle stores={stores} title={knowbook_title} />
      <CardAtomGridDynamic
        id={"NotebookSpecial"}
        stores={stores}
        atoms={items}
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

export default observer(NotebookSpecial);
