import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import {
  onEditKnowbooks,
  onSaved,
  isItemSaved,
  isItemSavedActivated,
} from "../src/handlers";
import { Box } from "gestalt";
import EditKnowbooks from "../src/components/EditKnowbooks";
import CardAtomGrid from "../src/components/CardAtomGrid";
import { useStores } from "../src/stores/_RootStore";

const Knowbook: React.FunctionComponent = (props) => {
  const { dataStore, uiStore } = useStores();

  const router = useRouter();
  let selected_knowbook = router.query.k as string;

  return (
    <Box>
      <CardAtomGrid
        atoms={dataStore.getKnowbookAtomsList(selected_knowbook)}
        isItemSaved_handler={isItemSaved(dataStore)}
        isItemSavedActionable_handler={isItemSavedActivated(dataStore)}
        saved_handler={onSaved(dataStore)}
        edit_handler={onEditKnowbooks(uiStore, dataStore)}
      />
      <EditKnowbooks />
    </Box>
  );
};

export default observer(Knowbook);
