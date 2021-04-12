import { observer } from "mobx-react-lite";
import {
  onCancel,
  onChangeInputValueRenameKnowbook,
  onRenameKnowbook,
} from "../handlers/handlers_Knowbooks";
import { useStores } from "../stores/_RootStoreHook";
import DialogRenameKnowbookForm from "./DialogRenameKnowbookForm";

const DialogRenameKnowbooks: React.FunctionComponent = (props) => {
  const stores = useStores();
  const GUI_CONFIG = stores.userStore.GUI_CONFIG;
  return (
    <>
      {stores.uiStore.renameKnowbookOpened && (
        <DialogRenameKnowbookForm
          stores={stores}
          title={GUI_CONFIG.language.renameDeleteKnowbook.title}
          value={stores.uiStore.renameKnowbookNewName}
          label_rename={GUI_CONFIG.language.renameDeleteKnowbook.rename_label}
          label_cancel={GUI_CONFIG.language.renameDeleteKnowbook.cancel_label}
          handler_rename={onRenameKnowbook(
            stores.uiStore,
            stores.knowbookStore
          )}
          handler_cancel={onCancel(stores.uiStore)}
          handler_inputValue={onChangeInputValueRenameKnowbook(stores.uiStore)}
        />
      )}
    </>
  );
};

export default observer(DialogRenameKnowbooks);
