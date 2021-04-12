import { Group } from "@visx/group";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import React from "react";
import { isMobile } from "../../libs/utils";
import { IStores } from "../../stores/_RootStore";
import MyZoom from "./MyZoom";
// import Network from "./Network";
// import NetworkFlat from "./NetworkFlat";

const Network = dynamic(() => import("./Network"), { ssr: false });
const NetworkFlat = dynamic(() => import("./NetworkFlat"), { ssr: false });

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
  const margin = 5;
  const size_factor = 4;
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const max_nodes_network = GUI_CONFIG.display.max_nodes_network;
  // const heightTopAndBottom = GUI_CONFIG.display.heightTopAndBottom;

  const width = props.width * 0.95 - margin;
  const height = props.height * 0.95 - margin;

  const amount_nodes = Array.from(
    props.stores.graphStore.graphMap.values()
  ).reduce((acc, value) => {
    return acc + value.length;
  }, 0);
  function networkNodeDisplayed(): boolean {
    // return amount_nodes < max_nodes_network;
    return !isMobile(GUI_CONFIG.id) && amount_nodes < max_nodes_network;
  }

  return (
    <>
      {props.stores.graphStore.renderGraph(
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
              <Network
                width={size_factor * width}
                height={size_factor * height}
                itemId={props.itemId}
                title={props.title}
                stores={props.stores}
              />
            </Group>
          </MyZoom>
        ) : (
          <NetworkFlat rootItemId={props.itemId} stores={props.stores} />
        )}
      </>
    </>
  );
};

export default observer(NetworkZoomable);
