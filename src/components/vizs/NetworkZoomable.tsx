import { Group } from "@visx/group";
import { observer } from "mobx-react-lite";
import React from "react";
import { GUI_CONFIG } from "../../common/config";
import { GraphStore } from "../../stores/GraphStore";
import { useStores } from "../../stores/_RootStoreHook";
import MyZoom from "./MyZoom";
import Network from "./Network";
import NetworkFlat from "./NetworkFlat";

export type INetworkZoomableProps = {
  itemId: string;
  title: string;
  graphStore: GraphStore;
};

// const ParentSize_ = observer(ParentSize);

const NetworkZoomable: React.FunctionComponent<INetworkZoomableProps> = (
  props
) => {
  const margin = 5;
  const size_factor = 4;
  const max_nodes_network = GUI_CONFIG.display.max_nodes_network;
  const deltaScreenViewport = GUI_CONFIG.display.deltaScreenViewport;

  const stores = useStores();
  const width = stores.uiStore.screen.width * 0.98;
  const height = stores.uiStore.screen.height - deltaScreenViewport;

  const amount_nodes = Array.from(stores.graphStore.graphMap.values()).reduce(
    (acc, value) => {
      return acc + value.length;
    },
    0
  );
  function networkNodeDisplayed(): boolean {
    return amount_nodes < max_nodes_network;
  }

  return (
    // <ParentSize_>
    //   {(parent) => (
    <>
      {stores.graphStore.renderGraph(
        props.itemId,
        stores.feedStore,
        size_factor * width,
        size_factor * height
      )}
      <>
        {networkNodeDisplayed() ? (
          <MyZoom width={width - margin} height={height - margin}>
            <Group
              left={(-width * (size_factor - 1)) / 2}
              top={(-height * (size_factor - 1)) / 2}
            >
              <Network
                width={size_factor * width}
                height={size_factor * height}
                itemId={props.itemId}
                title={props.title}
                graphStore={props.graphStore}
              />
            </Group>
          </MyZoom>
        ) : (
          <NetworkFlat rootItemId={props.itemId} stores={stores} />
        )}
      </>
    </>
    //   )}
    // </ParentSize_>
  );
};

export default observer(NetworkZoomable);
