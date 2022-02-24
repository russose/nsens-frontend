import { observer } from "mobx-react-lite";
import React from "react";
import { configGeneral, IPosition, SVG_T } from "../config/globals";
import { DELTA_ALPHA, indexFromTick, polarToCartesian } from "../libs/utilsSVG";
import { IStores } from "../stores/RootStore";
import SVGEdge from "./SVGEdge";
import SVGElementsInCircleLegend from "./SVGElementsInCircleLegend";

interface IProps {
  stores: IStores;
  elements: SVG_T[];
  edges_ids?: string[];
  edges_legend?: string[];
  R0: number;
  amountDisplayed: number;
  tick: number;
  amountCascade: number;
  deltaDegree?: number;
  showOrbit?: boolean;
}

const EPSILON_CASCADE_DEGREE = 8;
const EDGE_START_RATE = 0.45;
const EDGE_END_RATE = 0.6;

const SVGElementsInCircle: React.FunctionComponent<IProps> = (props) => {
  if (props.elements === undefined || props.elements.length === 0) {
    return <></>;
  }

  const color: any = configGeneral.colors.svg_elements;
  const fontsize = props.stores.baseStore.GUI_CONFIG.display.layout.fontsize;
  let showEdges = true;
  if (
    props.edges_ids === undefined ||
    props.edges_ids.length !== props.elements.length
  ) {
    showEdges = false;
  }

  const deltaDegree_ = props.deltaDegree === undefined ? 0 : props.deltaDegree;
  const alpha = 360 / props.amountDisplayed;

  let i = indexFromTick(props.tick, props.amountDisplayed);

  const K = props.tick * DELTA_ALPHA - i * alpha;

  const elements_ = props.elements;

  const elements_cascade = elements_.slice(0, props.amountCascade);
  const elements_mobile = elements_.slice(props.amountCascade);

  const angles_mobile: number[] = elements_mobile.map((el, index) => {
    let angle = deltaDegree_ + index * alpha + K;
    const angle_max = deltaDegree_ + alpha * (props.amountDisplayed - 1);
    if (angle > angle_max) {
      angle = angle_max;
    }
    return angle;
  });

  const angles_cascade: number[] = elements_cascade.map((el, index) => {
    const angle =
      deltaDegree_ + EPSILON_CASCADE_DEGREE * (index - elements_cascade.length);
    return angle;
  });

  const centers_mobile: IPosition[] = angles_mobile.map((angle, index) => {
    return polarToCartesian(props.R0, angle);
  });

  const centers_cascade: IPosition[] = angles_cascade.map((angle, index) => {
    return polarToCartesian(props.R0, angle);
  });

  const elements: SVG_T[] = elements_cascade.concat(elements_mobile);
  const centers: IPosition[] = centers_cascade.concat(centers_mobile);

  let edges: SVG_T[] = [];
  let legend = <></>;
  if (showEdges) {
    const edges_labels_ = props.edges_ids;

    const edges_labels_cascade = edges_labels_.slice(0, props.amountCascade);
    const edges_labels_mobile = edges_labels_.slice(
      props.amountCascade,
      edges_labels_.length - 1
    );
    const angles_edges = angles_cascade.concat(angles_mobile);

    const edges_labels = edges_labels_cascade
      .concat(edges_labels_mobile)
      .slice(Math.max(props.amountCascade - 1, 0));

    console.log(props.amountCascade);
    console.log(edges_labels);

    edges = angles_edges
      .slice(Math.max(props.amountCascade - 1, 0))
      .map((angle, index) => {
        return (
          <SVGEdge
            key={`Edge${index}`}
            text={edges_labels[index]}
            angle={angle}
            lenght={props.R0}
            start_rate={EDGE_START_RATE}
            end_rate={EDGE_END_RATE}
            fontsize={fontsize}
          />
        );
      });

    legend = (
      <SVGElementsInCircleLegend
        stores={props.stores}
        title={props.stores.baseStore.GUI_CONFIG.language.legend}
        labels={props.edges_legend}
        height={70}
      />
    );
  }

  return (
    <>
      {legend}
      {edges}
      {props.showOrbit !== false && (
        <circle
          cx={0}
          cy={0}
          r={props.R0}
          // stroke="black"
          stroke={color}
          strokeOpacity="0.5"
          // strokeDasharray="5,5"
          strokeDasharray="10,10"
          strokeWidth="2"
          fill="none"
        />
      )}
      {elements.map((el, index) => {
        return (
          <g
            key={`SVGElementsInCircle${index}`}
            transform={`translate(${centers[index].x}, ${centers[index].y}) `}
          >
            {el}
          </g>
        );
      })}
    </>
  );
};

export default observer(SVGElementsInCircle);
