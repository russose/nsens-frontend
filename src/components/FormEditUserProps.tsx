import { Box, TextField } from "gestalt";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { SizeT, eventT, handlerT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import DialogPanel from "./DialogPanel";

interface IProps {
  stores: IStores;
  button: any;
  handler_confirm: handlerT;
}

const FormEditUserProps: React.FunctionComponent<IProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const texfield_size: SizeT = GUI_CONFIG.display.dialogs.field_text_size;

  const heading = GUI_CONFIG.language.user.modification;
  const usernameLabel = GUI_CONFIG.language.editUserProps.username;
  const emailLabel = GUI_CONFIG.language.editUserProps.email;

  const [username, setUsername] = useState(
    props.stores.baseStore.user.username
  );
  const [email, setEmail] = useState(props.stores.baseStore.user.email);

  const onChangeUsername = (input: {
    value: string;
    syntheticEvent: eventT;
  }): void => {
    setUsername(input.value);
  };

  const onChangeEmail = (input: {
    value: string;
    syntheticEvent: eventT;
  }): void => {
    setEmail(input.value);
  };

  return (
    <DialogPanel
      stores={props.stores}
      heading={heading}
      onDismiss={props.handler_confirm(username, email)}
    >
      <Box padding={0}>
        <Box padding={2}>
          <TextField
            id={"Username"}
            label={usernameLabel}
            value={username}
            onChange={onChangeUsername as any}
            type="text"
            autoComplete="off"
            size={texfield_size}
          />
        </Box>

        <Box padding={2}>
          <TextField
            id={"email"}
            label={emailLabel}
            value={email}
            onChange={onChangeEmail as any}
            type="text"
            autoComplete="off"
            size={texfield_size}
          />
        </Box>

        <Box padding={8} />

        <Box padding={2}>{props.button}</Box>
      </Box>
    </DialogPanel>
  );
};

export default observer(FormEditUserProps);
