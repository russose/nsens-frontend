import { Box, Button, Modal, TextField, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import { GUI_CONFIG } from "../common/config";

interface IDialogRenameKnowbookFormProps {
  title: string;
  value: string;
  label_rename: string;
  label_cancel: string;
  handler_rename: any;
  handler_cancel: any;
  handler_inputValue: any;
}

const DialogRenameKnowbookForm: React.FunctionComponent<IDialogRenameKnowbookFormProps> = (
  props
) => {
  const title_size: any = GUI_CONFIG.display.dialogs.title_size;
  const texfield_size: any = GUI_CONFIG.display.dialogs.texfield_size;
  const button_icon_size: any = GUI_CONFIG.display.dialogs.button_icon_size;
  return (
    <Modal
      accessibilityModalLabel={props.title}
      onDismiss={props.handler_cancel}
    >
      {/* <Box color="white" rounding={3} padding={2}> */}
      <Box rounding={3} padding={2}>
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
