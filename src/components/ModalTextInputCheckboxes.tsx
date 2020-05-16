import { observer } from "mobx-react";
import { Box, TextField, IconButton, Modal } from "gestalt";
import { AtomID } from "../types";
import { USER_DISPLAY } from "../config";
import { JsCheckbox, JsText } from "./js_components";

export interface ICheckboxes {
  label: string;
  activated: boolean;
}

interface IModalTextInputCheckboxesProps {
  id: AtomID;
  title: string;
  input_placeholder: string;
  checkboxes: ICheckboxes[];
  handler_confirm: any;
  handler_cancel: any;
  handler_inputValue: any;
  handler_inputTags: any;
}

// const dim = 2 * USER_DISPLAY.card_dim;
const title_card_size = USER_DISPLAY.title_card_size;
const modal_dim = 1.5 * USER_DISPLAY.card_dim;

const ModalTextInputCheckboxes: React.FunctionComponent<IModalTextInputCheckboxesProps> = (
  props
) => {
  return (
    <Modal
      accessibilityModalLabel={props.title}
      onDismiss={() => {}}
      size={modal_dim}
    >
      <Box
        color="white"
        // display="flex"
        // direction="column"
        // justifyContent="between"
        // alignItems="center"
        //borderSize="lg"
        rounding={3}
        padding={2}
        //minWidth={dim / 1.5}
        //maxWidth={dim}
      >
        <Box padding={1}>
          <JsText align="center" size={title_card_size} weight="bold">
            {props.title}
          </JsText>
        </Box>

        <Box padding={1}>
          <TextField
            id={props.id}
            onChange={props.handler_inputValue}
            placeholder={props.input_placeholder}
            type="text"
            size="md"
          />
        </Box>

        <Box padding={1}>
          {props.checkboxes.map((item) => {
            return (
              <Box padding={2} key={item.label}>
                <JsCheckbox
                  id={item.label}
                  checked={item.activated}
                  size="sm"
                  label={item.label}
                  onChange={props.handler_inputTags(item.label)}
                />
              </Box>
            );
          })}
        </Box>

        <Box padding={1} display="flex" direction="row" justifyContent="around">
          <IconButton
            accessibilityLabel="ok"
            icon="cancel"
            bgColor="transparent"
            iconColor="darkGray"
            size="md"
            onClick={props.handler_cancel}
          />{" "}
          <IconButton
            accessibilityLabel="ok"
            icon="check-circle"
            bgColor="transparent"
            iconColor="darkGray"
            size="md"
            onClick={props.handler_confirm(props.id)}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default observer(ModalTextInputCheckboxes);
