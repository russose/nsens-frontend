import { Group } from "@visx/group";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import React from "react";
import { renderGraph } from "../../libs/helpersGraph";
import { IStores } from "../../stores/RootStore";
import MyZoom from "./MyZoom";

const NetworkDynamic = dynamic(() => import("./Network"), {
  ssr: false,
});
const NetworkFlatDynamic = dynamic(() => import("./NetworkFlat"), {
  ssr: false,
});

export type INetworkZoomableProps = {
  itemId: string;
  stores: IStores;
  title: string;
  width: number;
  height: number;
};

const NetworkZoomable: React.FunctionComponent<INetworkZoomableProps> = (
  props
) => {
  // const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  // const max_nodes_network = GUI_CONFIG.display.max_nodes_network;

  // const margin = 5;
  // const size_factor = 4; //4
  // const width = props.width * 0.95 - margin;
  // const height = props.height * 0.95 - margin;

  const margin = 5;
  const size_factor = 4; //4
  const width = props.width - margin;
  const height = props.height - margin;

  // const amount_nodes = Array.from(
  //   props.stores.graphStore.relatedMap.values()
  // ).reduce((acc, value) => {
  //   return acc + value.length;
  // }, 0);
  function networkNodeDisplayed(): boolean {
    // return amount_nodes < max_nodes_network;
    // return !isMobile(props.stores) && amount_nodes < max_nodes_network;
    return true;
    // return amount_nodes < max_nodes_network;
  }

  return (
    <>
      {renderGraph(
        props.itemId,
        props.stores,
        size_factor * width,
        size_factor * height
      )}
      <>
        {networkNodeDisplayed() ? (
          <MyZoom width={width} height={height}>
            <Group
              left={(-width * (size_factor - 1)) / 2}
              top={(-height * (size_factor - 1)) / 2}
            >
              <NetworkDynamic
                width={size_factor * width}
                height={size_factor * height}
                itemId={props.itemId}
                title={props.title}
                stores={props.stores}
              />
            </Group>
          </MyZoom>
        ) : (
          <NetworkFlatDynamic rootItemId={props.itemId} stores={props.stores} />
          // <NetworkFlat rootItemId={props.itemId} stores={props.stores} />
        )}
      </>
    </>
  );
};

export default observer(NetworkZoomable);
