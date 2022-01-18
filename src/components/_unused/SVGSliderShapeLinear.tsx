import React from "react";
import { observer } from "mobx-react-lite";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
import "rc-slider/assets/index.css";
import { handlerT, ISlider } from "../../config/globals";

type ISVGSliderShapeLinearProps = {
  slider: ISlider;
  width_slider: number;
  onSliderChange: handlerT;
};

const height_rail = 10;
const height_handle = height_rail * 1.2;

const distanceFromCenter = 100;

const SVGSliderShapeLinear: React.FunctionComponent<ISVGSliderShapeLinearProps> =
  (props) => {
    const width_slider = props.width_slider;

    return (
      <>
        <g transform={`translate(${0}, ${distanceFromCenter}) `}>
          <foreignObject
            x={-width_slider / 2 - height_handle / 2}
            y={-height_handle / 2}
            width={width_slider * 2}
            height={height_handle * 2}
          >
            <div
              style={{
                width: width_slider,
                height: height_handle * 1.2,
                margin: height_handle / 2,
                // backgroundColor: "green",
              }}
            >
              {/* <Slider
                min={0}
                max={props.slider.maxOneStep}
                value={props.slider.positionOneStep}
                onChange={props.onSliderChange}
                // value={props.stores.uiStore.getSliderPosition(props.id)}
                // onChange={onSliderPositionChange(props.stores, props.id)}
                railStyle={{
                  height: height_rail,
                  // backgroundColor: "gray",
                }}
                handleStyle={{
                  height: height_handle,
                  width: height_handle,
                  marginLeft: 0,
                  marginTop: -(height_handle - height_rail) / 2,
                  backgroundColor: "DarkGray",
                  border: 0,
                }}
                trackStyle={{
                  background: "none",
                }}
              /> */}
            </div>
          </foreignObject>
        </g>
      </>
    );
  };

export default observer(SVGSliderShapeLinear);
