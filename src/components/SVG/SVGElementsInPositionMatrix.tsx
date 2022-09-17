import { observer } from "mobx-react-lite";
import React from "react";
import { IPosition, SVG_T } from "../../config/globals";

interface IProps {
  elements: SVG_T[];
  positions: IPosition[];
}

const SVGElementsInPositionMatrix: React.FunctionComponent<IProps> = (
  props
) => {
  if (
    props.elements.length === 0 ||
    props.elements.length !== props.positions.length
  ) {
    return <></>;
  }

  return (
    <>
      {props.elements.map((el, index) => {
        return (
          <g
            key={`SVGElementsInPositionMatrix${index}`}
            transform={`translate(${props.positions[index].x}, ${props.positions[index].y}) `}
          >
            {el}
          </g>
        );
      })}
    </>
  );
};

export default observer(SVGElementsInPositionMatrix);
