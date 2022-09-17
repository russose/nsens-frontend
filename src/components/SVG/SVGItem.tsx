import { observer } from "mobx-react-lite";
import React from "react";
import { IAtom } from "../../config/globals";
import { IStores } from "../../stores/RootStore";
import dynamic from "next/dynamic";
import CardAtom_NotLogged from "./../CardAtom_NotLogged";

const CardAtomLogged_D = dynamic(() => import("./../CardAtom_Logged"));

interface IProps {
  stores: IStores;
  item: IAtom;
}

const SVGItem: React.FunctionComponent<IProps> = (props) => {
  // const RATION_H_W =
  //   props.stores.baseStore.GUI_CONFIG.display.layout.ratio_H_W_Item;
  // const height =
  //   props.stores.baseStore.GUI_CONFIG.display.atom_sizes.height / RATION_H_W;
  // const width =
  //   props.stores.baseStore.GUI_CONFIG.display.atom_sizes.height / RATION_H_W;
  const height = props.stores.baseStore.GUI_CONFIG.display.atom_sizes.height;
  const width = props.stores.baseStore.GUI_CONFIG.display.atom_sizes.height;
  const size_factor =
    props.stores.baseStore.GUI_CONFIG.display.layout.card_size_factor;
  const item = props.item;
  const stores = props.stores;

  if (item === undefined) {
    return <></>;
  }

  props.stores.baseStore.setGoodImageInHistoryItem(item.id);

  let cardAtom;
  if (props.stores.baseStore.isLogged) {
    cardAtom = (
      <CardAtomLogged_D
        stores={stores}
        item={props.item}
        size_factor={size_factor}
      />
    );
  } else {
    cardAtom = (
      <CardAtom_NotLogged
        stores={stores}
        item={props.item}
        size_factor={size_factor}
      />
    );
  }

  return (
    <foreignObject
      x={-(width * size_factor) / 2}
      y={-(height * size_factor) / 2}
      width={width * size_factor}
      height={height * size_factor}
    >
      <div className="anim-element">{cardAtom}</div>
    </foreignObject>
  );
};

export default observer(SVGItem);
