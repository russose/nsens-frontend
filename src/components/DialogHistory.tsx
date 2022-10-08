import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Modal, Text } from "gestalt";
import { IStores } from "../stores/RootStore";
import { SizeT, TUiBooleanStorage } from "../config/globals";
import CardAtomGridDynamic from "./CardAtomGridDynamic";

interface IProps {
  stores: IStores;
}

const DialogHistory: React.FunctionComponent<IProps> = (props) => {
  const title = props.stores.baseStore.GUI_CONFIG.language.historyNavigation;
  const title_size: SizeT =
    props.stores.baseStore.GUI_CONFIG.display.dialogs.title_size;

  return (
    <>
      <Modal
        accessibilityModalLabel="History items"
        onDismiss={() => {
          props.stores.uiStore.setUiBooleanStorage(
            TUiBooleanStorage.showHistory,
            false
          );
        }}
      >
        <Box paddingY={3}>
          <Text align="center" size={title_size} weight="bold">
            {title}
          </Text>
        </Box>

        <Box height={"70vh"}>
          <CardAtomGridDynamic
            id={"History"}
            stores={props.stores}
            atoms={props.stores.uiStore.navigationHistoryItems}
          />
        </Box>
      </Modal>
    </>
  );
};

export default observer(DialogHistory);
