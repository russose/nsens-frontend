import { observer } from "mobx-react-lite";
import React from "react";
import { IPosition, SVG_T } from "../../config/globals";
import { polarToCartesian } from "../../libs/utilsSVG";

interface IProps {
  elements: SVG_T[];
  max_amount_displayed: number;
  x0: number;
  y0: number;
  showOrbit: boolean;
}

const SVGElementsInArc: React.FunctionComponent<IProps> = (props) => {
  if (props.elements.length === 0) {
    return <></>;
  }

  const R0 = (Math.pow(props.x0, 2) + Math.pow(props.y0, 2)) / (2 * props.y0);
  const alpha_max = (Math.acos(1 - props.y0 / R0) * 180) / Math.PI;
  const delta_alpha = (2 * alpha_max) / (props.max_amount_displayed - 1);

  const centers: IPosition[] = props.elements.map((el, index) => {
    let alpha;
    if (props.elements.length === 1) {
      alpha = 0;
    } else {
      alpha = alpha_max - index * delta_alpha;
    }

    return polarToCartesian(R0, alpha);
  });

  return (
    <>
      <g transform={`translate(0, ${R0 - props.y0}) `}>
        {/* <g transform={`translate(0, -${R0 - props.y0}) `}>
          <SVGCircle R={5} color="red" />
        </g> */}
        {props.showOrbit && (
          <circle
            cx={0}
            cy={0}
            r={R0}
            stroke="black"
            strokeOpacity="0.8"
            // strokeDasharray="5,5"
            strokeWidth="5"
            fill="none"
          />
        )}
        <g transform={`translate(0, -${R0 - props.y0}) `}>
          <rect
            x={-1.1 * R0}
            y={props.y0}
            width={2.2 * R0}
            height={2.2 * R0}
            fill="white"
          />
        </g>

        {props.elements
          .slice(0, props.max_amount_displayed)
          .map((el, index) => {
            return (
              <g
                key={`SVGElementsInCircle${index}`}
                transform={`translate(${centers[index].x}, ${centers[index].y}) `}
              >
                {el}
              </g>
            );
          })}
      </g>
    </>
  );
};

export default observer(SVGElementsInArc);
