import React from "react";
import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import { IStores } from "../stores/RootStore";
import Button from "./Button";

interface IButtonTestProps {
  stores: IStores;
}

const _ButtonTest: React.FunctionComponent<IButtonTestProps> = (props) => {
  const stores = props.stores;

  return (
    <Box padding={1} color="watermelon">
      <Button
        stores={stores}
        icon={"workflow-status-warning"}
        label={"test"}
        displayLabel={true}
        path={undefined}
        onClick={() => {
          stores.baseStore.incrementAmountFeedDisplayed();
        }}
      />
    </Box>
  );
};

export default observer(_ButtonTest);
