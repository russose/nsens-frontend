import { Box, Text, TapArea } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { configGeneral, handlerT } from "../../config/globals";
import { IStores } from "../../stores/RootStore";

interface IProps {
  stores: IStores;
  title: string;
  onClick: handlerT;
}

const SVGRoot: React.FunctionComponent<IProps> = (props) => {
  const card_sizes = props.stores.baseStore.GUI_CONFIG.display.knowbook_sizes;
  const ratio_size =
    props.stores.baseStore.GUI_CONFIG.display.layout.SVG_Root_Ratio;
  const size = card_sizes.height * ratio_size;
  const color = "light";
  const colorEdge: any = configGeneral.colors.root_edge_color;
  // const colorEdge: any = undefined;

  const title_card_size = "100";

  const rounding = "circle";

  const element = (
    <Box padding={1} height={size} width={size}>
      <Box
        height="100%"
        width="100%"
        borderStyle="shadow"
        // borderStyle="lg"
        color={colorEdge === undefined ? "transparent" : colorEdge}
        padding={colorEdge === undefined ? 0 : 1}
        rounding={rounding}
        display="flex"
        direction="column"
      >
        <Box height="100%" width="100%" color={color} rounding={rounding}>
          <Box
            paddingX={2}
            display="flex"
            justifyContent="center"
            height="100%"
            alignItems="center"
          >
            <Text size={title_card_size} align="center" weight="bold">
              {props.title}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const elementWithTap = (
    <div className="anim-element">
      <TapArea rounding={rounding} onTap={props.onClick}>
        {element}
      </TapArea>
    </div>
  );

  return (
    <foreignObject x={-size / 2} y={-size / 2} width={size} height={size}>
      {props.onClick !== undefined ? elementWithTap : element}
    </foreignObject>
  );
};

export default observer(SVGRoot);
