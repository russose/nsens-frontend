import { Box, IconButton, Modal, TextField, Text, Checkbox } from "gestalt";
import { observer } from "mobx-react-lite";
import { AtomID, handlerT, RoundingT, SizeT } from "../config/globals";
import React from "react";
import { IStores } from "../stores/RootStore";
import { configGeneral } from "../config/globals";

export interface ICheckboxes {
  label: string;
  activated: boolean;
}

interface IDialogEditKnowbooksFormProps {
  id: AtomID;
  stores: IStores;
  title: string;
  input_placeholder: string;
  checkboxes: ICheckboxes[];
  handler_confirm: handlerT;
  handler_cancel: handlerT;
  handler_inputValue: handlerT;
  handler_inputTags: handlerT;
}

const DialogEditKnowbooksForm: React.FunctionComponent<IDialogEditKnowbooksFormProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const title_size: SizeT = GUI_CONFIG.display.dialogs.title_size;
  const texfield_size: SizeT = GUI_CONFIG.display.dialogs.texfield_size;
  const item_checkbox_size: SizeT = GUI_CONFIG.display.dialogs.item_size;
  const button_icon_size: SizeT = GUI_CONFIG.display.dialogs.button_icon_size;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;

  return (
    <Modal
      accessibilityModalLabel={props.title}
      onDismiss={props.handler_cancel}
      size="sm"
    >
      <Box rounding={rounding} padding={2}>
        <Box padding={1}>
          <Text align="center" size={title_size} weight="bold">
            {props.title}
          </Text>
        </Box>

        <Box padding={1}>
          <TextField
            id={props.id}
            onChange={props.handler_inputValue}
            placeholder={props.input_placeholder}
            type="text"
            size={texfield_size}
          />
        </Box>

        <Box
          padding={0}
          display="flex"
          direction="column"
          height="30vh"
          // justifyContent="between"
          overflow="auto"
        >
          {props.checkboxes.map((item) => {
            return (
              <Box padding={2} key={item.label}>
                <Checkbox
                  id={item.label}
                  checked={item.activated}
                  size={item_checkbox_size}
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
            iconColor={configGeneral.colors.iconColorDefault as any}
            size={button_icon_size}
            onClick={props.handler_cancel}
          />
          <IconButton
            accessibilityLabel="ok"
            icon="check-circle"
            bgColor="transparent"
            iconColor={configGeneral.colors.iconColorDefault as any}
            size={button_icon_size}
            onClick={props.handler_confirm(props.id)}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default observer(DialogEditKnowbooksForm);
