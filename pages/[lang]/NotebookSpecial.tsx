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
import SVGItem from "../../src/components/SVGItem";
import { useRouter } from "next/router";
import {
  IAtom,
  SVG_T,
  TSpecialPages,
  TUiNumberStorage,
} from "../../src/config/globals";
import { ItemsInNoKnowbook } from "../../src/libs/helpersSavedKnowbooks";
import SVGElementsInCircleWithSlider from "../../src/components/SVGElementsInCircleWithSlider";
import SVGKnowbook from "../../src/components/SVGKnowbook";
import { configPaths } from "../../src/config/configLocalAndEnv";
import { getRandomImageFromItems } from "../../src/libs/utils";
import SVGKnowbookExternalShape from "../../src/components/SVGKnowbookExternalShape";

const NotebookSpecial: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  // initializeKnowbooks(stores);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  const router = useRouter();
  const pageType = router.query.pageType;

  const pathTarget = configPaths.pages.Home;
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

  const root_element: SVG_T = (
    <SVGKnowbook
      stores={stores}
      id={knowbook_title}
      title={knowbook_title}
      image_url={url_image}
      pathname={pathTarget}
      queryObject={{}}
      amount={0}
      edit_handler={undefined}
      delete_handler={undefined}
    />
  );

  const elements: SVG_T[] = items.map((item, index) => {
    return <SVGItem stores={stores} item={item} />;
  });

  return (
    <AppLayout stores={stores} titleSEO={knowbook_title} isBodySVG={true}>
      <SVGKnowbookExternalShape
        size={
          stores.uiStore.getUiNumberStorage(TUiNumberStorage.R0) * 2 +
          stores.baseStore.GUI_CONFIG.display.atom_sizes.height
        }
      />
      <SVGElementsInCircleWithSlider
        stores={stores}
        id="NotebookSpecial"
        root_element={root_element}
        closed={false}
        elements_body_all_SVG_or_ItemIds={elements}
        R0_large={stores.uiStore.getUiNumberStorage(TUiNumberStorage.R0)}
        amountElementsLevel={stores.uiStore.getUiNumberStorage(
          TUiNumberStorage.SVGMaxElementCircle
        )}
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

export default observer(NotebookSpecial);
