import { observer } from "mobx-react-lite";
import React from "react";
import { IPosition } from "../../config/globals";
import { range } from "../../libs/utils";
import { polarToCartesian } from "../../libs/utilsSVG";

interface IProps {
  n: number;
  R0: number;
  deltaDegree?: number;
}

const SVGPolyPath: React.FunctionComponent<IProps> = (props) => {
  const deltaDegree_ = props.deltaDegree === undefined ? 0 : props.deltaDegree;
  const deltaAngle: number = 360 / props.n;

  const points: IPosition[] = range(props.n).map((idx) => {
    return polarToCartesian(props.R0, idx * deltaAngle + deltaDegree_);
  });

  let path = "";
  points.forEach((point, ind) => {
    if (ind === 0) {
      path = path + `M${point.x} ${point.y}`;
    } else {
      path = path + ` L${point.x} ${point.y}`;
    }
  });

  path = path + " Z";

  return (
    <>
      <path d={path} fill="transparent" stroke="white" strokeWidth="4" />
    </>
  );
};

export default observer(SVGPolyPath);
