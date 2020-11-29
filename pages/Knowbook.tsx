import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import {
  onEditKnowbooks,
  onSaved,
  isItemSaved,
  isItemSavedActivated,
} from "../src/handlers";
import { Box, Divider } from "gestalt";
import { JsText } from "../src/components/js_components";
import EditKnowbooks from "../src/components/EditKnowbooks";
import CardAtomGrid from "../src/components/CardAtomGrid";
import { useStores } from "../src/stores/_RootStoreHook";
import { USER_GUI_CONFIG } from "../src/common/config";

const Related_title = USER_GUI_CONFIG.knowbooks.Related_title;

const Knowbook: React.FunctionComponent = (props) => {
  const {
    savedStore,
    uiStore,
    graphStore,
    userStore,
    knowbookStore,
    feedStore,
  } = useStores();

  const router = useRouter();
  let selected_knowbook = router.query.title as string;

  return (
    <Box>
      <CardAtomGrid
        atoms={knowbookStore.getKnowbookAtomsList(
          selected_knowbook,
          savedStore
        )}
        isItemSaved_handler={isItemSaved(savedStore)}
        isItemSavedActionable_handler={isItemSavedActivated(knowbookStore)}
        saved_handler={onSaved(
          savedStore,
          graphStore,
          userStore,
          knowbookStore,
          feedStore
        )}
        edit_handler={onEditKnowbooks(uiStore, knowbookStore)}
      />
      <EditKnowbooks />

      <Divider />
      <Box padding={1}></Box>
      <JsText weight="bold">{Related_title}</JsText>
      <CardAtomGrid
        atoms={knowbookStore.getKnowbookAtomsList(
          selected_knowbook,
          savedStore
        )}
        isItemSaved_handler={isItemSaved(savedStore)}
        isItemSavedActionable_handler={isItemSavedActivated(knowbookStore)}
        saved_handler={onSaved(
          savedStore,
          graphStore,
          userStore,
          knowbookStore,
          feedStore
        )}
        edit_handler={onEditKnowbooks(uiStore, knowbookStore)}
      />
    </Box>
  );
};

export default observer(Knowbook);
