import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { USER_GUI_CONFIG } from "../src/common/config";
import CardAtomGrid from "../src/components/CardAtomGrid";
import { JsText } from "../src/components/_js_components";
import Separator from "../src/components/Separator";
import {
  isItemSaved,
  isItemSavedActivated,
  onEditKnowbooks,
  onSaved,
} from "../src/handlers";
import { useStores } from "../src/stores/_RootStoreHook";

const Related_title = USER_GUI_CONFIG.knowbooks.Related_title;

const Knowbook: React.FunctionComponent = (props) => {
  const {
    savedStore,
    uiStore,
    userStore,
    knowbookStore,
    feedStore,
  } = useStores();

  const router = useRouter();
  let selected_knowbook = router.query.title as string;

  return (
    <Box padding={3}>
      <CardAtomGrid
        id="knowbooks"
        atoms={knowbookStore.getKnowbookAtomsList(
          selected_knowbook,
          savedStore
        )}
        isItemSaved_handler={isItemSaved(savedStore)}
        isItemSavedActionable_handler={isItemSavedActivated(knowbookStore)}
        saved_handler={onSaved(savedStore, userStore, knowbookStore, feedStore)}
        edit_handler={onEditKnowbooks(uiStore, knowbookStore)}
        compact={false}
      />
      <Separator />
      <JsText weight="bold">{Related_title}</JsText>
      <CardAtomGrid
        id="knowbooks_related"
        atoms={feedStore.getRelatedItemsForItems(
          knowbookStore
            .getKnowbookAtomsList(selected_knowbook, savedStore)
            .map((item) => {
              return item.id;
            })
        )}
        isItemSaved_handler={isItemSaved(savedStore)}
        isItemSavedActionable_handler={isItemSavedActivated(knowbookStore)}
        saved_handler={onSaved(savedStore, userStore, knowbookStore, feedStore)}
        edit_handler={onEditKnowbooks(uiStore, knowbookStore)}
        compact={true}
      />
    </Box>
  );
};

export default observer(Knowbook);
