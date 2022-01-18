import { Box, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { IPosition, TUiNumberStorage } from "../config/globals";
import { IStores } from "../stores/RootStore";

interface IProps {
  stores: IStores;
  title: string;
  labels: string[];
  height: number;
  // translation?: IPosition;
}

const MARGIN_Y = 0;
const SVGElementsInCircleLegend: React.FunctionComponent<IProps> = (props) => {
  // const center: IPosition =
  //   props.translation === undefined ? { x: 0, y: 0 } : props.translation;
  const width = props.stores.baseStore.screen.width;

  // const card_sizes = props.stores.baseStore.GUI_CONFIG.display.knowbook_sizes;
  // const ratio_size =
  //   props.stores.baseStore.GUI_CONFIG.display.layout.SVG_Root_Ratio;

  // const R0 = SVGMaxRadius(props.stores);

  const R0 = props.stores.uiStore.getUiNumberStorage(TUiNumberStorage.R0);

  const center: IPosition = {
    x: 0,
    // y:
    //   -props.stores.baseStore.screen.height / 2 +
    //   card_sizes.height * ratio_size +
    //   props.stores.baseStore.GUI_CONFIG.display.svgHeader.position.y +
    //   MARGIN_Y,
    // y: -R0 - MARGIN_Y,
    y:
      -R0 -
      props.stores.baseStore.GUI_CONFIG.display.atom_sizes.height / 2 -
      MARGIN_Y,
  };

  const elements = props.labels.map((label) => {
    return (
      <Box key={label + "B"} padding={1}>
        <Text key={label + "T"} size="sm" weight="normal">
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
          // alignItems="end"
        >
          <Text align="center" size="md" weight="bold">
            {props.title}
          </Text>
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
