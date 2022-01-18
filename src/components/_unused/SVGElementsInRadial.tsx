import React from "react";
import { IPosition, SVG_T } from "../../config/globals";
import { polarToCartesian } from "../../libs/utilsSVG";

interface IProps {
  elements: SVG_T[][];
  R0: number;

  deltaR: number;

  showOrbit: boolean;
}

const SVGElementsInRadial: React.FunctionComponent<IProps> = (props) => {
  if (props.elements.length === 0) {
    return <></>;
  }
  const centers: IPosition[][] = props.elements.map((els, index_els) => {
    return els.map((el, index_el) => {
      return polarToCartesian(
        props.R0 + index_el * props.deltaR,
        (index_els * 360) / props.elements.length
      );
    });
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
            // strokeOpacity="0.5"
            strokeDasharray="5,5"
            fill="none"
          />
        )}
        {props.showOrbit && (
          <circle
            cx={0}
            cy={0}
            r={props.R0 + (props.elements[0].length - 1) * props.deltaR}
            stroke="black"
            // strokeOpacity="0.5"
            strokeDasharray="5,5"
            fill="none"
          />
        )}
        {props.elements.map((els, index_els) => {
          return els.map((el, index_el) => {
            return (
              <>
                {index_el < els.length - 1 && (
                  <line
                    x1={`${centers[index_els][index_el].x}`}
                    y1={`${centers[index_els][index_el].y}`}
                    x2={`${centers[index_els][index_el + 1].x}`}
                    y2={`${centers[index_els][index_el + 1].y}`}
                    stroke="black"
                    // strokeOpacity="0.5"
                    // strokeDasharray="5,5"
                  />
                )}
                <g
                  key={`test${index_els}${index_el}`}
                  transform={`translate(${centers[index_els][index_el].x}, ${centers[index_els][index_el].y}) `}
                >
                  {el}
                </g>
              </>
            );
          });
        })}
      </g>
    </>
  );
};

export default SVGElementsInRadial;
