import { observer } from "mobx-react-lite";
import React from "react";

interface IProps {
  text: string;
  angle: number;
  lenght: number;
  start_rate: number;
  end_rate: number;
  fontsize: string;
}

const SVGEdge: React.FunctionComponent<IProps> = (props) => {
  return (
    <>
      <g transform={`rotate(${props.angle - 180}) `}>
        <line
          x1="0"
          y1={`${props.lenght * props.start_rate} `}
          x2="0"
          y2={`${props.lenght * props.end_rate} `}
          stroke="black"
          strokeWidth="1"
          // strokeDasharray="5,5"
        />

        <g
          transform={`translate(${5}, ${
            -5 +
            props.lenght *
              (props.start_rate + (props.end_rate - props.start_rate) / 2)
          }) `}
        >
          <g transform={`rotate(${90}) `}>
            <text
              x="0"
              y="0"
              fontFamily="Verdana"
              fontSize={props.fontsize}
              fontWeight="bold"
            >
              {props.text}
            </text>
          </g>
        </g>
      </g>
    </>
  );
};

export default observer(SVGEdge);
