import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { closeAllDialogs } from "../libs/helpersBase";
import { IStores } from "../stores/RootStore";
import CardAtomGridDynamic from "./CardAtomGridDynamic";
import DialogPanel from "./DialogPanel";

interface IProps {
  stores: IStores;
}

const DialogHistory: React.FunctionComponent<IProps> = (props) => {
  const title = props.stores.baseStore.GUI_CONFIG.language.historyNavigation;
  // const title_size: SizeT =
  //   props.stores.baseStore.GUI_CONFIG.display.size_text_generic;

  return (
    <>
      {/* <Modal
        accessibilityModalLabel="History items"
        onDismiss={() => {
          // props.stores.uiStore.setUiBooleanStorage(
          //   TUiBooleanStorage.showHistory,
          //   false
          // );
          closeAllDialogs(props.stores);
        }}
      > */}
      <DialogPanel
        stores={props.stores}
        heading={title}
        onDismiss={() => {
          // props.stores.uiStore.setUiBooleanStorage(
          //   TUiBooleanStorage.showHistory,
          //   false
          // );
          closeAllDialogs(props.stores);
        }}
      >
        {/* <Box paddingY={3}>
          <Text align="center" size={title_size} weight="bold">
            {title}
          </Text>
        </Box> */}

        <Box height={"70vh"}>
          <CardAtomGridDynamic
            id={"History"}
            stores={props.stores}
            atoms={props.stores.uiStore.navigationHistoryItems}
          />
        </Box>
      </DialogPanel>
      {/* </Modal> */}
    </>
  );
};

export default observer(DialogHistory);
