import React from "react";
import { observer } from "mobx-react-lite";
import { Spinner, Sticky } from "gestalt";
import { useStores } from "../stores/_RootStoreHook";

// interface IDialogLoadingProps {
//   stores: IStores;
// }

const DialogLoading: React.FunctionComponent = (props) => {
  const stores = useStores();

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
