import { Box, Button } from "gestalt";
import { observer } from "mobx-react-lite";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
// import CatchupMessage from "../../../src/components/CatchupMessage";
import FormLoginSignup from "../../../src/components/FormLoginSignup";
import HeaderTitle from "../../../src/components/HeaderTitle";
import AppLayout from "../../../src/components/layout/AppLayout";
import { configPaths } from "../../../src/config/globals";
import {
  onChangeUsernamePassword,
  onLogout,
  onSubmitLoginSignup,
} from "../../../src/handlers/handlers_LoginSignup";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getDataParamsPage";
import { goPage } from "../../../src/libs/helpersBase";
import { initializeApp } from "../../../src/libs/helpersInitialize";
import { useStores } from "../../../src/stores/RootStoreHook";

//CSS in JS Styles not supported in SSR
const CatchupMessageDynamic = dynamic(
  () => import("../../../src/components/CatchupMessage"),
  { ssr: false }
);

const User: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const paramsPage = props.paramsPage;
  initializeApp(stores, paramsPage);
  if (stores.baseStore.GUI_CONFIG === undefined) {
    //Not yet initialyzed
    return <></>;
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
      <Button
        accessibilityLabel="resetPassword"
        text={changePassword}
        size="lg"
        color="blue"
        onClick={() => {
          goPage(stores.baseStore.paramsPage, configPaths.pages.ChangePassword);
        }}
      />
    </Box>
  );

  const logoutButton = (
    <Box column={8} smColumn={6} mdColumn={3} lgColumn={2}>
      <Button
        accessibilityLabel="logout"
        text={deconnexion}
        size="lg"
        color="red"
        onClick={onLogout(stores)}
      />
    </Box>
  );

  // const installation_instructions = !isInstalled() &&
  //   isMobile(GUI_CONFIG.id) && (
  //     <Installation
  //       height="25vh"
  //       path_image={configPaths.image_install}
  //       instruction={GUI_CONFIG.language.user.install_instructions}
  //     />
  //   );

  // const height_elements = isMobile(GUI_CONFIG.id) ? "60vh" : "30vh";

  const height_elements = stores.baseStore.GUI_CONFIG.display.heightUser;

  const catchMessage = (
    <CatchupMessageDynamic stores={stores} withButton={false} />
  );

  let page_content;
  if (!stores.baseStore.isLogged) {
    page_content = (
      <>
        {loginSignup}
        {catchMessage}
      </>
    );
  } else {
    page_content = (
      <>
        {resetPasswordButton}
        {logoutButton}
      </>
    );
  }

  return (
    <AppLayout stores={stores}>
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
