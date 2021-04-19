import { Box, Heading } from "gestalt";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import CardAtomGrid from "../../../src/components/CardAtomGrid";
import Separator from "../../../src/components/Separator";
import { useStores } from "../../../src/stores/_RootStoreHook";
import React from "react";
import { IPage } from "../../../src/libs/getConfigData";
import { GetStaticPaths, GetStaticProps } from "next";
import AppLayout from "../../../src/components/layout/AppLayout";
import {
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getConfigData";
import HeaderTitle from "../../../src/components/HeaderTitle";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../../../src/handlers/handlers_Saved";
import { onEditKnowbooks } from "../../../src/handlers/handlers_Knowbooks";
import { IAtom } from "../../../src/common/globals";

const Knowbook: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG);

  const Related_title = GUI_CONFIG.language.knowbooks.Related_title;
  const amount_item_displayed = GUI_CONFIG.display.amount_item_displayed;

  const router = useRouter();
  const selected_knowbook = router.query.title as string;

  return (
    <AppLayout stores={stores}>
      <HeaderTitle stores={stores} title={selected_knowbook} />
      <CardAtomGrid
        id="knowbooks"
        stores={stores}
        atoms={stores.knowbookStore.getKnowbookAtomsList(
          selected_knowbook,
          stores
        )}
        isItemSaved_handler={isItemSaved(stores)}
        isItemSavedActionable_handler={isItemSavedActivated(stores)}
        saved_handler={onSaved(stores)}
        edit_handler={onEditKnowbooks(stores)}
      />
      <Separator with_line={false} />
      <Separator with_line={true} />
      <Box padding={3}>
        <Heading size="md">{Related_title}</Heading>
      </Box>
      {/* <Separator with_line={false} /> */}
      <CardAtomGrid
        id="knowbooks_related"
        stores={stores}
        atoms={stores.feedStore.getRelatedItemsForItems(
          stores.knowbookStore
            .getKnowbookAtomsList(selected_knowbook, stores)
            .map((item: IAtom) => {
              return item.id;
            }),
          amount_item_displayed
        )}
        isItemSaved_handler={isItemSaved(stores)}
        isItemSavedActionable_handler={isItemSavedActivated(stores)}
        saved_handler={onSaved(stores)}
        edit_handler={onEditKnowbooks(stores)}
      />
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (constext) => {
  return await I_getStaticPaths(constext);
};

export default observer(Knowbook);
