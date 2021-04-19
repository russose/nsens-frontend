import { observer } from "mobx-react-lite";
import React from "react";
import { GUI_CONFIG } from "../src/config/configGUI";
import { IPage } from "../src/libs/getConfigData";
import { useStores } from "../src/stores/_RootStoreHook";
import { initializeAppAndRedirect } from "../src/libs/helpers_InitAndRedirect";

const Index: React.FunctionComponent<IPage> = (props) => {
  const stores = useStores();
  const GUI_CONFIG_ = GUI_CONFIG;
  initializeAppAndRedirect(stores, GUI_CONFIG_);
  return <></>;
};

export default observer(Index);
