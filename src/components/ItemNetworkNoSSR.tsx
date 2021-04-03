import { observer } from "mobx-react-lite";
import React from "react";
import { GUI_CONFIG_T } from "../common/configGUI";
import { IStores } from "../stores/_RootStore";
import NetworkZoomable from "./vizs/NetworkZoomable";

interface ItemNetworkNoSSR {
  stores: IStores;
  GUI_CONFIG: GUI_CONFIG_T;
  item_title: string;
  item_id: string;
}

const ItemNetworkNoSSR: React.FunctionComponent<ItemNetworkNoSSR> = (props) => {
  const stores = props.stores;

  const GUI_CONFIG = props.GUI_CONFIG;
  const heightTopAndBottom = GUI_CONFIG.display.heightTopAndBottom;
  const height = stores.userStore.screen.height - 1.0 * heightTopAndBottom;
  const width = stores.userStore.screen.width;

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
