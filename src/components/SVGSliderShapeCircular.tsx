import React from "react";
import { observer } from "mobx-react-lite";
import CircularSlider from "@fseehawer/react-circular-slider";
import { handlerT, ISlider } from "../config/globals";

type ISVGSliderShapeCircularProps = {
  slider: ISlider;
  onSliderChange: handlerT;
  radius: number;
};

const MARGIN = 10;
const PROGRESS_SIZE = 8;

const SVGSliderShapeCircular: React.FunctionComponent<
  ISVGSliderShapeCircularProps
> = (props) => {
  const radius = props.radius;

  return (
    <>
      <foreignObject
        x={-radius - MARGIN}
        y={-radius - MARGIN}
        width={radius * 2 + 2 * MARGIN}
        height={radius * 2 + 2 * MARGIN}
      >
        <div
          style={{
            width: 2 * radius,
            height: 2 * radius,
            margin: MARGIN,
            // backgroundColor: "green",
          }}
        >
          <CircularSlider
            min={0}
            max={props.slider.maxOneStep}
            trackColor="#F9F9F9"
            width={2 * radius}
            hideLabelValue={true}
            hideKnob={false}
            knobSize={PROGRESS_SIZE * 4}
            progressSize={PROGRESS_SIZE}
            trackSize={PROGRESS_SIZE}
            onChange={props.onSliderChange}
          >
            <></>
          </CircularSlider>
        </div>
      </foreignObject>
    </>
  );
};

export default observer(SVGSliderShapeCircular);
