import { observer } from "mobx-react-lite";
import React from "react";

interface IProps {
  size: number;
}

const SVGKnowbookExternalShape: React.FunctionComponent<IProps> = (props) => {
  const size = props.size * 1.04;
  const color = "black";
  // const color = "#020723";

  return (
    <circle
      cx={0}
      cy={0}
      r={`${size / 2}`}
      fill={color}
      // opacity={0.8}
      // stroke="black"
      stroke="white"
      strokeWidth="3"
      // strokeOpacity={1}
    />
  );
};

export default observer(SVGKnowbookExternalShape);
