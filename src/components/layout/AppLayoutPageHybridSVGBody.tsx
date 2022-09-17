import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { configGeneral, IPosition, SVG_T } from "../../config/globals";
import { isMobile } from "../../libs/helpersBase";
import { isFirefox } from "../../libs/utils";
import { setSVGGlobalDimensions } from "../../libs/utilsSVG";
import { IStores } from "../../stores/RootStore";
import SVGElementsInPositionMatrix from "../SVG/SVGElementsInPositionMatrix";
import SVGHeader from "../SVG/SVGHeader";
import SVGStars from "../SVG/SVGStars";

function vhReduceString(original: string, reduction: number): string {
  const result =
    (
      parseInt(original.slice(0, original.length - 2), 10) - reduction
    ).toString() + "vh";
  return result;
}

interface IProps {
  children?: React.ReactNode;
  stores: IStores;
  // header: SVG_T;
}

const AppLayoutPageHybridSVGBody: React.FunctionComponent<IProps> = (props) => {
  const card_sizes = props.stores.baseStore.GUI_CONFIG.display.knowbook_sizes;
  const ratio_size =
    props.stores.baseStore.GUI_CONFIG.display.layout.SVG_Root_Ratio;
  const size = card_sizes.height * ratio_size;

  const background_svg = configGeneral.colors.svg_background;

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
  //3) but for firefox mobile, reducing height prevent the bug to be solved so let it and keep the scrolling bar issue

  const dontReduceheightBody = isFirefox() && isMobile(props.stores);

  const heightBodyReduced = vhReduceString(heightBody, 1);

  elements.push(header);
  positions.push(header_position);

  // if (typeof window !== "undefined") {
  //   window.onresize = () => {
  //     initWhenResized(props.stores, window);
  //   };
  // }

  setSVGGlobalDimensions(props.stores);

  return (
    <Box>
      <svg
        // viewBox="0 0 100 100"
        style={{
          width: "100%",
          height: dontReduceheightBody ? heightBody : heightBodyReduced,
          background: background_svg,
          // marginLeft: "0px",
          // backgroundColor: "green",
        }}
      >
        <SVGStars stores={props.stores} />
        <SVGElementsInPositionMatrix
          elements={elements}
          positions={positions}
        />
      </svg>
    </Box>
  );
};

export default observer(AppLayoutPageHybridSVGBody);
