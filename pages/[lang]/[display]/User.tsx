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

const User: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG = { ...props.guiConfigData };
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG);
  const title =
    stores.userStore.user === null ? "" : stores.userStore.user.username;

  const content = (
    <Box padding={10}>
      <Button
        accessibilityLabel="logout"
        text={"Logout"}
        size="md"
        onClick={onLogout(stores)}
        // inline
      />
    </Box>
  );

  return (
    <AppLayout>
      <HeaderTitle stores={stores} title={title} />
      <Box display="flex" justifyContent="center">
        <Box
          padding={2}
          display="inlineBlock"
          column={12}
          smColumn={12}
          mdColumn={8}
          lgColumn={6}
        >
          {content}
        </Box>
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
