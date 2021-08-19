import { observer } from "mobx-react-lite";
import React from "react";
import { IStores } from "../stores/RootStore";
import NetworkZoomable from "./vizs/NetworkZoomable";

interface ItemNetworkNoSSR {
  stores: IStores;
  item_title: string;
  item_id: string;
}

const ItemNetworkNoSSR: React.FunctionComponent<ItemNetworkNoSSR> = (props) => {
  const stores = props.stores;

  stores.baseStore.setscreenNoSSR();

  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const heightTopAndBottom = GUI_CONFIG.display.heightTopAndBottom;
  const height = stores.baseStore.screen.height - 1.0 * heightTopAndBottom;
  const width = stores.baseStore.screen.width;

  return (
    <NetworkZoomable
      itemId={props.item_id}
      stores={stores}
      title={props.item_title}
      height={height}
      width={width}
    />
  );
};

export default observer(ItemNetworkNoSSR);
