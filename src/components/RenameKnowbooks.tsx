import RenameKnowbookForm from "./RenameKnowbookForm";
import { observer } from "mobx-react-lite";
import { useStores } from "../stores/_RootStore";
import { Box } from "gestalt";
import { USER_GUI_CONFIG } from "../common/config";
import { onCancel, onChangeInputValueRenameKnowbook, onRenameKnowbook } from "../handlers";

const RenameKnowbooks: React.FunctionComponent = (props) => {
  const { dataStore, uiStore } = useStores();
  return (
    <Box>
      {uiStore.renameKnowbookOpened &&
        ( 
          <RenameKnowbookForm
            title={USER_GUI_CONFIG.renameDeleteKnowbook.title}
            value={uiStore.renameKnowbookNewName}
            label_rename={USER_GUI_CONFIG.renameDeleteKnowbook.rename_label}
            label_cancel={USER_GUI_CONFIG.renameDeleteKnowbook.cancel_label}
            handler_rename={onRenameKnowbook(uiStore, dataStore)}
            handler_cancel={onCancel(uiStore)}
            handler_inputValue={onChangeInputValueRenameKnowbook(uiStore)}
          />
        )}
    </Box>
  );
};

export default observer(RenameKnowbooks);
