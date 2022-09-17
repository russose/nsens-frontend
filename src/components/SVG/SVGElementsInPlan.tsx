import { observer } from "mobx-react-lite";
import React from "react";
import { IPosition, SVG_T } from "../../config/globals";
import { range } from "../../libs/utils";
import { IStores } from "../../stores/RootStore";
import SVGElementsInPositionMatrix from "./SVGElementsInPositionMatrix";

interface IProps {
  stores: IStores;
  elements: SVG_T[];
  nb_width: number;
  deltaStep: number;
  tick: number;
}

const SVGElementsInPlan: React.FunctionComponent<IProps> = (props) => {
  if (props.elements === undefined || props.elements.length === 0) {
    return <></>;
  }

  const l = props.nb_width * props.nb_width;
  const l_mid = Math.floor(l / 2);
  const elements_ = props.elements;
  const elements = [
    ...elements_.slice(0, l_mid),
    <></>,
    ...elements_.slice(l_mid, l),
  ];

  const deltaStep = props.deltaStep;
  const idx_max = props.nb_width;
  const xi_max = idx_max - 1;
  const yi_max = idx_max - 1;
  const x0 = xi_max * deltaStep * 0.5;
  const y0 = yi_max * deltaStep * 0.5;

  const positions: IPosition[] = range(elements.length).map((idx) => {
    const yi = Math.floor(idx / idx_max);
    const xi = idx - idx_max * yi;

    return {
      // x: xi * deltaStep - x0, => for other direction
      // y: yi * deltaStep - y0, => for other direction
      x: (xi_max - xi) * deltaStep - x0,
      y: (yi_max - yi) * deltaStep - y0,
    };
  });

  return (
    <>
      <SVGElementsInPositionMatrix elements={elements} positions={positions} />
    </>
  );
};

export default observer(SVGElementsInPlan);
