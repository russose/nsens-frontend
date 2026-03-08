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
  placeholder_email: string;
  placeholder_password: string;
  placeholder_validationCode: string;
  label_sendValidationCode: string;
  label_changePassword: string;
  handler_text: handlerT;
  handler_button: handlerT;
  value_email: string | undefined;
}

const FormChangePassword: React.FunctionComponent<IProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const texfield_size: SizeT = GUI_CONFIG.display.dialogs.field_text_size;
  const size_button = GUI_CONFIG.display.size_button_generic as any;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_form;
  const color_dialog: ColorT = configGeneral.colors.dialog;

  const button_color = configGeneral.colors.button_color_default as any;

  const value_email_provided = props.value_email !== undefined ? true : false;

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
          {value_email_provided ? (
            <TextField
              id="newPassword_email"
              disabled={true}
              value={props.value_email}
              placeholder={props.placeholder_email}
              errorMessage={props.stores.uiStore.getUiStringStorage(
                TUiStringStorage.changePasswordError
              )}
              onChange={props.handler_text("email")}
              type="email"
              autoComplete="off"
              size={texfield_size}
            />
          ) : (
            <TextField
              id="newPassword_email"
              placeholder={props.placeholder_email}
              errorMessage={props.stores.uiStore.getUiStringStorage(
                TUiStringStorage.changePasswordError
              )}
              onChange={props.handler_text("email")}
              type="email"
              autoComplete="off"
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
            autoComplete="off"
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
            size={size_button}
            onClick={props.handler_button("sendValidationCode")}
            color={button_color}
            fullWidth
          />
        </Box>
        <Box paddingX={1}>
          <Button
            accessibilityLabel="changePassword"
            text={props.label_changePassword}
            size={size_button}
            onClick={props.handler_button("changePassword")}
            color={button_color}
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  );
};

export default observer(FormChangePassword);
