import { Box, Button } from "gestalt";
import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import FormLoginSignup from "../../src/components/FormLoginSignup";
import LanguageSelector from "../../src/components/LanguageSelector";
import AppLayout from "../../src/components/layout/AppLayout";
import { configPaths } from "../../src/config/globals";
import {
  onChangeUsernamePassword,
  onLogout,
  onSubmitLoginSignup,
} from "../../src/handlers/handlers_LoginSignup";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../src/libs/getDataParamsPage";
import { goPage } from "../../src/libs/helpersBase";
import { initializeApp } from "../../src/libs/helpersInitialize";
import { useStores } from "../../src/stores/RootStoreHook";
import ContentLoading from "../../src/components/ContentLoading";
import CatchupMessage from "../../src/components/CatchupMessage";
import HeaderTitle from "../../src/components/HeaderTitle";

const User: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed
    return <ContentLoading stores={stores} />;
  }

  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;
  const title = stores.baseStore.isLogged
    ? stores.baseStore.user.username
    : stores.baseStore.GUI_CONFIG.language.user.guest;

  const deconnexion = GUI_CONFIG.language.user.deconnexion;
  const changePassword = GUI_CONFIG.language.user.changePassword;

  const placeholder_username =
    GUI_CONFIG.language.user.loginSignup.username_placeholder;
  const password_placeholder =
    GUI_CONFIG.language.user.loginSignup.password_placeholder;
  const missing_password_text =
    GUI_CONFIG.language.user.loginSignup.missing_password_text;
  const login_label = GUI_CONFIG.language.user.loginSignup.login_label;
  const signup_label = GUI_CONFIG.language.user.loginSignup.signup_label;

  const height_elements = stores.baseStore.GUI_CONFIG.display.layout.heightUser;

  const loginSignup = (
    <Box padding={0} column={11} smColumn={11} mdColumn={5} lgColumn={3}>
      <FormLoginSignup
        stores={stores}
        placeholder_username={placeholder_username}
        placeholder_password={password_placeholder}
        missing_password_text={missing_password_text}
        label_login={login_label}
        label_signup={signup_label}
        handler_text={onChangeUsernamePassword(stores)}
        handler_button={onSubmitLoginSignup(stores)}
      />
    </Box>
  );

  const resetPasswordButton = (
    <Box column={8} smColumn={6} mdColumn={3} lgColumn={2}>
      <Box display="flex" direction="row" justifyContent="around">
        <Button
          accessibilityLabel="resetPassword"
          text={changePassword}
          size="lg"
          color="blue"
          onClick={() => {
            goPage(
              stores,
              stores.baseStore.paramsPage,
              configPaths.pages.ChangePassword
            );
          }}
        />
      </Box>
    </Box>
  );

  const logoutButton = (
    <Box column={8} smColumn={6} mdColumn={3} lgColumn={2}>
      <Box display="flex" direction="row" justifyContent="around">
        <Button
          accessibilityLabel="logout"
          text={deconnexion}
          size="lg"
          color="red"
          onClick={onLogout(stores)}
        />
      </Box>
    </Box>
  );

  const languageSelector = (
    <Box padding={0} column={11} smColumn={11} mdColumn={5} lgColumn={3}>
      <LanguageSelector stores={stores} />
    </Box>
  );

  const catchMessage = <CatchupMessage stores={stores} withButton={false} />;

  let page_content;
  if (!stores.baseStore.isLogged) {
    page_content = (
      <>
        {languageSelector}
        {loginSignup}
        {catchMessage}
      </>
    );
  } else {
    page_content = (
      <>
        {languageSelector}
        {resetPasswordButton}
        {logoutButton}
      </>
    );
  }

  return (
    <AppLayout stores={stores} titleSEO={title} isBodySVG={false}>
      <HeaderTitle stores={stores} title={title} />
      <Box
        display="flex"
        direction="column"
        flex="grow"
        height={height_elements}
        justifyContent="around"
        alignItems="center"
      >
        {page_content}
      </Box>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  return await I_getStaticPaths(context);
};

export default observer(User);
