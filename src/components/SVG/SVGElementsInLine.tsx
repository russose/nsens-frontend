import { observer } from "mobx-react-lite";
import React from "react";
import { configGeneral, IPosition, SVG_T } from "../../config/globals";
import SVGElementsInPositionMatrix from "./SVGElementsInPositionMatrix";

interface IProps {
  elements: SVG_T[];
  deltaX: number;
  showOrbit?: boolean;
}

const SVGElementsInLine: React.FunctionComponent<IProps> = (props) => {
  if (props.elements.length === 0) {
    return <></>;
  }
  const color: any = configGeneral.colors.svg_elements;
  const centers: IPosition[] = props.elements.map((el, index) => {
    return { x: index * props.deltaX, y: 0 };
  });

  return (
    <>
      {props.showOrbit && props.showOrbit !== undefined && (
        <line
          x1={0}
          y1={0}
          x2={centers.slice(-1)[0].x}
          y2={0}
          // stroke="black"
          stroke={color}
          strokeOpacity="0.5"
          strokeDasharray="5,5"
          strokeWidth="2"
          fill="none"
        />
      )}
      <SVGElementsInPositionMatrix
        elements={props.elements}
        positions={centers}
      />
    </>
  );
};

export default observer(SVGElementsInLine);
