import { observer } from "mobx-react";
import { useStores } from "../../src/states/_RootStore";
import { useRouter } from "next/router";
import MobileKnowbookLayout from "../../src/components/layout/MobileKnowbookLayout";
import { NextPage } from "next";
import {
  onEditKnowbooks,
  onSaved,
  isItemSaved,
  isItemSavedActivated,
} from "../../src/_handlers";
import { Box } from "gestalt";
import AtomCardGridGeneric from "../../src/components/AtomCardGridGeneric";
import ModalEditKnowbooks from "../../src/components/ModalEditKnowbooks";

const Knowbook: React.FunctionComponent = (props) => {
  const { dataStore, uiStore } = useStores();

  const router = useRouter();
  let selected_knowbook = router.query.k as string;

  return (
    <Box>
      <AtomCardGridGeneric
        atoms={dataStore.getKnowbookAtomsList(selected_knowbook)}
        isItemSaved_handler={isItemSaved(dataStore)}
        isItemSavedActivated_handler={isItemSavedActivated(dataStore)}
        saved_handler={onSaved(dataStore)}
        edit_handler={onEditKnowbooks(uiStore, dataStore)}
      />
      <ModalEditKnowbooks />
    </Box>
  );
};

(Knowbook as any).getLayoutMobile = (page: NextPage) => (
  <MobileKnowbookLayout>{page}</MobileKnowbookLayout>
);

export default observer(Knowbook);
