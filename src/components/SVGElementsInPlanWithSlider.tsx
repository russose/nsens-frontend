import { observer } from "mobx-react-lite";
import React from "react";
import { IPosition, ISlider, SVG_T } from "../config/globals";
import { estPair, range } from "../libs/utils";
import { indexFromTick, SVGMaxRadius } from "../libs/utilsSVG";
import { IStores } from "../stores/RootStore";
import SVGElementsInPlan from "./SVGElementsInPlan";
import SVGSlider from "./SVGSlider";

interface IProps {
  stores: IStores;
  id: string;
  root_element: SVG_T;
  closed: boolean;
  elements_body_all_SVG_or_ItemIds: string[] | SVG_T[];
  translation?: IPosition;
}

const SVGElementsInPlanWithSlider: React.FunctionComponent<IProps> = (
  props
) => {
  let closed_ = false;
  if (
    props.closed === true ||
    props.elements_body_all_SVG_or_ItemIds === undefined ||
    props.elements_body_all_SVG_or_ItemIds.length === 0
  ) {
    closed_ = true;
  }

  const center: IPosition =
    props.translation === undefined ? { x: 0, y: 0 } : props.translation;

  if (closed_) {
    return (
      <>
        <g transform={`translate(${center.x}, ${center.y}) `}>
          {props.root_element}
        </g>
      </>
    );
  }

  const display = props.stores.baseStore.GUI_CONFIG.display;
  const radiusSlider =
    (display.atom_sizes.height / 2) * display.layout.SVG_Slider_Grid_Ratio;
  const l = props.elements_body_all_SVG_or_ItemIds.length;

  const deltaStep =
    props.stores.baseStore.GUI_CONFIG.display.knowbook_sizes.height *
    display.layout.SVG_deltaStepGrid_Ratio;
  const nb_width_max = Math.floor(
    (2 * SVGMaxRadius(props.stores, false)) / deltaStep
  );
  const nb_width = Math.floor(Math.sqrt(l));
  let nb_width_;
  if (nb_width <= 3) {
    nb_width_ = 3;
  } else if (nb_width > nb_width_max) {
    nb_width_ = estPair(nb_width_max) ? nb_width_max + 1 : nb_width_max;
  } else {
    nb_width_ = estPair(nb_width) ? nb_width + 1 : nb_width;
  }

  const nb_height_ = nb_width_;
  let amountElementsLevel_ = nb_width_ * nb_height_ - 1;

  let displaySlider = closed_ !== true;
  if (l <= amountElementsLevel_) {
    // amountElementsLevel_ = l;
    displaySlider = false;
  }
  const max = Math.floor(
    ((l - amountElementsLevel_) * 360) / amountElementsLevel_
  );

  let slider: ISlider = props.stores.uiStore.sliders.get(props.id);
  if (slider === undefined || slider.max !== max) {
    props.stores.uiStore.initSlider(props.id, max);
    slider = props.stores.uiStore.sliders.get(props.id);
  }

  let i = indexFromTick(slider.position, amountElementsLevel_);
  let elements_boby: SVG_T[];

  const elements_boby_ids = range(l).slice(i, i + amountElementsLevel_);
  elements_boby = elements_boby_ids.map((idx) => {
    return props.elements_body_all_SVG_or_ItemIds[idx];
  });

  return (
    <>
      <g transform={`translate(${center.x}, ${center.y}) `}>
        {displaySlider && (
          <SVGSlider
            stores={props.stores}
            slider={slider}
            radius={radiusSlider}
          />
        )}

        {props.root_element}

        <SVGElementsInPlan
          stores={props.stores}
          elements={elements_boby}
          nb_width={nb_width_}
          deltaStep={deltaStep}
          tick={slider.position}
        />
      </g>
    </>
  );
};

export default observer(SVGElementsInPlanWithSlider);
