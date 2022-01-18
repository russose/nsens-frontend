import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import AppLayout from "../../../src/components/layout/AppLayout";
import {
  configPaths,
  IKnowbookStatic,
  SVG_T,
  TUiNumberStorage,
} from "../../../src/config/globals";
import {
  IPageStaticKnowbooks,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataStaticKnowbooks";
import {
  initializeApp,
  initializeStaticKnowbooksFullSinglePage,
} from "../../../src/libs/helpersInitialize";
import { useStores } from "../../../src/stores/RootStoreHook";
import { getRelatedItemsForItemsShuffleSized_Static } from "../../../src/libs/helpersRelated";
import ContentLoading from "../../../src/components/ContentLoading";
import SVGItem from "../../../src/components/SVGItem";
import SVGKnowbook from "../../../src/components/SVGKnowbook";
import SVGElementsInCircleWithSlider from "../../../src/components/SVGElementsInCircleWithSlider";

const BestKnowbook: React.FunctionComponent<IPageStaticKnowbooks> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  // initializeStaticKnowbooksFullPage(stores);
  const knowbook: IKnowbookStatic = stores.knowbookStore.staticKnowbooks.get(
    props.nameOrPeriod
  );
  initializeStaticKnowbooksFullSinglePage(stores, props.nameOrPeriod);

  if (knowbook === undefined) {
    return <ContentLoading stores={stores} />;
  }

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const pathTarget = configPaths.pages.Home;
  const name_display = props.name_display;

  // const R0 = SVGMaxRadius(stores);
  // const amountElementsLevel = SVGMaxElementCircle(stores, R0);

  const items = knowbook.items;

  const amount_related_displayed =
    GUI_CONFIG.display.display.amount_related_displayed;

  const related_items = getRelatedItemsForItemsShuffleSized_Static(
    stores,
    items,
    amount_related_displayed
  );

  const root_element: SVG_T = (
    <SVGKnowbook
      stores={stores}
      id={knowbook.name}
      title={knowbook.name_display}
      image_url={stores.knowbookStore.getImageStaticKnowbook(knowbook.name)}
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

  const elements_related: SVG_T[] = related_items.map((item, index) => {
    return <SVGItem stores={stores} item={item} />;
  });

  return (
    <AppLayout stores={stores} titleSEO={name_display} isBodySVG={true}>
      <SVGElementsInCircleWithSlider
        stores={stores}
        id="BestKnowbook"
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

export default observer(BestKnowbook);
