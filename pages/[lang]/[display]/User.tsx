import { observer } from "mobx-react-lite";
import { useStores } from "../../../src/stores/_RootStoreHook";
import { Button, Box } from "gestalt";
import React from "react";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/getConfigData";
import { GetStaticPaths, GetStaticProps } from "next";
import AppLayout from "../../../src/components/layout/AppLayout";
import HeaderTitle from "../../../src/components/HeaderTitle";
import Contacts from "../../../src/components/Contacts";
import { isMobile } from "../../../src/libs/utils";
import Installation from "../../../src/components/Installation";
import { onLogout } from "../../../src/handlers/handlers_LoginSignup";
import { getEmail, getTwitter, configPaths } from "../../../src/common/globals";

export function isInstalled(): boolean {
  let result = false;
  if (typeof window !== "undefined") {
    const navigator: any = window.navigator;
    // For iOS
    if (
      navigator !== undefined &&
      navigator.standalone !== undefined &&
      navigator.standalone
    ) {
      result = true;
    }
    // For Android
    if (window.matchMedia("(display-mode: standalone)").matches) {
      result = true;
    }
  }
  return result;
}

const User: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG);
  const title =
    stores.userStore.user === null ? "" : stores.userStore.user.username;
  const deconnexion = GUI_CONFIG.language.user.deconnexion;
  const changePassword = GUI_CONFIG.language.user.changePassword;
  const contact = GUI_CONFIG.language.user.contact;

  const resetPasswordButton = (
    <Box column={8} smColumn={6} mdColumn={3} lgColumn={2}>
      <Button
        accessibilityLabel="resetPassword"
        text={changePassword}
        size="lg"
        // color="red"
        onClick={() => {
          stores.userStore.goPage(
            stores.userStore.paramsPage,
            configPaths.pages.ChangePassword
          );
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

  const installation_instructions = !isInstalled() &&
    isMobile(GUI_CONFIG.id) && (
      <Installation
        height="25vh"
        path_image={configPaths.image_install}
        instruction={GUI_CONFIG.language.user.install_instructions}
      />
    );

  const height_elements = isMobile(GUI_CONFIG.id) ? "70vh" : "30vh";

  return (
    <AppLayout stores={stores}>
      <HeaderTitle stores={stores} title={title} />

      <Box
        display="flex"
        direction="column"
        flex="grow"
        height={height_elements}
        justifyContent="evenly"
        alignItems="center"
      >
        <Contacts
          email={getEmail()}
          twitter_link={getTwitter()}
          text={contact}
          icon_size={32}
          text_size="lg"
        />
        {resetPasswordButton}
        {logoutButton}
        {installation_instructions}
      </Box>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return await I_getStaticProps(context);
};
export const getStaticPaths: GetStaticPaths = async (constext) => {
  return await I_getStaticPaths(constext);
};

export default observer(User);
