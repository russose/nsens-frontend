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
import { displayCompactedGridCondition } from "../src/libs/utils";

const Knowbook: React.FunctionComponent = (props) => {
  const Related_title = GUI_CONFIG.language.knowbooks.Related_title;

  const stores = useStores();

  const router = useRouter();
  const selected_knowbook = router.query.title as string;

  return (
    <Box padding={1}>
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
        compact={displayCompactedGridCondition(stores)}
      />
      <Separator with_line={false} />
      <Separator with_line={true} />
      <Text weight="bold">{Related_title}</Text>
      <Separator with_line={false} />
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
  );
};

export default observer(Knowbook);
