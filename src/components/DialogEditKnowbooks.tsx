import { observer } from "mobx-react-lite";
import { GUI_CONFIG } from "../common/config";
import {
  onCancel,
  onChangeInputValueEditKnowbooks,
  onChangeKnwobooksInclusionEditKnowbooks,
  onSubmitChangesEditKnowbooks,
} from "../handlers";
import { useStores } from "../stores/_RootStoreHook";
import DialogEditKnowbooksForm from "./DialogEditKnowbooksForm";

const DialogEditKnowbooks: React.FunctionComponent = (props) => {
  const { knowbookStore, uiStore } = useStores();
  return (
    <>
      {uiStore.editKnowbookOpened && (
        <DialogEditKnowbooksForm
          id={uiStore.selectedAtomId}
          title={GUI_CONFIG.language.editKnowbook.title}
          input_placeholder={GUI_CONFIG.language.editKnowbook.input_placeholder}
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
  );
};

export default observer(DialogEditKnowbooks);
