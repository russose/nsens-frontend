import { observer } from "mobx-react-lite";
import React from "react";
import { IPage } from "../src/libs/getConfigDataGui";
import { ConfigDisplay, ConfigLanguage } from "../src/config/types";
import { configPaths } from "../src/config/globals";
import { goPage } from "../src/libs/helpersBase";

const Index: React.FunctionComponent<IPage> = (props) => {
  goPage(
    {
      lang: ConfigLanguage.fr,
      display: ConfigDisplay.mobile,
    },
    configPaths.pages.Home
  );
  return <></>;
};

export default observer(Index);
