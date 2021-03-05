import { Box, Heading } from "gestalt";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import CardAtomGrid from "../../../src/components/CardAtomGrid";
import Separator from "../../../src/components/Separator";
import {
  isItemSaved,
  isItemSavedActivated,
  onEditKnowbooks,
  onSaved,
} from "../../../src/handlers";
import { useStores } from "../../../src/stores/_RootStoreHook";
import React from "react";
import { displayCompactedGridCondition } from "../../../src/libs/utils";
import { IPage } from "../../../src/libs/utilsConfigGui";
import { GetStaticPaths, GetStaticProps } from "next";
import AppLayout from "../../../src/components/layout/AppLayout";
import {
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/utilsConfigGui";
import HeaderTitle from "../../../src/components/HeaderTitle";

const Knowbook: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG);

  const Related_title = GUI_CONFIG.language.knowbooks.Related_title;
  const amount_item_displayed = GUI_CONFIG.display.amount_item_displayed;

  const router = useRouter();
  const selected_knowbook = router.query.title as string;

  return (
    <AppLayout>
      <HeaderTitle stores={stores} title={selected_knowbook} />
      <CardAtomGrid
        id="knowbooks"
        stores={stores}
        atoms={stores.knowbookStore.getKnowbookAtomsList(
          selected_knowbook,
          stores.savedStore
        )}
        isItemSaved_handler={isItemSaved(stores.savedStore)}
        isItemSavedActionable_handler={isItemSavedActivated(
          stores.knowbookStore
        )}
        saved_handler={onSaved(stores)}
        edit_handler={onEditKnowbooks(stores.uiStore, stores.knowbookStore)}
        compact={displayCompactedGridCondition(GUI_CONFIG.id)}
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
            .getKnowbookAtomsList(selected_knowbook, stores.savedStore)
            .map((item) => {
              return item.id;
            }),
          amount_item_displayed
        )}
        isItemSaved_handler={isItemSaved(stores.savedStore)}
        isItemSavedActionable_handler={isItemSavedActivated(
          stores.knowbookStore
        )}
        saved_handler={onSaved(stores)}
        edit_handler={onEditKnowbooks(stores.uiStore, stores.knowbookStore)}
        compact={false}
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
