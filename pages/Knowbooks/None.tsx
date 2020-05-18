import { observer } from "mobx-react";
import {
  onSaved,
  onEditKnowbooks,
  isItemSaved,
  isItemSavedActivated,
} from "../../src/_handlers";
import { useStores } from "../../src/states/_RootStore";
import { NextPage } from "next";
import MobileKnowbookLayout from "../../src/components/layout/MobileKnowbookLayout";
import { Box } from "gestalt";
import ModalEditKnowbooks from "../../src/components/ModalEditKnowbooks";
import CardAtomGrid from "../../src/components/CardAtomGrid";

const Saved: React.FunctionComponent = (props) => {
  const { dataStore, uiStore } = useStores();

  const AtomsInNoKnowbooks = Array.from(dataStore.saved.values()).filter(
    (atom) => {
      return atom.tags.length === 0;
    }
  );

  return (
    <Box>
      <CardAtomGrid
        atoms={AtomsInNoKnowbooks}
        isItemSaved_handler={isItemSaved(dataStore)}
        isItemSavedActivated_handler={isItemSavedActivated(dataStore)}
        saved_handler={onSaved(dataStore)}
        edit_handler={onEditKnowbooks(uiStore, dataStore)}
      />
      <ModalEditKnowbooks />
    </Box>
  );
};

// (Saved as any).getLayoutMobile = (page: NextPage) => (
//   <MobileKnowbookLayout>{page}</MobileKnowbookLayout>
// );

export default observer(Saved);
