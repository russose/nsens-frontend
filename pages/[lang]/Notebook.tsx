import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import AppLayout from "../../src/components/layout/AppLayout";
import {
  configPaths,
  IAtom,
  SVG_T,
  TUiNumberStorage,
} from "../../src/config/globals";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { initializeApp } from "../../src/libs/helpersInitialize";
import { getRelatedItemsForItemsShuffleSized } from "../../src/libs/helpersRelated";
import { getKnowbookAtomsList } from "../../src/libs/helpersSavedKnowbooks";
import { useStores } from "../../src/stores/RootStoreHook";
import ContentLoading from "../../src/components/ContentLoading";
import SVGItem from "../../src/components/SVGItem";
import SVGKnowbook from "../../src/components/SVGKnowbook";
import SVGElementsInCircleWithSlider from "../../src/components/SVGElementsInCircleWithSlider";
import SVGKnowbookExternalShape from "../../src/components/SVGKnowbookExternalShape";

const Knowbook: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  const router = useRouter();
  const selected_knowbook = router.query.nameOrPeriod as string;
  if (stores.knowbookStore.knowbooks.get(selected_knowbook) === undefined) {
    return <ContentLoading stores={stores} />;
  }

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const pathTarget = configPaths.pages.Home;
  const amount_related_displayed =
    GUI_CONFIG.display.display.amount_related_displayed;

  const items: IAtom[] = getKnowbookAtomsList(selected_knowbook, stores);

  const related_items = getRelatedItemsForItemsShuffleSized(
    stores,
    getKnowbookAtomsList(selected_knowbook, stores).map((item: IAtom) => {
      return item.id;
    }),
    amount_related_displayed
  );

  const root_element: any = (
    <SVGKnowbook
      stores={stores}
      id={selected_knowbook}
      title={selected_knowbook}
      image_url={stores.knowbookStore.getImageKnowbook(selected_knowbook)}
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
    <AppLayout stores={stores} titleSEO={selected_knowbook} isBodySVG={true}>
      <SVGKnowbookExternalShape
        size={
          stores.uiStore.getUiNumberStorage(TUiNumberStorage.R0) * 2 +
          stores.baseStore.GUI_CONFIG.display.atom_sizes.height
        }
      />
      <SVGElementsInCircleWithSlider
        stores={stores}
        id="Notebook"
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

export default observer(Knowbook);
