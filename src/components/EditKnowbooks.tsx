import FormEditKnowbooks from "./EditKnowbooksForm";
import { observer } from "mobx-react";
import { useStores } from "../stores/_RootStore";
import {
  onCancelEditKnowbooks,
  onSubmitChangesEditKnowbooks,
  onChangeInputValueEditKnowbooks,
  onChangeKnwobooksInclusionEditKnowbooks,
} from "../handlers";
import { Box } from "gestalt";
import { USER_GUI_CONFIG } from "../srcCommon/config";

const EditKnowbooks: React.FunctionComponent = (props) => {
  const { dataStore, uiStore } = useStores();
  return (
    <Box>
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
          handler_cancel={onCancelEditKnowbooks(uiStore)}
          handler_confirm={onSubmitChangesEditKnowbooks(uiStore, dataStore)}
          handler_inputValue={onChangeInputValueEditKnowbooks(uiStore)}
          handler_inputTags={onChangeKnwobooksInclusionEditKnowbooks(uiStore)}
        />
      )}
    </Box>
  );
};

export default observer(EditKnowbooks);
