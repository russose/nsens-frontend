import { observer } from "mobx-react-lite";
import React from "react";
import { IPosition, ISlider, SVG_T } from "../../config/globals";
import { range } from "../../libs/utils";
import { indexFromTick, sliceArrayCascadeDisplayed } from "../../libs/utilsSVG";
import { IStores } from "../../stores/RootStore";
import SVGElementsInCircle from "./SVGElementsInCircle";
import SVGItem from "./SVGItem";
import SVGSlider from "./SVGSlider";

interface IProps {
  stores: IStores;
  id: string;
  root_element: SVG_T;
  closed: boolean;
  elements_body_all_SVG_or_ItemIds: string[] | SVG_T[];
  elements_body_all_ItemIds?: boolean;
  edges_labels?: string[];
  R0_large: number;
  amountElementsLevel: number;
  translation?: IPosition;
}

const maxAmountCascade = 2;
const deltaDegreeElementsInCircle = 45;

const SVGElementsInCircleWithSlider: React.FunctionComponent<IProps> = (
  props
) => {
  let closed_ = false;
  if (
    props.closed === true ||
    props.elements_body_all_SVG_or_ItemIds === undefined ||
    props.elements_body_all_SVG_or_ItemIds.length === 0 ||
    props.R0_large === undefined ||
    props.R0_large <= 0 ||
    props.amountElementsLevel === undefined ||
    props.amountElementsLevel <= 0
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
    (display.atom_sizes.height / 2) * display.layout.SVG_Slider_Circle_Ratio;
  const l = props.elements_body_all_SVG_or_ItemIds.length;
  const R0_large = props.R0_large;
  let amountElementsLevel_ = props.amountElementsLevel;
  let maxAmountCascade_ = maxAmountCascade;
  let displaySlider = closed_ !== true;
  if (l <= props.amountElementsLevel + maxAmountCascade) {
    amountElementsLevel_ = l;
    maxAmountCascade_ = 0;
    displaySlider = false;
  }
  const max = Math.floor((l * 360) / amountElementsLevel_);

  let slider: ISlider = props.stores.uiStore.sliders.get(props.id);
  if (slider === undefined || slider.max !== max) {
    props.stores.uiStore.initSlider(props.id, max);
    slider = props.stores.uiStore.sliders.get(props.id);
  }

  let i = indexFromTick(slider.position, amountElementsLevel_);
  let elements_boby: SVG_T[];
  if (props.elements_body_all_ItemIds === true) {
    const elements_boby_ids = sliceArrayCascadeDisplayed<string>(
      props.elements_body_all_SVG_or_ItemIds,
      amountElementsLevel_,
      maxAmountCascade_,
      i
    );
    elements_boby = elements_boby_ids.map((itemId, index) => {
      return (
        <SVGItem
          key={`SVGElementsInCircleWithSlider-${itemId}`}
          stores={props.stores}
          item={props.stores.baseStore.getHistoryItem(itemId)}
        />
      );
    });
  } else {
    const elements_boby_ids = sliceArrayCascadeDisplayed<number>(
      range(l),
      amountElementsLevel_,
      maxAmountCascade_,
      i
    );
    elements_boby = elements_boby_ids.map((idx) => {
      return props.elements_body_all_SVG_or_ItemIds[idx];
    });
  }

  let edges_ids: string[] = undefined;
  let edges_labels_with_ids: string[] = undefined;
  if (props.edges_labels !== undefined) {
    const edges_labels: string[] = sliceArrayCascadeDisplayed<string>(
      props.edges_labels,
      amountElementsLevel_,
      maxAmountCascade_,
      i
    );

    edges_ids = sliceArrayCascadeDisplayed<string>(
      props.edges_labels.map((label, id) => {
        return id.toString();
      }),
      amountElementsLevel_,
      maxAmountCascade_,
      i
    );

    edges_labels_with_ids = edges_labels
      .map((label, id) => {
        return edges_ids[id] + ": " + label;
      })
      .slice(Math.max(maxAmountCascade_ - 1, 0), amountElementsLevel_ + 1);
  }

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

        <SVGElementsInCircle
          stores={props.stores}
          elements={elements_boby}
          edges_ids={edges_ids}
          edges_legend={edges_labels_with_ids}
          R0={R0_large}
          amountDisplayed={amountElementsLevel_}
          tick={slider.position}
          amountCascade={maxAmountCascade_}
          deltaDegree={deltaDegreeElementsInCircle}
          showOrbit={true}
        />
      </g>
    </>
  );
};

export default observer(SVGElementsInCircleWithSlider);
