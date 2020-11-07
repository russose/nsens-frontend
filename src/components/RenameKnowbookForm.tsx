import { observer } from "mobx-react-lite";
import { Box, TextField, Button, Modal } from "gestalt";
import { JsText } from "./js_components";

interface IRenameKnowbooksFormProps {
  title: string;
  value: string;
  label_rename: string;
  label_cancel: string;
  handler_rename: any;
  handler_cancel:any
  handler_inputValue: any;
}

const title_size = "md";

const RenameKnowbookForm: React.FunctionComponent<IRenameKnowbooksFormProps> = (
  props
) => {
  return (
    <Modal accessibilityModalLabel={props.title} onDismiss={props.handler_cancel}>
      <Box color="white" rounding={3} padding={2}>
        <Box padding={1}>
          <JsText align="center" size={title_size} weight="bold">
            {props.title}
          </JsText>
        </Box>

        <Box padding={1}>
          <TextField
            id="Rename Input Value"
            onChange={props.handler_inputValue}
            value={props.value}
            // placeholder={props.input_placeholder}
            type="text"
            size="md"
          />
        </Box>

        <Box padding={1} display="flex" direction="row" justifyContent="around">
          <Button
            accessibilityLabel="rename knowbook"
            text={props.label_rename}
            size="sm"
            onClick={props.handler_rename}
            inline
          />
          <Button
            accessibilityLabel="cancel"
            text={props.label_cancel}
            size="sm"
            onClick={props.handler_cancel}
            inline
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default observer(RenameKnowbookForm);
