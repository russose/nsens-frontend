import { observer } from "mobx-react-lite";
import React from "react";
import CardAtomGrid from "../src/components/CardAtomGrid";
import {
  isItemSaved,
  isItemSavedActivated,
  onEditKnowbooks,
  onSaved,
} from "../src/handlers";
import { useStores } from "../src/stores/_RootStoreHook";

const KnowbookSpecialSaved: React.FunctionComponent = (props) => {
  const stores = useStores();

  return (
    <CardAtomGrid
      id="Saved"
      atoms={Array.from(stores.savedStore.saved.values())}
      isItemSaved_handler={isItemSaved(stores.savedStore)}
      isItemSavedActionable_handler={isItemSavedActivated(stores.knowbookStore)}
      saved_handler={onSaved(stores)}
      edit_handler={onEditKnowbooks(stores.uiStore, stores.knowbookStore)}
      compact={false}
    />
  );
};

export default observer(KnowbookSpecialSaved);
