import { Box } from "gestalt";
import { observer } from "mobx-react";
import React from "react";
import DialogLoading from "../src/components/DialogLoading";
import { configPaths } from "../src/config/globals";
import { getParamsPageFromContext, goPage } from "../src/libs/helpersBase";
import { useStores } from "../src/stores/RootStoreHook";

const Index: React.FunctionComponent = (props) => {
  const stores = useStores();

  getParamsPageFromContext(stores)
    .then((paramsPageContext) => {
      if (paramsPageContext !== undefined) {
        goPage(
          stores,
          {
            lang: paramsPageContext.lang,
            // display: paramsPageContext.display,
          },
          configPaths.pages.Home
        );
      }
    })
    .catch(function (error) {
      // console.log(error);
    });

  // return <></>;

  if (stores.baseStore.initCompleted.core !== true) {
    //Not yet initialyzed (Core part)
    return (
      <Box
        height="100vh"
        display="flex"
        direction="column"
        justifyContent="center"
      >
        <DialogLoading stores={stores} />
      </Box>
    );
  } else {
    return <></>;
  }
};

export default observer(Index);
