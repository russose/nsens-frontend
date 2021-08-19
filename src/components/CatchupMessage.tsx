import React from "react";
import { observer } from "mobx-react-lite";
import { IStores } from "../stores/RootStore";
import { Box, Callout } from "gestalt";
import { goUserHandler } from "../libs/helpersBase";

interface ICatchupMessageProps {
  stores: IStores;
  withButton?: boolean;
}

const CatchupMessage: React.FunctionComponent<ICatchupMessageProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const type = "warning";

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
          {props.withButton ? (
            <Callout
              type={type}
              iconAccessibilityLabel="info"
              title={GUI_CONFIG.language.user.catchup_message}
              message=""
              primaryAction={{
                label: GUI_CONFIG.language.user.loginSignup.signup_label,
                onClick: goUserHandler(props.stores)(),
                accessibilityLabel: "Se connecter",
              }}
            />
          ) : (
            <Callout
              type={type}
              iconAccessibilityLabel="info"
              title={GUI_CONFIG.language.user.catchup_message}
              message=""
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default observer(CatchupMessage);
