import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Spinner, Sticky } from "gestalt";
import { IStores } from "../stores/RootStore";
import { TUiBooleanStorage } from "../config/globals";

interface IContentLoadingProps {
  stores: IStores;
}

const ComponentLoading: React.FunctionComponent<IContentLoadingProps> = (
  props
) => {
  const stores = props.stores;

  return (
    <>
      <Box
        height="100vh"
        display="flex"
        direction="column"
        justifyContent="center"
      >
        <Sticky bottom="50vh">
          <Spinner
            show={stores.uiStore.getUiBooleanStorage(
              TUiBooleanStorage.showLoading
            )}
            accessibilityLabel="Loading..."
          />
        </Sticky>
      </Box>
    </>
  );
};

export default observer(ComponentLoading);
