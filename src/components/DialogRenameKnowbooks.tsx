import { observer } from "mobx-react-lite";
import { TUiStringStorage } from "../config/globals";
import {
  onCancel,
  onChangeInputValueRenameKnowbook,
  onRenameKnowbook,
} from "../handlers/handlers_Knowbooks";
import { IStores } from "../stores/RootStore";
import DialogRenameKnowbookForm from "./DialogRenameKnowbookForm";

interface IDialogRenameKnowbooksProps {
  stores: IStores;
}

const DialogRenameKnowbooks: React.FunctionComponent<
  IDialogRenameKnowbooksProps
> = (props) => {
  const stores = props.stores;
  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  return (
    <>
      {
        // stores.uiStore.getUiBooleanStorage(
        //   TUiBooleanStorage.renameKnowbookOpened
        // ) &&
        <DialogRenameKnowbookForm
          stores={stores}
          title={GUI_CONFIG.language.renameDeleteKnowbook.title}
          value={stores.uiStore.getUiStringStorage(
            TUiStringStorage.renameKnowbookNewName
          )}
          label_rename={GUI_CONFIG.language.renameDeleteKnowbook.rename_label}
          label_cancel={GUI_CONFIG.language.renameDeleteKnowbook.cancel_label}
          handler_rename={onRenameKnowbook(stores)}
          handler_cancel={onCancel(stores)}
          handler_inputValue={onChangeInputValueRenameKnowbook(stores)}
        />
      }
    </>
  );
};

export default observer(DialogRenameKnowbooks);
