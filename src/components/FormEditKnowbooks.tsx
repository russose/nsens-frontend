import { Box, Checkbox, TextField } from "gestalt";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { AtomID, KnowbookID, SizeT, eventT, handlerT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import DialogPanel from "./DialogPanel";

interface ICheckboxes {
  // label: string;
  id: KnowbookID;
  activated: boolean;
}

interface IDialogEditKnowbooksFormProps {
  id: AtomID;
  stores: IStores;
  handler_confirm: handlerT;
  handler_inputTags: handlerT;
}

const FormEditKnowbooks: React.FunctionComponent<
  IDialogEditKnowbooksFormProps
> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const texfield_size: SizeT = GUI_CONFIG.display.dialogs.field_text_size;
  const item_checkbox_size: SizeT =
    GUI_CONFIG.display.dialogs.item_checkbox_size;

  const title = GUI_CONFIG.language.editKnowbook.title;
  const input_placeholder = GUI_CONFIG.language.editKnowbook.input_placeholder;

  const [newKnowbook, setNewKnowbook] = useState("");

  const checkboxes: ICheckboxes[] = Array.from(
    props.stores.uiStore.editKnowbookMembers
  )
    .sort()
    .map(([key, value]) => {
      return { id: key, activated: value };
      // return { label: key, activated: value };
      // console.log(id);
      // console.log(props.stores.knowbookStore.getKnowbookFromId(id));
      // return {
      //   label: props.stores.knowbookStore.getKnowbookFromId(id).name,
      //   activated: value,
      // };
    });

  const onChangeNewKnowbook = (input: {
    value: string;
    syntheticEvent: eventT;
  }): void => {
    setNewKnowbook(input.value);
  };

  return (
    <DialogPanel
      stores={props.stores}
      heading={title + props.stores.baseStore.getHistoryItem(props.id).title}
      onDismiss={props.handler_confirm(props.id, newKnowbook)}
    >
      {/* <Box rounding={rounding} padding={0}> */}
      <Box padding={0}>
        <Box padding={1}>
          <TextField
            id={props.id}
            // onChange={props.handler_inputValue}
            onChange={onChangeNewKnowbook as any}
            placeholder={input_placeholder}
            type="text"
            autoComplete="off"
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
          {checkboxes.map((item) => {
            const knowbookName = props.stores.knowbookStore.getKnowbookFromId(
              item.id
            ).name;
            return (
              <Box padding={2} key={item.id}>
                <Checkbox
                  id={item.id.toString()}
                  checked={item.activated}
                  size={item_checkbox_size}
                  label={knowbookName}
                  onChange={props.handler_inputTags(item.id)}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </DialogPanel>
  );
};

export default observer(FormEditKnowbooks);
