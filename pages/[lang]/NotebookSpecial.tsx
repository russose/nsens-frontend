import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import AppLayout from "../../src/components/layout/AppLayout";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { useStores } from "../../src/stores/RootStoreHook";
import { initializeApp } from "../../src/libs/helpersInitialize";
import ContentLoading from "../../src/components/ContentLoading";
import { useRouter } from "next/router";
import { IAtom, TSpecialPages } from "../../src/config/globals";
import { ItemsInNoKnowbook } from "../../src/libs/helpersSavedKnowbooks";
import { configPaths } from "../../src/config/configLocalAndEnv";
import { getRandomImageFromItems } from "../../src/libs/utils";
import HeaderTitle from "../../src/components/HeaderTitle";
import CardAtomGrid from "../../src/components/CardAtomGrid";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../../src/handlers/handlers_Saved";
import { onEditKnowbooks } from "../../src/handlers/handlers_Knowbooks";

const NotebookSpecial: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  const router = useRouter();
  const pageType = router.query.pageType;

  // const pathTarget = configPaths.pages.Home;
  let knowbook_title = "";
  let items: IAtom[] = [];
  let url_image = "";

  if (pageType === TSpecialPages.Mostviewed) {
    knowbook_title =
      stores.baseStore.GUI_CONFIG.language.SEO.title_description.KnowbookSpecial
        .Mostviewed.title;
    items = stores.baseStore.getHistoryItems(stores.baseStore.mostviewedIds);
    url_image = getRandomImageFromItems(
      stores.baseStore.getHistoryItems(stores.baseStore.mostviewedIds)
    );
    for (const item of items) {
      stores.baseStore.setGoodImageInHistoryItem(item.id);
    }
  } else if (pageType === TSpecialPages.AllSaved) {
    knowbook_title =
      stores.baseStore.GUI_CONFIG.language.SEO.title_description.KnowbookSpecial
        .AllSaved.title;
    items = stores.savedStore.savedItems;
    url_image = configPaths.knowbook_all_image;
  } else if (pageType === TSpecialPages.NoKnowbook) {
    knowbook_title =
      stores.baseStore.GUI_CONFIG.language.SEO.title_description.KnowbookSpecial
        .NoKnowbook.title;
    items = ItemsInNoKnowbook(stores);
    url_image = configPaths.knowbook_none_image;
  } else {
    // console.log("error:page type not implemented");
  }

  // const root_element: SVG_T = (
  //   <SVGKnowbook
  //     stores={stores}
  //     id={knowbook_title}
  //     title={knowbook_title}
  //     image_url={url_image}
  //     pathname={pathTarget}
  //     queryObject={{}}
  //     amount={0}
  //     edit_handler={undefined}
  //     delete_handler={undefined}
  //   />
  // );

  // const elements: SVG_T[] = items.map((item, index) => {
  //   return <SVGItem stores={stores} item={item} />;
  // });

  const content = (
    <>
      <HeaderTitle stores={stores} title={knowbook_title} />
      <CardAtomGrid
        id={"NotebookSpecial"}
        stores={stores}
        atoms={items}
        isItemSaved_handler={isItemSaved(stores)}
        isItemSavedActionable_handler={isItemSavedActivated(stores)}
        saved_handler={onSaved(stores)}
        edit_handler={onEditKnowbooks(stores)}
      />
    </>
  );

  return (
    <AppLayout stores={stores} titleSEO={knowbook_title} isBodySVG={false}>
      {content}
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(NotebookSpecial);
