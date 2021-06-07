import { observer } from "mobx-react-lite";
import { Box, TextField, Button, Text } from "gestalt";
import { ColorT, eventT, handlerT, RoundingT, SizeT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { getUserNameDisplay } from "../libs/utils";
import React from "react";
import Link from "next/link";
import { configGeneral, configPaths } from "../config/globals";

interface IFormLoginSignupProps {
  stores: IStores;
  placeholder_username: string;
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
  const texfield_size: SizeT = GUI_CONFIG.display.dialogs.texfield_size;
  const button_icon_size: SizeT = GUI_CONFIG.display.dialogs.button_icon_size;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;
  const color_dialog: ColorT = configGeneral.colors.dialog;

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
            id="username"
            placeholder={props.placeholder_username}
            errorMessage={props.stores.uiStore.loginScreenError}
            onChange={props.handler_text("username")}
            type="email"
            size={texfield_size}
          />
        </Box>
        <Box display={getUserNameDisplay() as any}>
          <Box padding={1}>
            <TextField
              id="username*"
              errorMessage={props.stores.uiStore.loginScreenUsername_}
              label="username*"
              onChange={(input: { event: eventT; value: string }): void => {
                props.stores.uiStore.setLoginScreenUsername_(input.value);
              }}
              type="text"
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
            <a>
              <Text align="right" size="sm" weight="bold">
                {props.missing_password_text}
              </Text>
            </a>
          </Link>
        </Box>
      </Box>

      <Box padding={1} display="flex" direction="row" justifyContent="around">
        <Box paddingX={1}>
          <Button
            accessibilityLabel="signup"
            text={props.label_signup}
            size={button_icon_size}
            onClick={props.handler_button("signup")}
            color="red"
            // color="gray"
            inline
          />
        </Box>
        <Box paddingX={1}>
          <Button
            accessibilityLabel="login"
            text={props.label_login}
            size={button_icon_size}
            onClick={props.handler_button("login")}
            color="blue"
            // color="gray"
            inline
          />
        </Box>
      </Box>
    </Box>
  );
};

export default observer(FormLoginSignup);
