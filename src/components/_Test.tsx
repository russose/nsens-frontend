import React from "react";
import { observer } from "mobx-react";
// import Separator from "./Separator";
import { Box } from "gestalt";
import { IStores } from "../stores/RootStore";

interface IArticleProps {
  stores: IStores;
}

const _Test: React.FunctionComponent<IArticleProps> = (props) => {
  const color = props.stores.baseStore.GUI_CONFIG.display.test_color as any;

  return (
    <>
      <Box width="50%" color={color}>
        {color}
      </Box>
    </>
  );
};

export default observer(_Test);
