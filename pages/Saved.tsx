import { observer } from "mobx-react-lite";
import {
  onSaved,
  onEditKnowbooks,
  isItemSaved,
  isItemSavedActivated,
} from "../src/handlers";
import { useStores } from "../src/stores/_RootStoreHook";
import { Box } from "gestalt";
import EditKnowbooks from "../src/components/EditKnowbooks";
import CardAtomGrid from "../src/components/CardAtomGrid";

const Saved: React.FunctionComponent = (props) => {
  const {
    savedStore,
    uiStore,
    graphStore,
    userStore,
    knowbookStore,
    feedStore,
  } = useStores();

  return (
    <Box>
      <CardAtomGrid
        atoms={Array.from(savedStore.saved.values())}
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
    </Box>
  );
};

export default observer(Saved);
