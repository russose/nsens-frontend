import { observer } from "mobx-react-lite";
import React from "react";
import { GUI_CONFIG } from "../src/common/configGUI";
import { IPage } from "../src/libs/utilsConfigGui";
import { useStores } from "../src/stores/_RootStoreHook";

const Index: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG_ = GUI_CONFIG;
  stores.userStore.initializeAppAndRedirect(stores, GUI_CONFIG_);
  return <></>;
};

export default observer(Index);
