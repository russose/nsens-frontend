import { observer } from "mobx-react-lite";
import React from "react";
import { IPosition, SVG_T } from "../../config/globals";

interface IProps {
  elements: SVG_T[];
}

const increment = 10;

const SVGElementsCascade: React.FunctionComponent<IProps> = (props) => {
  if (props.elements.length === 0) {
    return <></>;
  }

  const elements_ = props.elements;

  const centers: IPosition[] = elements_.map((el, index) => {
    return { x: index * increment, y: index * increment };
  });

  return (
    <>
      <g
        transform={`translate(${-elements_.length * increment}, ${
          -elements_.length * increment
        }) `}
      >
        {elements_.map((el, index) => {
          return (
            <g
              key={`SVGElementsCascade${index}`}
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

export default observer(SVGElementsCascade);
