import React from "react";
import { Box, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import { IStores } from "../stores/RootStore";

interface IProps {
  stores?: IStores;
}
const size = 100;

const TooltipHelper: React.FunctionComponent<IProps> = (props) => {
  return (
    <foreignObject x={-size / 2} y={-size / 2} width={size} height={size}>
      <Box padding={3} rounding={4} color="blue" height={size} width={size}>
        <Text color="white" align="center">
          Filter your board to see your favorite Pins, and more
        </Text>
      </Box>
    </foreignObject>
  );
};

export default observer(TooltipHelper);
