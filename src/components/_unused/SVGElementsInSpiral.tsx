import React from "react";
import { IPosition, SVG_T } from "../../config/globals";
import { polarToCartesian } from "../../libs/utilsSVG";

interface IProps {
  elements: SVG_T[];
  R0: number;
  deltaR: number;
  deltaAngleInDegree: number;
}

const SVGElementsInSpiral: React.FunctionComponent<IProps> = (props) => {
  const centers: IPosition[] = props.elements.map((el, index) => {
    if (index === 0) {
      return { x: 0, y: 0 };
    } else {
      return polarToCartesian(
        props.R0 + index * props.deltaR,
        index * props.deltaAngleInDegree
      );
    }
  });

  return (
    <>
      <g>
        <circle
          cx={0}
          cy={0}
          r={props.R0}
          stroke="black"
          strokeOpacity="0.5"
          strokeDasharray="5,5"
          fill="none"
        />
        ;
      </g>
      <g>
        {props.elements.map((el, index) => {
          return (
            <g
              key={`test${index}`}
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

export default SVGElementsInSpiral;
