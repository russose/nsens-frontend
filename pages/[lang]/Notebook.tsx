import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import AppLayout from "../../src/components/layout/AppLayout";
import { IAtom } from "../../src/config/globals";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { initializeApp } from "../../src/libs/helpersInitialize";
import { getKnowbookAtomsList } from "../../src/libs/helpersSavedKnowbooks";
import { useStores } from "../../src/stores/RootStoreHook";
import ContentLoading from "../../src/components/ContentLoading";
import HeaderTitle from "../../src/components/HeaderTitle";
import CardAtomGrid from "../../src/components/CardAtomGrid";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../../src/handlers/handlers_Saved";
import { onEditKnowbooks } from "../../src/handlers/handlers_Knowbooks";

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

  // const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  // const amount_related_displayed =
  //   GUI_CONFIG.display.display.amount_related_displayed;
  // const related_items = getRelatedItemsForItemsShuffleSized(
  //   stores,
  //   getKnowbookAtomsList(selected_knowbook, stores).map((item: IAtom) => {
  //     return item.id;
  //   }),
  //   amount_related_displayed
  // );

  const items: IAtom[] = getKnowbookAtomsList(selected_knowbook, stores);

  const content = (
    <>
      <HeaderTitle stores={stores} title={selected_knowbook} />
      <CardAtomGrid
        id={"Knowbook"}
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
    <AppLayout
      stores={stores}
      titleSEO={
        stores.baseStore.GUI_CONFIG.language.SEO.title_description.Knowbook
          .title +
        " " +
        selected_knowbook
      }
      isBodySVG={false}
    >
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

export default observer(Knowbook);
