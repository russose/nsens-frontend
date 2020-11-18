import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import {
  onEditKnowbooks,
  onSaved,
  isItemSaved,
  isItemSavedActivated,
} from "../src/handlers";
import { Box } from "gestalt";
import EditKnowbooks from "../src/components/EditKnowbooks";
import CardAtomGrid from "../src/components/CardAtomGrid";
import { useStores } from "../src/stores/_RootStoreHook";

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
    </Box>
  );
};

export default observer(Knowbook);
