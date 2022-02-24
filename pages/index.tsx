import { observer } from "mobx-react-lite";
import React from "react";
import { configPaths } from "../src/config/globals";
import { getParamsPageFromContext, goPage } from "../src/libs/helpersBase";
import { useStores } from "../src/stores/RootStoreHook";

const Index: React.FunctionComponent = (props) => {
  const stores = useStores();

  getParamsPageFromContext()
    .then((paramsPageContext) => {
      if (paramsPageContext !== undefined) {
        goPage(
          stores,
          {
            lang: paramsPageContext.lang,
          },
          configPaths.pages.Home
        );
      }
    })
    .catch(function (error) {
      // console.log(error);
    });

  return <></>;
};

export default observer(Index);
