import { Box, TextField, Checkbox, Sheet } from "gestalt";
import { observer } from "mobx-react-lite";
import { AtomID, handlerT, RoundingT, SizeT } from "../config/globals";
import React from "react";
import { IStores } from "../stores/RootStore";

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
  handler_inputValue: handlerT;
  handler_inputTags: handlerT;
}

const DialogEditKnowbooksForm: React.FunctionComponent<
  IDialogEditKnowbooksFormProps
> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const texfield_size: SizeT = GUI_CONFIG.display.dialogs.texfield_size;
  const item_checkbox_size: SizeT =
    GUI_CONFIG.display.dialogs.item_checkbox_size;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;

  return (
    <Sheet
      accessibilityDismissButtonLabel={props.title}
      accessibilitySheetLabel="Edit Knowbook"
      heading={
        props.title +
        ": " +
        props.stores.baseStore.getHistoryItem(props.id).title
      }
      // onDismiss={props.handler_cancel}
      onDismiss={props.handler_confirm(props.id)}
      // footer={validation}
      size="md"
    >
      <Box rounding={rounding} padding={0}>
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
          padding={1}
          display="flex"
          direction="column"
          // height="30vh"
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
      </Box>
    </Sheet>
  );
};

export default observer(DialogEditKnowbooksForm);
