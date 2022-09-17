import { observer } from "mobx-react-lite";
import React from "react";
import { IStores } from "../../stores/RootStore";
import NetworkZoomable from "./NetworkZoomable";

function convertStringToNumberWithoutLast(
  original: string,
  amount_last: number
): number {
  const result = parseInt(original.slice(0, original.length - amount_last), 10);
  return result;
}

interface INetworkItemNoSSR {
  stores: IStores;
  item_title: string;
  item_id: string;
}

const NetworkItem: React.FunctionComponent<INetworkItemNoSSR> = (props) => {
  const stores = props.stores;

  stores.baseStore.setScreenNoSSR();

  // const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  // const heightTopAndBottom = GUI_CONFIG.display.heightTopAndBottom;
  // const height = stores.baseStore.screen.height - 1.0 * heightTopAndBottom;

  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const heightBody = GUI_CONFIG.display.layout.heightBody;

  const height =
    stores.baseStore.screen.height *
    0.01 *
    convertStringToNumberWithoutLast(heightBody, 2);
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

export default observer(NetworkItem);
