import { observer } from "mobx-react-lite";
import { GUI_CONFIG } from "../common/config";
import {
  onCancel,
  onChangeInputValueRenameKnowbook,
  onRenameKnowbook,
} from "../handlers";
import { useStores } from "../stores/_RootStoreHook";
import DialogRenameKnowbookForm from "./DialogRenameKnowbookForm";

const DialogRenameKnowbooks: React.FunctionComponent = (props) => {
  const { knowbookStore, uiStore } = useStores();
  return (
    <>
      {uiStore.renameKnowbookOpened && (
        <DialogRenameKnowbookForm
          title={GUI_CONFIG.language.renameDeleteKnowbook.title}
          value={uiStore.renameKnowbookNewName}
          label_rename={GUI_CONFIG.language.renameDeleteKnowbook.rename_label}
          label_cancel={GUI_CONFIG.language.renameDeleteKnowbook.cancel_label}
          handler_rename={onRenameKnowbook(uiStore, knowbookStore)}
          handler_cancel={onCancel(uiStore)}
          handler_inputValue={onChangeInputValueRenameKnowbook(uiStore)}
        />
      )}
    </>
  );
};

export default observer(DialogRenameKnowbooks);
