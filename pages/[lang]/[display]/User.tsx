import { observer } from "mobx-react-lite";
import { useStores } from "../../../src/stores/_RootStoreHook";
import { Button, Box } from "gestalt";
import { onLogout } from "../../../src/handlers";
import React from "react";
import {
  IPage,
  I_getStaticPaths,
  I_getStaticProps,
} from "../../../src/libs/utilsConfigGui";
import { GetStaticPaths, GetStaticProps } from "next";
import AppLayout from "../../../src/components/layout/AppLayout";
import HeaderTitle from "../../../src/components/HeaderTitle";
import Contacts from "../../../src/components/Contacts";
import { getEmail, getTwitter, isMobile } from "../../../src/libs/utils";
import Installation from "../../../src/components/Installation";

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
  const contact = GUI_CONFIG.language.contact;

  const logoutButton = (
    <Box column={8} smColumn={6} mdColumn={3} lgColumn={2}>
      <Button
        accessibilityLabel="logout"
        text="Logout"
        size="lg"
        onClick={onLogout(stores)}
      />
    </Box>
  );

  const installation_instructions = !isInstalled() &&
    isMobile(GUI_CONFIG.id) && (
      <Installation
        height="25vh"
        path_image={GUI_CONFIG.paths.image_install}
        instruction={GUI_CONFIG.language.install_instructions}
      />
    );

  const height_elements = isMobile(GUI_CONFIG.id) ? "70vh" : "30vh";

  return (
    <AppLayout>
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
        {installation_instructions}
        {logoutButton}
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
