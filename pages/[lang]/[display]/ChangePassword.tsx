import { observer } from "mobx-react-lite";
import { useStores } from "../../../src/stores/RootStoreHook";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";
import { Box } from "gestalt";
import FormChangePassword from "../../../src/components/FormChangePassword";
import {
  onChangePassword_button,
  onChangePassword_text,
} from "../../../src/handlers/handlers_ChangePassword";
import HeaderTitle from "../../../src/components/HeaderTitle";
import HeaderSEO from "../../../src/components/HeaderSEO";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import AppLayout from "../../../src/components/layout/AppLayout";
import { TUiStringStorage } from "../../../src/config/globals";

const ChangePassword: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  initializeApp(stores, props.paramsPage, props.GUI_CONFIG);

  const GUI_CONFIG = props.GUI_CONFIG;
  const placeholder_username =
    GUI_CONFIG.language.user.loginSignup.username_placeholder;
  const password_placeholder =
    GUI_CONFIG.language.changePassword.password_placeholder;
  const placeholder_validationCode =
    GUI_CONFIG.language.changePassword.placeholder_validationCode;
  const label_sendValidationCode =
    GUI_CONFIG.language.changePassword.label_sendValidationCode;
  const label_changePassword =
    GUI_CONFIG.language.changePassword.label_changePassword;

  const isLogged = stores.baseStore.isLogged;

  stores.uiStore.setUiStringStorage(TUiStringStorage.changePasswordError, "");

  const height_elements = GUI_CONFIG.display.layout.heightChangePassword;

  let value_username = undefined;
  if (isLogged && stores.baseStore.user !== null) {
    value_username = stores.baseStore.user.username;
    stores.uiStore.setUiStringStorage(
      TUiStringStorage.changePasswordUsername,
      stores.baseStore.user.username
    );
  }

  const changePasswordForm = (
    <Box
      height={height_elements}
      padding={1}
      column={12}
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="end"
      overflow="hidden"
    >
      <Box padding={2} column={12} smColumn={10} mdColumn={8} lgColumn={4}>
        <FormChangePassword
          stores={stores}
          placeholder_username={placeholder_username}
          placeholder_password={password_placeholder}
          placeholder_validationCode={placeholder_validationCode}
          label_sendValidationCode={label_sendValidationCode}
          label_changePassword={label_changePassword}
          handler_text={onChangePassword_text(stores)}
          handler_button={onChangePassword_button(stores)}
          value_username={value_username}
        />
      </Box>
    </Box>
  );

  const title = GUI_CONFIG.language.SEO.title_description.ChangePassword.title;

  const content = (
    <>
      <HeaderSEO stores={stores} title={title} />
      <HeaderTitle stores={stores} title={title} />
      {changePasswordForm}
    </>
  );

  return <AppLayout paramsPage={props.paramsPage}>{content}</AppLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(ChangePassword);
