import { observer } from "mobx-react-lite";
import React from "react";
import { ICardKnowProps } from "../config/globals";
import CardKnow from "./CardKnow";

const SVGKnowbook: React.FunctionComponent<ICardKnowProps> = (props) => {
  const size = props.stores.baseStore.GUI_CONFIG.display.knowbook_sizes.height;
  if (props.id === undefined) {
    return <></>;
  }
  return (
    <foreignObject x={-size / 2} y={-size / 2} width={size} height={size}>
      <CardKnow
        stores={props.stores}
        id={props.id}
        title={props.title}
        image_url={props.image_url}
        pathname={props.pathname}
        queryObject={props.queryObject}
        amount={props.amount}
        edit_handler={props.edit_handler}
        delete_handler={props.delete_handler}
      />
    </foreignObject>
  );
};

export default observer(SVGKnowbook);
