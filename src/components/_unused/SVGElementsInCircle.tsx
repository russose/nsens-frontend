import { observer } from "mobx-react-lite";
import React from "react";
import { IPosition, SVG_T } from "../../config/globals";
import { polarToCartesian } from "../../libs/utilsSVG";

interface IProps {
  elements: SVG_T[];
  R0: number;
  showOrbit: boolean;
  deltaDegree: number;
}

const SVGElementsInCircle: React.FunctionComponent<IProps> = (props) => {
  if (props.elements.length === 0) {
    return <></>;
  }
  const centers: IPosition[] = props.elements.map((el, index) => {
    return polarToCartesian(
      props.R0,
      props.deltaDegree + (index * 360) / props.elements.length
    );
  });

  return (
    <>
      <g>
        {props.showOrbit && (
          <circle
            cx={0}
            cy={0}
            r={props.R0}
            stroke="black"
            strokeOpacity="0.5"
            strokeDasharray="5,5"
            strokeWidth="2"
            fill="none"
          />
        )}
        {props.elements.map((el, index) => {
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

export default observer(SVGElementsInCircle);
