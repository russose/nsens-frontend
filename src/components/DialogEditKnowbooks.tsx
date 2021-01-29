import { observer } from "mobx-react-lite";
import {
  onCancel,
  onChangeInputValueEditKnowbooks,
  onChangeKnwobooksInclusionEditKnowbooks,
  onSubmitChangesEditKnowbooks,
} from "../handlers";
import { useStores } from "../stores/_RootStoreHook";
import DialogEditKnowbooksForm from "./DialogEditKnowbooksForm";

const DialogEditKnowbooks: React.FunctionComponent = (props) => {
  const stores = useStores();
  const GUI_CONFIG = stores.userStore.GUI_CONFIG;

  return (
    <>
      {stores.uiStore.editKnowbookOpened && (
        <DialogEditKnowbooksForm
          id={stores.uiStore.selectedAtomId}
          stores={stores}
          title={GUI_CONFIG.language.editKnowbook.title}
          input_placeholder={GUI_CONFIG.language.editKnowbook.input_placeholder}
          checkboxes={Array.from(stores.uiStore.editKnowbookMembers)
            .sort()
            .map(([key, value]) => {
              return { label: key, activated: value };
            })}
          handler_cancel={onCancel(stores.uiStore)}
          handler_confirm={onSubmitChangesEditKnowbooks(
            stores.uiStore,
            stores.knowbookStore
          )}
          handler_inputValue={onChangeInputValueEditKnowbooks(stores.uiStore)}
          handler_inputTags={onChangeKnwobooksInclusionEditKnowbooks(
            stores.uiStore
          )}
        />
      )}
    </>
  );
};

export default observer(DialogEditKnowbooks);
