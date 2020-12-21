import { observer } from "mobx-react-lite";
import CardAtomGrid from "../src/components/CardAtomGrid";
import {
  isItemSaved,
  isItemSavedActivated,
  onEditKnowbooks,
  onSaved,
} from "../src/handlers";
import { useStores } from "../src/stores/_RootStoreHook";

const Saved: React.FunctionComponent = (props) => {
  const {
    savedStore,
    uiStore,
    userStore,
    knowbookStore,
    feedStore,
  } = useStores();

  return (
    <>
      <CardAtomGrid
        id="Saved"
        atoms={Array.from(savedStore.saved.values())}
        isItemSaved_handler={isItemSaved(savedStore)}
        isItemSavedActionable_handler={isItemSavedActivated(knowbookStore)}
        saved_handler={onSaved(savedStore, userStore, knowbookStore, feedStore)}
        edit_handler={onEditKnowbooks(uiStore, knowbookStore)}
      />
    </>
  );
};

export default observer(Saved);
