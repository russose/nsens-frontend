import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Spinner, Sticky } from "gestalt";
import { IStores } from "../stores/RootStore";

interface IContentLoadingProps {
  stores: IStores;
}

const ContentLoading: React.FunctionComponent<IContentLoadingProps> = (
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
            show={stores.uiStore.showLoading}
            accessibilityLabel="Loading..."
          />
        </Sticky>
      </Box>
    </>
  );
};

export default observer(ContentLoading);
