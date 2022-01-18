import { observer } from "mobx-react-lite";
import React from "react";
import { IPage } from "../../../src/libs/getDataParamsPage";
import { IPosition } from "../../../src/config/globals";
import { range } from "../../../src/libs/utils";
import SVGCircle from "../../../src/components/_unused/SVGCircle";
import SVGElementsInRadial from "../../../src/components/_unused/SVGElementsInRadial";

const center: IPosition = { x: 500, y: 500 };
const R0_large = 160;
const R0_small = 80;

interface ISVGCatProps {
  // stores: IStores;
  title?: number;
}

interface ISVGItemProps {
  //   stores: IStores;
  title?: number;
}

const SVGCat: React.FunctionComponent<ISVGCatProps> = (props) => {
  return <SVGCircle R={5} color="green" title={props.title} />;
};

const SVGItem: React.FunctionComponent<ISVGItemProps> = (props) => {
  return <SVGCircle R={5} color="blue" title={props.title} />;
};

const Viz: React.FunctionComponent<IPage> = (props) => {
  const elements: any[] = range(10).map((item, index) => {
    let elements_: any[] = range(3).map((item, index) => {
      return <SVGItem title={index} />;
    });

    return elements_;
  });

  let page_content;
  page_content = (
    <>
      <svg
        // viewBox="0 0 100 100"
        style={{
          width: "100%",
          height: "200vh",
          background: "white",
          marginLeft: "00px",
        }}
      >
        <g transform={`translate(${center.x}, ${center.y}) `}>
          {
            <SVGElementsInRadial
              elements={elements}
              R0={R0_large}
              deltaR={R0_small * 1.2}
              showOrbit={true}
            />
          }
        </g>
      </svg>
    </>
  );

  /******************************************************** */
  return <>{page_content}</>;
};

export default observer(Viz);
