import FormEditKnowbooks from "./EditKnowbooksForm";
import { observer } from "mobx-react-lite";
import { useStores } from "../stores/_RootStoreHook";
import {
  onSubmitChangesEditKnowbooks,
  onChangeInputValueEditKnowbooks,
  onChangeKnwobooksInclusionEditKnowbooks,
  onCancel,
} from "../handlers";
import { USER_GUI_CONFIG } from "../common/config";

const EditKnowbooks: React.FunctionComponent = (props) => {
  const { knowbookStore, uiStore } = useStores();
  return (
    // <Box>
    <>
      {uiStore.editKnowbookOpened && (
        <FormEditKnowbooks
          id={uiStore.selectedAtomId}
          title={USER_GUI_CONFIG.editKnowbook.title}
          input_placeholder={USER_GUI_CONFIG.editKnowbook.input_placeholder}
          checkboxes={Array.from(uiStore.editKnowbookMembers)
            .sort()
            .map(([key, value]) => {
              return { label: key, activated: value };
            })}
          handler_cancel={onCancel(uiStore)}
          handler_confirm={onSubmitChangesEditKnowbooks(uiStore, knowbookStore)}
          handler_inputValue={onChangeInputValueEditKnowbooks(uiStore)}
          handler_inputTags={onChangeKnwobooksInclusionEditKnowbooks(uiStore)}
        />
      )}
    </>
    // </Box>
  );
};

export default observer(EditKnowbooks);
