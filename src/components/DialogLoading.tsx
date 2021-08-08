import React from "react";
import { observer } from "mobx-react";
import { Spinner, Sticky } from "gestalt";
import { IStores } from "../stores/RootStore";

interface IDialogLoadingProps {
  stores: IStores;
}

const DialogLoading: React.FunctionComponent<IDialogLoadingProps> = (props) => {
  const stores = props.stores;

  return (
    <>
      <Sticky bottom="50vh">
        <Spinner
          show={stores.uiStore.showLoading}
          accessibilityLabel="Loading..."
        />
      </Sticky>
    </>
  );
};

export default observer(DialogLoading);
