import React from "react";
import { observer } from "mobx-react-lite";
import { ISlider } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { onSliderPositionChange } from "../handlers/handlers_Searchbar_Navigation";
import SVGSliderShapeCircular from "./SVGSliderShapeCircular";

export type Props = {
  stores: IStores;
  slider: ISlider;
};

const SVGSlider: React.FunctionComponent<Props> = (props) => {
  // let radiusSlider =
  //   props.stores.baseStore.GUI_CONFIG.display.layout.radiusSlider;

  // let deltaX = 0;
  // let deltaY =
  //   (props.stores.baseStore.GUI_CONFIG.display.knowbook_sizes.height * 3) / 4;

  // if (isMobile(props.stores)) {
  // deltaX = -props.stores.baseStore.screen.width / 2 + radiusSlider * 2;
  // deltaY = R0 + radiusSlider * 2;

  const deltaX = 0;
  const deltaY = 0;
  const radiusSlider =
    (props.stores.baseStore.GUI_CONFIG.display.atom_sizes.height / 2) * 1.3;
  // }

  return (
    <g transform={`translate(${deltaX}, ${deltaY}) `}>
      <SVGSliderShapeCircular
        slider={props.slider}
        // width_slider={props.width_slider}
        onSliderChange={onSliderPositionChange(props.stores, props.slider.id)}
        radius={radiusSlider}
      />
    </g>
  );
};

export default observer(SVGSlider);
