import { observer } from "mobx-react-lite";
import { Box, TextField, Button, Text } from "gestalt";
import {
  ColorT,
  eventT,
  handlerT,
  RoundingT,
  SizeT,
  TUiStringStorage,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import React from "react";
import Link from "next/link";
import { configGeneral, configPaths } from "../config/globals";

const display_username = "none";
function getUserNameDisplay(): string {
  return display_username;
}

interface IFormLoginSignupProps {
  stores: IStores;
  placeholder_email: string;
  placeholder_password: string;
  missing_password_text: string;
  label_login: string;
  label_signup: string;
  handler_text: handlerT;
  handler_button: handlerT;
}

const FormLoginSignup: React.FunctionComponent<IFormLoginSignupProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const texfield_size: SizeT = GUI_CONFIG.display.dialogs.field_text_size;
  const size_button: SizeT = GUI_CONFIG.display.size_button_generic;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_form;
  const color_dialog: ColorT = configGeneral.colors.dialog;
  const text_size = GUI_CONFIG.display.size_text_generic as any;
  const button_color = configGeneral.colors.button_color_default as any;

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
          <TextField
            id="email"
            placeholder={props.placeholder_email}
            errorMessage={props.stores.uiStore.getUiStringStorage(
              TUiStringStorage.loginScreenError
            )}
            onChange={props.handler_text("email")}
            type="email"
            autoComplete="off"
            size={texfield_size}
          />
        </Box>
        <Box display={getUserNameDisplay() as any}>
          <Box padding={1}>
            <TextField
              id="username*"
              errorMessage={props.stores.uiStore.getUiStringStorage(
                TUiStringStorage.loginScreenUsername_
              )}
              label="username*"
              onChange={(input: { event: eventT; value: string }): void => {
                props.stores.uiStore.setUiStringStorage(
                  TUiStringStorage.loginScreenUsername_,
                  input.value
                );
              }}
              type="text"
              autoComplete="off"
              size={texfield_size}
            />
          </Box>
        </Box>
        <Box padding={1}>
          <TextField
            id="password"
            placeholder={props.placeholder_password}
            onChange={props.handler_text("password")}
            type="password"
            autoComplete="off"
            size={texfield_size}
          />
        </Box>
        <Box padding={2}>
          <Link
            prefetch={false}
            href={{
              pathname: configPaths.rootPath + configPaths.pages.ChangePassword,
              query: { ...props.stores.baseStore.paramsPage },
            }}
            passHref
          >
            <Text align="end" size={text_size} weight="bold">
              {props.missing_password_text}
            </Text>
          </Link>
        </Box>
      </Box>

      <Box padding={1} display="flex" direction="row" justifyContent="around">
        <Box paddingX={1}>
          <Button
            accessibilityLabel="signup"
            text={props.label_signup}
            size={size_button}
            onClick={props.handler_button("signup")}
            color={button_color}
            fullWidth
          />
        </Box>
        <Box paddingX={1}>
          <Button
            accessibilityLabel="login"
            text={props.label_login}
            size={size_button}
            onClick={props.handler_button("login")}
            color={button_color}
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  );
};

export default observer(FormLoginSignup);
