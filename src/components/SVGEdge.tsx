import { observer } from "mobx-react-lite";
import React from "react";
import { configGeneral } from "../config/configLocalAndEnv";

interface IProps {
  text: string;
  angle: number;
  lenght: number;
  start_rate: number;
  end_rate: number;
  fontsize: string;
}

const SVGEdge: React.FunctionComponent<IProps> = (props) => {
  const color: any = configGeneral.colors.svg_elements;
  return (
    <>
      <g transform={`rotate(${props.angle - 180}) `}>
        <line
          x1="0"
          y1={`${props.lenght * props.start_rate} `}
          x2="0"
          y2={`${props.lenght * props.end_rate} `}
          stroke={color}
          strokeWidth="1"
          // strokeDasharray="5,5"
        />

        <g
          transform={`translate(${5}, ${
            props.lenght *
            (props.start_rate + (props.end_rate - props.start_rate) * 0.5)
          }) `}
        >
          <g transform={`rotate(${90}) `}>
            <text
              x="0"
              y="0"
              fontFamily="Verdana"
              fontSize={props.fontsize}
              fontWeight="bold"
              fill={color}
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
