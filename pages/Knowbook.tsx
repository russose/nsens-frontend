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
    dataStore,
    uiStore,
    graphStore,
    userStore,
    knowbookStore,
  } = useStores();

  const router = useRouter();
  let selected_knowbook = router.query.title as string;

  return (
    <Box>
      <CardAtomGrid
        atoms={knowbookStore.getKnowbookAtomsList(selected_knowbook, dataStore)}
        isItemSaved_handler={isItemSaved(dataStore)}
        isItemSavedActionable_handler={isItemSavedActivated(knowbookStore)}
        saved_handler={onSaved(dataStore, graphStore, userStore, knowbookStore)}
        edit_handler={onEditKnowbooks(uiStore, knowbookStore)}
      />
      <EditKnowbooks />
    </Box>
  );
};

export default observer(Knowbook);
