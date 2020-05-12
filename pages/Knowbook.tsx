import { observer } from "mobx-react";
import { useStores } from "../src/states/_RootStore";
import AtomCardGridSaved from "../src/components/AtomCardGridSaved";
import { useRouter } from "next/router";
import MobileKnowbookLayout from "../src/components/layout/MobileKnowbookLayout";
import { NextPage } from "next";
import {
  onCancelEditKnowbooks,
  onEditKnowbooks,
  onChangeInputValueEditKnowbooks,
  onChangeKnwobooksInclusionEditKnowbooks,
  onSubmitChangesEditKnowbooks,
} from "../src/_handlers";
import { Box } from "gestalt";
import ModalTextInputCheckboxes from "../src/components/ModalTextInputCheckboxes";

const Knowbook: React.FunctionComponent = (props) => {
  const { dataStore, uiStore } = useStores();

  const router = useRouter();
  let selected_knowbook = router.query.k as string;

  return (
    <Box>
      <AtomCardGridSaved
        atoms={dataStore.getKnowbookAtomsList(selected_knowbook)}
        edit_handler={onEditKnowbooks(uiStore, dataStore)}
      />

      {uiStore.editKnowbookOpened && (
        <ModalTextInputCheckboxes
          id={uiStore.selectedAtomId}
          title="Update Knowbooks"
          input_placeholder="new knowbook"
          checkboxes={Array.from(uiStore.knowbookEditionInclusion).map(
            ([key, value]) => {
              return { label: key, activated: value };
            }
          )}
          handler_cancel={onCancelEditKnowbooks(uiStore)}
          handler_confirm={onSubmitChangesEditKnowbooks(uiStore, dataStore)}
          handler_inputValue={onChangeInputValueEditKnowbooks(uiStore)}
          handler_inputTags={onChangeKnwobooksInclusionEditKnowbooks(uiStore)}
        />
      )}
    </Box>
  );
};

(Knowbook as any).getLayoutMobile = (page: NextPage) => (
  <MobileKnowbookLayout>{page}</MobileKnowbookLayout>
);

export default observer(Knowbook);
