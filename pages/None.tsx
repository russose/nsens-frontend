import { observer } from "mobx-react";
import {
  onSaved,
  onEditKnowbooks,
  isItemSaved,
  isItemSavedActivated,
} from "../src/handlers";
import { useStores } from "../src/stores/_RootStore";
import { Box } from "gestalt";
import EditKnowbooks from "../src/components/EditKnowbooks";
import CardAtomGrid from "../src/components/CardAtomGrid";

const Saved: React.FunctionComponent = (props) => {
  const { dataStore, uiStore } = useStores();

  return (
    <Box>
      <CardAtomGrid
        atoms={dataStore.ItemsInNoKnowbook()}
        isItemSaved_handler={isItemSaved(dataStore)}
        isItemSavedActionable_handler={isItemSavedActivated(dataStore)}
        saved_handler={onSaved(dataStore)}
        edit_handler={onEditKnowbooks(uiStore, dataStore)}
      />
      <EditKnowbooks />
    </Box>
  );
};

export default observer(Saved);
