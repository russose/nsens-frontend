import { observer } from "mobx-react-lite";
import { useStores } from "../../../src/stores/_RootStoreHook";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/utilsConfigGui";
import HeaderTitle from "../../../src/components/HeaderTitle";
import AppLayout from "../../../src/components/layout/AppLayout";
import { Box, Button } from "gestalt";
import { isMobile } from "../../../src/libs/utils";
import Separator from "../../../src/components/Separator";
import FormChangePassword from "../../../src/components/FormChangePassword";
import {
  onChangePassword_button,
  onChangePassword_text,
} from "../../../src/handlers/handlers_ChangePassword";

const ChangePassword: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG);
  // stores.userStore.initializeAppWithoutDataAndGoPage(
  //   GUI_CONFIG,
  //   GUI_CONFIG.paths.pages.ChangePassword
  // );

  const title = GUI_CONFIG.language.changePassword.title;
  const placeholder_username =
    GUI_CONFIG.language.landing.loginSignup.username_placeholder;
  const password_placeholder =
    GUI_CONFIG.language.changePassword.password_placeholder;
  const placeholder_validationCode =
    GUI_CONFIG.language.changePassword.placeholder_validationCode;
  const label_sendValidationCode =
    GUI_CONFIG.language.changePassword.label_sendValidationCode;
  const label_changePassword =
    GUI_CONFIG.language.changePassword.label_changePassword;

  const isLogged = stores.userStore.isLogged;

  stores.uiStore.setChangePasswordError("");

  const height_elements = isMobile(GUI_CONFIG.id) ? "45vh" : "40vh";

  let value_username = undefined;
  if (isLogged) {
    value_username = stores.userStore.user.username;
    stores.uiStore.setChangePasswordUsername(stores.userStore.user.username);
  }

  const backButton = (
    <Box display="flex" flex="grow" justifyContent="center">
      <Box column={5} smColumn={4} mdColumn={2} lgColumn={1}>
        <Button
          accessibilityLabel="nSens_back"
          text="n.Sens"
          size="lg"
          // color="red"
          onClick={() => {
            stores.userStore.goPage(
              stores.userStore.paramsPage,
              stores.userStore.GUI_CONFIG.paths.pages.Landing
            );
          }}
        />
      </Box>
    </Box>
  );

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
          handler_text={onChangePassword_text(stores.uiStore)}
          handler_button={onChangePassword_button(stores)}
          value_username={value_username}
        />
      </Box>
    </Box>
  );

  let page;
  if (!isLogged) {
    page = (
      <>
        <HeaderTitle stores={stores} title={title} hidden={false} />
        {changePasswordForm}
        <Separator with_line={false} />
        {backButton}
      </>
    );
  } else {
    page = (
      <AppLayout>
        <HeaderTitle stores={stores} title={title} hidden={false} />
        {changePasswordForm}
      </AppLayout>
    );
  }

  return <>{page}</>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (constext) => {
  return await I_getStaticPaths(constext);
};

export default observer(ChangePassword);
