import { Box, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { GUI_CONFIG } from "../src/common/config";
import CardAtomGrid from "../src/components/CardAtomGrid";
import Separator from "../src/components/Separator";
import {
  isItemSaved,
  isItemSavedActivated,
  onEditKnowbooks,
  onSaved,
} from "../src/handlers";
import { useStores } from "../src/stores/_RootStoreHook";
import React from "react";
import AppLayout from "../src/components/layout/AppLayout";

const Related_title = GUI_CONFIG.language.knowbooks.Related_title;

const Knowbook: React.FunctionComponent = (props) => {
  const stores = useStores();

  const router = useRouter();
  let selected_knowbook = router.query.title as string;

  return (
    <AppLayout>
      <Box padding={3}>
        <CardAtomGrid
          id="knowbooks"
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
          compact={false}
        />
        <Separator />
        <Text weight="bold">{Related_title}</Text>
        <CardAtomGrid
          id="knowbooks_related"
          atoms={stores.feedStore.getRelatedItemsForItems(
            stores.knowbookStore
              .getKnowbookAtomsList(selected_knowbook, stores.savedStore)
              .map((item) => {
                return item.id;
              })
          )}
          isItemSaved_handler={isItemSaved(stores.savedStore)}
          isItemSavedActionable_handler={isItemSavedActivated(
            stores.knowbookStore
          )}
          saved_handler={onSaved(stores)}
          edit_handler={onEditKnowbooks(stores.uiStore, stores.knowbookStore)}
          compact={true}
        />
      </Box>
    </AppLayout>
  );
};

export default observer(Knowbook);
