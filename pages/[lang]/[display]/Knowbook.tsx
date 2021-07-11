import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import HeaderTitle from "../../../src/components/HeaderTitle";
import KnowbookLogged from "../../../src/components/KnowbookLogged";
import AppLayout from "../../../src/components/layout/AppLayout";
import { IAtom } from "../../../src/config/globals";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";
import {
  initializeApp,
  initializeKnowbooks,
} from "../../../src/libs/helpersInitialize";
import { getRelatedItemsForItems } from "../../../src/libs/helpersRelated";
import { getKnowbookAtomsList } from "../../../src/libs/helpersSavedKnowbooks";
import { useStores } from "../../../src/stores/RootStoreHook";

const Knowbook: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  initializeKnowbooks(stores);
  if (stores.baseStore.GUI_CONFIG === undefined) {
    //Not yet initialyzed
    return <></>;
  }

  const router = useRouter();
  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const amount_item_displayed = GUI_CONFIG.display.amount_item_displayed;
  const selected_knowbook = router.query.title as string;

  // const content = (
  //   <>
  //     <CardAtomGrid
  //       id="knowbooks"
  //       stores={stores}
  //       atoms={getKnowbookAtomsList(selected_knowbook, stores)}
  //       isItemSaved_handler={isItemSaved(stores)}
  //       isItemSavedActionable_handler={isItemSavedActivated(stores)}
  //       saved_handler={onSaved(stores)}
  //       edit_handler={onEditKnowbooks(stores)}
  //     />
  //     <Separator with_line={false} />
  //     <Separator with_line={true} />
  //     <Box padding={3}>
  //       <Heading size="md">{Related_title}</Heading>
  //     </Box>
  //     {/* <Separator with_line={false} /> */}
  //     <CardAtomGrid
  //       id="knowbooks_related"
  //       stores={stores}
  //       atoms={getRelatedItemsForItems(
  //         stores,
  //         getKnowbookAtomsList(selected_knowbook, stores).map((item: IAtom) => {
  //           return item.id;
  //         }),
  //         amount_item_displayed
  //       )}
  //       isItemSaved_handler={isItemSaved(stores)}
  //       isItemSavedActionable_handler={isItemSavedActivated(stores)}
  //       saved_handler={onSaved(stores)}
  //       edit_handler={onEditKnowbooks(stores)}
  //     />
  //   </>
  // );

  return (
    <AppLayout stores={stores}>
      <HeaderTitle stores={stores} title={selected_knowbook} />
      <KnowbookLogged
        stores={stores}
        items={getKnowbookAtomsList(selected_knowbook, stores)}
        related_items={getRelatedItemsForItems(
          stores,
          getKnowbookAtomsList(selected_knowbook, stores).map((item: IAtom) => {
            return item.id;
          }),
          amount_item_displayed
        )}
        static={false}
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
