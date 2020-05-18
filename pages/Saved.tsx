import { observer } from "mobx-react";
import {
  onSaved,
  onEditKnowbooks,
  isItemSaved,
  isItemSavedActivated,
} from "../src/_handlers";
import { useStores } from "../src/states/_RootStore";
import { NextPage } from "next";
import { Box } from "gestalt";
import ModalEditKnowbooks from "../src/components/ModalEditKnowbooks";
import CardAtomGrid from "../src/components/CardAtomGrid";

const Saved: React.FunctionComponent = (props) => {
  const { dataStore, uiStore } = useStores();

  return (
    <Box>
      <CardAtomGrid
        atoms={Array.from(dataStore.saved.values())}
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
