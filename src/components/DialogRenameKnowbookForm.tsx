import { Box, Button, Modal, TextField, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import { handlerT, RoundingT, SizeT } from "../config/globals";
import { IStores } from "../stores/RootStore";

interface IDialogRenameKnowbookFormProps {
  stores: IStores;
  title: string;
  value: string;
  label_rename: string;
  label_cancel: string;
  handler_rename: handlerT;
  handler_cancel: handlerT;
  handler_inputValue: handlerT;
}

const DialogRenameKnowbookForm: React.FunctionComponent<IDialogRenameKnowbookFormProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const title_size: SizeT = GUI_CONFIG.display.dialogs.title_size;
  const texfield_size: SizeT = GUI_CONFIG.display.dialogs.texfield_size;
  const button_icon_size: SizeT = GUI_CONFIG.display.dialogs.button_icon_size;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;

  return (
    <Modal
      accessibilityModalLabel={props.title}
      onDismiss={props.handler_cancel}
    >
      <Box rounding={rounding} padding={2}>
        <Box padding={1}>
          <Text align="center" size={title_size} weight="bold">
            {props.title}
          </Text>
        </Box>

        <Box padding={1}>
          <TextField
            id="Rename Input Value"
            onChange={props.handler_inputValue}
            value={props.value}
            // placeholder={props.input_placeholder}
            type="text"
            size={texfield_size}
          />
        </Box>

        <Box padding={1} display="flex" direction="row" justifyContent="around">
          <Button
            accessibilityLabel="cancel"
            text={props.label_cancel}
            size={button_icon_size}
            onClick={props.handler_cancel}
            inline
          />
          <Button
            accessibilityLabel="rename knowbook"
            text={props.label_rename}
            size={button_icon_size}
            onClick={props.handler_rename}
            inline
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default observer(DialogRenameKnowbookForm);
