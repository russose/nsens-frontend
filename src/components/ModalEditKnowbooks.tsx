import ModalTextInputCheckboxes from "./ModalTextInputCheckboxes";
import { observer } from "mobx-react";
import { useStores } from "../states/_RootStore";
import {
  onCancelEditKnowbooks,
  onSubmitChangesEditKnowbooks,
  onChangeInputValueEditKnowbooks,
  onChangeKnwobooksInclusionEditKnowbooks,
} from "../_handlers";
import { Box } from "gestalt";

const ModalEditKnowbooks: React.FunctionComponent = (props) => {
  const { dataStore, uiStore } = useStores();
  return (
    <Box>
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
      )}{" "}
    </Box>
  );
};

export default observer(ModalEditKnowbooks);
