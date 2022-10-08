import React from "react";
import { observer } from "mobx-react-lite";
import { Sheet } from "gestalt";
import { IStores } from "../stores/RootStore";
import { TUiBooleanStorage } from "../config/globals";
import CardAtomGridDynamic from "./CardAtomGridDynamic";

interface IProps {
  stores: IStores;
}

const DialogHistory: React.FunctionComponent<IProps> = (props) => {
  const title = props.stores.baseStore.GUI_CONFIG.language.historyNavigation;
  return (
    <>
      {
        <Sheet
          accessibilityDismissButtonLabel="Close Hustory Panel"
          accessibilitySheetLabel="History items"
          heading={title}
          // subHeading={title}
          onDismiss={() => {
            props.stores.uiStore.setUiBooleanStorage(
              TUiBooleanStorage.showHistory,
              false
            );
          }}
          size="sm"
        >
          <CardAtomGridDynamic
            id={"History"}
            stores={props.stores}
            atoms={props.stores.uiStore.navigationHistoryItems}
          />
        </Sheet>
      }
    </>
  );
};

export default observer(DialogHistory);
