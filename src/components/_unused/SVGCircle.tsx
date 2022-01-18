import React from "react";

interface IProps {
  R: number;
  color: string;
  title?: number;
}

const SVGCircle: React.FunctionComponent<IProps> = (props) => {
  return (
    <>
      <circle cx={0} cy={0} r={props.R} fill={props.color} />
      <text x="2" y="-2" fontFamily="Verdana" fontSize="12">
        {props.title}
      </text>
    </>
  );
};

export default SVGCircle;
