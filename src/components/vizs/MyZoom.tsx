/* eslint react/jsx-handler-names: "off" */
import React from "react";
import { observer } from "mobx-react-lite";
import { Zoom } from "@visx/zoom";
import { Group } from "@visx/group";

export type IMyZoomProps = {
  children?: React.ReactNode;
  width: number;
  height: number;
};

const scaleFactor = 16;

const initialTransform = {
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  skewX: 0,
  skewY: 0,
};

const MyZoom: React.FunctionComponent<IMyZoomProps> = (props) => {
  const width = props.width;
  const height = props.height;

  return (
    <>
      <Zoom<SVGSVGElement>
        width={width}
        height={height}
        scaleXMin={1 / scaleFactor}
        scaleXMax={scaleFactor}
        scaleYMin={1 / scaleFactor}
        scaleYMax={scaleFactor}
        initialTransformMatrix={initialTransform}
      >
        {(zoom: any) => (
          <div className="relative">
            <svg
              width={width}
              height={height}
              // style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
              style={{
                cursor: zoom.isDragging ? "grabbing" : "grab",
                touchAction: "none",
              }}
              ref={zoom.containerRef}
            >
              <rect
                width={width}
                height={height}
                rx={14}
                fill="transparent"
                // fill="red"
                onTouchStart={zoom.dragStart}
                onTouchMove={zoom.dragMove}
                onTouchEnd={zoom.dragEnd}
                onMouseDown={zoom.dragStart}
                onMouseMove={zoom.dragMove}
                onMouseUp={zoom.dragEnd}
                onMouseLeave={() => {
                  if (zoom.isDragging) zoom.dragEnd();
                }}
              />
              <Group transform={zoom.toString()}>{props.children}</Group>
            </svg>
          </div>
        )}
      </Zoom>
    </>
  );
};

export default observer(MyZoom);
