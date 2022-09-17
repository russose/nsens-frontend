import { Box, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { IPosition, TUiNumberStorage } from "../../config/globals";
import { isMobile } from "../../libs/helpersBase";
import { IStores } from "../../stores/RootStore";

interface IProps {
  stores: IStores;
  title: string;
  labels: string[];
  height: number;
}

const SVGElementsInCircleLegend: React.FunctionComponent<IProps> = (props) => {
  const width = props.stores.baseStore.screen.width;

  const R0 = props.stores.uiStore.getUiNumberStorage(TUiNumberStorage.R0);

  const legend_ratio_position = isMobile(props.stores) ? 0.35 : 0.55;

  const center: IPosition = {
    x: 0,
    y:
      -R0 -
      props.stores.baseStore.GUI_CONFIG.display.atom_sizes.height *
        legend_ratio_position,
  };

  const elements = props.labels.map((label) => {
    return (
      <Box key={label + "B"} padding={1}>
        <Text key={label + "T"} size={"100"} weight="normal" color={"light"}>
          {label}
        </Text>
      </Box>
    );
  });

  return (
    <g transform={`translate(${center.x}, ${center.y}) `}>
      <foreignObject
        x={-width / 2}
        y={-props.height / 2}
        width={width}
        height={props.height}
      >
        <Box
          color="transparent"
          padding={0}
          width={width}
          height={props.height}
        >
          {/* <Text align="center" size="md" weight="bold" color={color}>
            {props.title}
          </Text> */}
          <Box
            display="flex"
            direction="row"
            justifyContent="center"
            wrap={true}
          >
            {elements}
          </Box>
        </Box>
      </foreignObject>
    </g>
  );
};

export default observer(SVGElementsInCircleLegend);
