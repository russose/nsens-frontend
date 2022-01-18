import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { IPosition, SVG_T } from "../../config/globals";
import { isMobile } from "../../libs/helpersBase";
import { isFirefox } from "../../libs/utils";
import { IStores } from "../../stores/RootStore";
import SVGElementsInPositionMatrix from "../SVGElementsInPositionMatrix";
import SVGHeader from "../SVGHeader";

interface IProps {
  stores: IStores;
  // header: SVG_T;
}

const AppLayoutPageHybridSVGBody: React.FunctionComponent<IProps> = (props) => {
  const card_sizes = props.stores.baseStore.GUI_CONFIG.display.knowbook_sizes;
  const ratio_size =
    props.stores.baseStore.GUI_CONFIG.display.layout.SVG_Root_Ratio;
  const size = card_sizes.height * ratio_size;

  // const header_position: IPosition =
  //   props.stores.baseStore.GUI_CONFIG.display.svgHeader.position;
  const header_position: IPosition = { x: size / 2, y: size / 2 + 5 };

  let center: IPosition = { x: 0, y: 0 };
  if (props.stores.baseStore.screen !== undefined) {
    center = props.stores.baseStore.screen.center;
  }

  const header = <SVGHeader stores={props.stores} deltaX={size} />;

  const elements: SVG_T[] = [props.children];
  const positions: IPosition[] = [center];

  const heightBody =
    props.stores.baseStore.GUI_CONFIG.display.layout.heightBody;

  //For Firefox Mobile, the menu bar at the buttom disappears when scrolling dow and address bar is hidden (bug?)
  //To solve this issue, 1) add a box on top of svg 2) reduce the height to avoid the scrolling bar
  //3) but for firefox mobile, reducing height prevent the bug to be solved to let it and keep the scrolling bar issue

  const dontReduceheightBody = isFirefox() && isMobile(props.stores);

  const heightBodyReduced =
    (parseInt(heightBody.slice(0, heightBody.length - 2), 10) - 1).toString() +
    "vh";

  elements.push(header);
  positions.push(header_position);

  return (
    <Box>
      <svg
        // viewBox="0 0 100 100"
        style={{
          width: "100%",
          height: dontReduceheightBody ? heightBody : heightBodyReduced,
          background: "white",
          // marginLeft: "0px",
          // backgroundColor: "green",
        }}
      >
        <SVGElementsInPositionMatrix
          elements={elements}
          positions={positions}
        />
      </svg>
    </Box>
  );
};

export default observer(AppLayoutPageHybridSVGBody);
