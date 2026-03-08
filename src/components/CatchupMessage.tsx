import React from "react";
import { observer } from "mobx-react-lite";
import { IStores } from "../stores/RootStore";
import { Box, Callout, SlimBanner } from "gestalt";
import { goUserHandler } from "../libs/helpersBase";

interface ICatchupMessageProps {
  stores: IStores;
}

const CatchupMessage: React.FunctionComponent<ICatchupMessageProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const type = "info";

  return (
    <>
      <Box
        display="flex"
        direction="column"
        // flex="grow"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Box
          column={11}
          smColumn={11}
          mdColumn={11}
          lgColumn={9}
          alignItems="center"
        >
          {/* <Callout
            type={type}
            iconAccessibilityLabel="info"
            title={GUI_CONFIG.language.user.catchup_message}
            message=""
          /> */}
          <SlimBanner
            type={type}
            message={GUI_CONFIG.language.user.catchup_message}
            iconAccessibilityLabel="info"
          />
        </Box>
      </Box>
    </>
  );
};

export default observer(CatchupMessage);
