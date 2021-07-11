import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import HeaderTitle from "../../../../src/components/HeaderTitle";
import KnowbookNotLogged from "../../../../src/components/KnowbookNotLogged";
import AppLayout from "../../../../src/components/layout/AppLayout";
import { IAtom } from "../../../../src/config/globals";
import {
  IPageStaticKnowbooks,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../../src/libs/getDataStaticKnowbooks";
import {
  initializeApp,
  initializeKnowbooks,
} from "../../../../src/libs/helpersInitialize";
import { readRelatedFromItem } from "../../../../src/libs/helpersRelated";
import {
  makeArrayFlat,
  shuffleSizedRemoveDoublesFilterIds,
} from "../../../../src/libs/utils";
import { useStores } from "../../../../src/stores/RootStoreHook";

const KnowbookLoggedDynamic = dynamic(
  () => import("../../../../src/components/KnowbookLogged")
);

function getRelatedItemsFromItems(
  items: IAtom[],
  amount_item_displayed: number
): IAtom[] {
  const itemIds_to_exclude = items.map((item) => {
    return item.id;
  });
  const related_list: IAtom[][] = items.map((item) => {
    return readRelatedFromItem(item).map((related) => {
      return related.item;
    });
  });
  const related_flat: IAtom[] = makeArrayFlat(related_list);

  const related_shuffledSized_no_doubles_array_filtered =
    shuffleSizedRemoveDoublesFilterIds(
      related_flat,
      itemIds_to_exclude,
      amount_item_displayed
    );
  return related_shuffledSized_no_doubles_array_filtered;
}

const BestKnowbook: React.FunctionComponent<IPageStaticKnowbooks> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  initializeKnowbooks(stores);
  if (stores.baseStore.GUI_CONFIG === undefined) {
    //Not yet initialyzed
    return <></>;
  }

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  // const items = props.items;
  const name_display = props.name_display;
  let items: IAtom[];
  if (
    stores.knowbookStore.staticKnowbooks.get(props.nameOrPeriod) !== undefined
  ) {
    items = stores.knowbookStore.staticKnowbooks.get(props.nameOrPeriod).items;
  } else {
    items = [];
  }

  const amount_item_displayed = GUI_CONFIG.display.amount_item_displayed;

  const related_items = getRelatedItemsFromItems(items, amount_item_displayed);

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
      <HeaderTitle stores={stores} title={name_display} />
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
