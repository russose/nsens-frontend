import { observer } from "mobx-react-lite";
import { Box, TextField, Button } from "gestalt";
import {
  ColorT,
  handlerT,
  RoundingT,
  SizeT,
  TUiStringStorage,
  configGeneral,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import React from "react";

interface IProps {
  stores: IStores;
  placeholder_username: string;
  placeholder_password: string;
  placeholder_validationCode: string;
  label_sendValidationCode: string;
  label_changePassword: string;
  handler_text: handlerT;
  handler_button: handlerT;
  value_username: string | undefined;
}

const DialogChangePassword: React.FunctionComponent<IProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const texfield_size: SizeT = GUI_CONFIG.display.dialogs.texfield_size;
  const button_icon_size: SizeT = GUI_CONFIG.display.dialogs.button_icon_size;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;
  const color_dialog: ColorT = configGeneral.colors.dialog;

  const value_username_provided =
    props.value_username !== undefined ? true : false;

  return (
    <Box
      rounding={rounding}
      borderStyle="shadow"
      padding={1}
      color={color_dialog}
    >
      <Box
        padding={0}
        display="flex"
        direction="column"
        justifyContent="around"
      >
        <Box padding={1}>
          {value_username_provided ? (
            <TextField
              id="newPassword_username"
              disabled={true}
              value={props.value_username}
              placeholder={props.placeholder_username}
              errorMessage={props.stores.uiStore.getUiStringStorage(
                TUiStringStorage.changePasswordError
              )}
              onChange={props.handler_text("username")}
              type="email"
              size={texfield_size}
            />
          ) : (
            <TextField
              id="newPassword_username"
              placeholder={props.placeholder_username}
              errorMessage={props.stores.uiStore.getUiStringStorage(
                TUiStringStorage.changePasswordError
              )}
              onChange={props.handler_text("username")}
              type="email"
              size={texfield_size}
            />
          )}
        </Box>

        <Box padding={1}>
          <TextField
            id="newPassword_password"
            placeholder={props.placeholder_password}
            onChange={props.handler_text("password")}
            type="password"
            size={texfield_size}
          />
        </Box>
        <Box padding={1}>
          <TextField
            id="newPassword_validationCode"
            placeholder={props.placeholder_validationCode}
            onChange={props.handler_text("validationCode")}
            type="text"
            size={texfield_size}
          />
        </Box>
      </Box>

      <Box padding={1} display="flex" direction="row" justifyContent="around">
        <Box paddingX={1}>
          <Button
            accessibilityLabel="sendValidationCode"
            text={props.label_sendValidationCode}
            size={button_icon_size}
            onClick={props.handler_button("sendValidationCode")}
            color="blue"
            fullWidth
          />
        </Box>
        <Box paddingX={1}>
          <Button
            accessibilityLabel="changePassword"
            text={props.label_changePassword}
            size={button_icon_size}
            onClick={props.handler_button("changePassword")}
            color="red"
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  );
};

export default observer(DialogChangePassword);
