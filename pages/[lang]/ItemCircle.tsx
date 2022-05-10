import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import AppLayout from "../../src/components/layout/AppLayout";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { initializeApp } from "../../src/libs/helpersInitialize";
import { useStores } from "../../src/stores/RootStoreHook";
import ContentLoading from "../../src/components/ContentLoading";
import SVGElementsInCircleWithSlider from "../../src/components/SVGElementsInCircleWithSlider";
import SVGItem from "../../src/components/SVGItem";
import {
  AtomID,
  SVG_T,
  TUiNumberStorage,
  TUiStringStorage,
} from "../../src/config/globals";
import { initializeGraphSVG } from "../../src/libs/helpersGraph";
import { showArticle } from "../../src/handlers/handlers_Articles";

const ItemCircle: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  const router = useRouter();
  const item_title = router.query.title as string;
  const item_id = router.query.id as string;

  stores.uiStore.setSelectedAtom(item_id, item_title);

  if (item_id !== stores.graphStore.rootItemId) {
    stores.graphStore.setRootItemId(item_id);
    initializeGraphSVG(item_id, item_title, stores);
  }
  if (stores.baseStore.initCompleted.Item !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  const articleOpen = router.query.articleOpen as string;
  if (articleOpen !== undefined) {
    showArticle(stores, item_title, item_id)({ event: new Event("test") });
  }

  const root_element: SVG_T = (
    <SVGItem stores={stores} item={stores.baseStore.getHistoryItem(item_id)} />
  );

  const selectedValue = stores.uiStore.getUiStringStorage(
    TUiStringStorage.dropdownselection
  );

  let elements_ids: AtomID[];
  let edges: string[];
  if (
    selectedValue === undefined ||
    selectedValue === "" ||
    !stores.graphStore.relatedMap.has(selectedValue)
  ) {
    elements_ids = stores.graphStore.relatedMapFlat.values;
    edges = stores.graphStore.relatedMapFlat.keys;
  } else {
    elements_ids = stores.graphStore.relatedMap.get(selectedValue);
    edges = elements_ids.map((el) => selectedValue);
  }

  return (
    <>
      <AppLayout stores={stores} titleSEO={item_title} isBodySVG={true}>
        <SVGElementsInCircleWithSlider
          stores={stores}
          id={`${item_id}`}
          root_element={root_element}
          closed={false}
          elements_body_all_SVG_or_ItemIds={elements_ids}
          elements_body_all_ItemIds={true}
          edges_labels={edges}
          R0_large={stores.uiStore.getUiNumberStorage(TUiNumberStorage.R0)}
          amountElementsLevel={stores.uiStore.getUiNumberStorage(
            TUiNumberStorage.SVGMaxElementCircle
          )}
        />
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

export default observer(ItemCircle);
