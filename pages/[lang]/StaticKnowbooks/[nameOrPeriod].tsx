import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import SEOHeaderTitle from "../../../src/components/SEOHeaderTitle";
import KnowbookNotLogged from "../../../src/components/KnowbookNotLogged";
import AppLayout from "../../../src/components/layout/AppLayout";
import { IAtom } from "../../../src/config/globals";
import {
  IPageStaticKnowbooks,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataStaticKnowbooks";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import { useStores } from "../../../src/stores/RootStoreHook";
import { getRelatedItemsForItemsShuffleSized_Static } from "../../../src/libs/helpersRelated";

const KnowbookLoggedDynamic = dynamic(
  () => import("../../../src/components/KnowbookLogged")
);

const BestKnowbook: React.FunctionComponent<IPageStaticKnowbooks> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  if (
    stores.baseStore.initCompleted.core !== true ||
    stores.baseStore.initCompleted.staticKnowbooks !== true
  ) {
    //Not yet initialyzed
    return <></>;
  }

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const name_display = props.name_display;
  let items: IAtom[];
  if (
    stores.knowbookStore.staticKnowbooks.get(props.nameOrPeriod) !== undefined
  ) {
    items = stores.knowbookStore.staticKnowbooks.get(props.nameOrPeriod).items;
  } else {
    items = [];
  }

  const amount_item_displayed =
    GUI_CONFIG.display.display.amount_item_displayed;

  const related_items = getRelatedItemsForItemsShuffleSized_Static(
    stores,
    items,
    amount_item_displayed
  );

  let content;
  if (!stores.baseStore.isLogged) {
    content = (
      <>
        <KnowbookNotLogged
          stores={stores}
          items={items}
          related_items={related_items}
          static={true}
        />
      </>
    );
  } else {
    content = (
      <>
        <KnowbookLoggedDynamic
          stores={stores}
          items={items}
          related_items={related_items}
          static={true}
        />
      </>
    );
  }

  return (
    <AppLayout stores={stores}>
      <SEOHeaderTitle stores={stores} title={name_display} />
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

export default observer(BestKnowbook);
