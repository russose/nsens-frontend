import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect } from "react";
import CatchupMessage from "../../../src/components/CatchupMessage";
import FormLoginSignup from "../../../src/components/FormLoginSignup";
import HeaderSEO from "../../../src/components/HeaderSEO";
import HeaderTitle from "../../../src/components/HeaderTitle";
import LanguageSelector from "../../../src/components/LanguageSelector";
import MenuBarUser from "../../../src/components/MenuBarUser";
import AppLayout from "../../../src/components/layout/AppLayout";
import { initStateCat } from "../../../src/config/globals";
import {
  onChangeUsernamePassword,
  onSubmitLoginSignup,
} from "../../../src/handlers/handlers_User";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import { useStores } from "../../../src/stores/RootStoreHook";

const User: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  // initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  useEffect(() => {
    initializeApp(stores, props.paramsPage, props.GUI_CONFIG);
  }, []);
  if (stores.uiStore.getInitCompleted(initStateCat.core) !== true) {
    return <></>;
  }

  const GUI_CONFIG = props.GUI_CONFIG;
  const title = stores.baseStore.isLogged
    ? stores.baseStore.user.username
    : GUI_CONFIG.language.user.guest;

  // const deconnexion = GUI_CONFIG.language.user.deconnexion;
  // const changePassword = GUI_CONFIG.language.user.changePassword;

  const placeholder_username =
    GUI_CONFIG.language.user.loginSignup.username_placeholder;
  const password_placeholder =
    GUI_CONFIG.language.user.loginSignup.password_placeholder;
  const missing_password_text =
    GUI_CONFIG.language.user.loginSignup.missing_password_text;
  const login_label = GUI_CONFIG.language.user.loginSignup.login_label;
  const signup_label = GUI_CONFIG.language.user.loginSignup.signup_label;

  // const updateLabel = GUI_CONFIG.language.user.modification;

  const height_elements = GUI_CONFIG.display.layout.heightUser;

  // const size_button = GUI_CONFIG.display.size_button_generic as any;

  // const button_color = configGeneral.colors.button_color_default as any;

  const loginSignup = (
    <Box padding={0} column={11} smColumn={11} mdColumn={5} lgColumn={3}>
      <FormLoginSignup
        stores={stores}
        placeholder_email={placeholder_username}
        placeholder_password={password_placeholder}
        missing_password_text={missing_password_text}
        label_login={login_label}
        label_signup={signup_label}
        handler_text={onChangeUsernamePassword(stores)}
        handler_button={onSubmitLoginSignup(stores)}
      />
    </Box>
  );

  const languageSelector = (
    <Box padding={0} column={11} smColumn={11} mdColumn={5} lgColumn={3}>
      <LanguageSelector stores={stores} />
    </Box>
  );

  const catchMessage = <CatchupMessage stores={stores} />;

  const buttons = (
    <Box column={11} smColumn={11} mdColumn={5} lgColumn={3}>
      <MenuBarUser stores={stores} />
    </Box>
  );

  let page_content;
  if (!stores.baseStore.isLogged) {
    page_content = (
      <>
        {buttons}
        {loginSignup}
        {catchMessage}
      </>
    );
  } else {
    page_content = (
      <>
        {/* {resetPasswordButton} */}
        {buttons}
        {/* {editUserPropsButton}
        {logoutButton} */}
      </>
    );
  }

  // const contacts = <SocialAndContacts stores={stores} />;

  const content = (
    <>
      <HeaderSEO stores={stores} title={title} />
      <HeaderTitle
        stores={stores}
        title={title}
        // addtional_buttons_right={[]}
        hidden={false}
      />
      <Box
        display="flex"
        direction="column"
        flex="grow"
        height={height_elements}
        justifyContent="evenly"
        alignItems="center"
        // color="education"
      >
        {languageSelector}
        {page_content}
        {/* {contacts} */}
      </Box>
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

export default observer(User);
