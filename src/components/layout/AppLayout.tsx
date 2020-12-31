import { observer } from "mobx-react-lite";
import React from "react";
import { useStores } from "../../stores/_RootStoreHook";
import Dialogs from "../Dialogs";
import { goLanding, ParentSize_ } from "../../libs/utils";
import PagesLayout from "./PagesLayout";
import { _getUser } from "../../_api";

const AppLayout: React.FunctionComponent = (props) => {
  const stores = useStores();

  //when username==="", it means the user is not logged!
  //When username===null, it means the App is not initialyzed
  if (stores.userStore.user === null) {
    stores.userStore.initializeApp(stores);
  } else if (!stores.userStore.isLogged) {
    // Not Logged
    if (process.browser) {
      goLanding();
    }
  }

  return (
    <>
      <ParentSize_>
        {(parent) => (
          <>
            {stores.uiStore.setScreen(parent.width, parent.height)}
            <PagesLayout>{props.children}</PagesLayout>
          </>
        )}
      </ParentSize_>
      <Dialogs />
    </>
  );
};

export default observer(AppLayout);
