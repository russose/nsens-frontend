import React from "react";
import { observer } from "mobx-react-lite";
import { ISlider } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { onSliderPositionChange } from "../handlers/handlers_Searchbar_Navigation";
import SVGSliderShapeCircular from "./SVGSliderShapeCircular";

export type Props = {
  stores: IStores;
  slider: ISlider;
  radius: number;
};

const SVGSlider: React.FunctionComponent<Props> = (props) => {
  const deltaX = 0;
  const deltaY = 0;

  return (
    <g transform={`translate(${deltaX}, ${deltaY}) `}>
      <SVGSliderShapeCircular
        slider={props.slider}
        onSliderChange={onSliderPositionChange(props.stores, props.slider.id)}
        radius={props.radius}
      />
    </g>
  );
};

export default observer(SVGSlider);
