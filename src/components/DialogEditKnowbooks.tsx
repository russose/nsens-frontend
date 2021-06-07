import { observer } from "mobx-react-lite";
import {
  onCancel,
  onChangeInputValueEditKnowbooks,
  onChangeKnwobooksInclusionEditKnowbooks,
  onSubmitChangesEditKnowbooks,
} from "../handlers/handlers_Knowbooks";
import { IStores } from "../stores/RootStore";
import DialogEditKnowbooksForm from "./DialogEditKnowbooksForm";

interface IDialogEditKnowbooksProps {
  stores: IStores;
}

const DialogEditKnowbooks: React.FunctionComponent<IDialogEditKnowbooksProps> = (
  props
) => {
  const stores = props.stores;
  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;

  return (
    <>
      {stores.uiStore.editKnowbookOpened && (
        <DialogEditKnowbooksForm
          id={stores.uiStore.selectedAtom.id}
          stores={stores}
          title={GUI_CONFIG.language.editKnowbook.title}
          input_placeholder={GUI_CONFIG.language.editKnowbook.input_placeholder}
          checkboxes={Array.from(stores.uiStore.editKnowbookMembers)
            .sort()
            .map(([key, value]) => {
              return { label: key, activated: value };
            })}
          handler_cancel={onCancel(stores)}
          handler_confirm={onSubmitChangesEditKnowbooks(stores)}
          handler_inputValue={onChangeInputValueEditKnowbooks(stores)}
          handler_inputTags={onChangeKnwobooksInclusionEditKnowbooks(stores)}
        />
      )}
    </>
  );
};

export default observer(DialogEditKnowbooks);
