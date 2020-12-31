import { Group } from "@visx/group";
import { observer } from "mobx-react-lite";
import React from "react";
import { GUI_CONFIG } from "../../common/config";
import { ParentSize_ } from "../../libs/utils";
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

const margin = 5;
const size_factor = 4;
const max_nodes_network = GUI_CONFIG.display.max_nodes_network;
const max_width_network = GUI_CONFIG.display.max_width_network;

// const ParentSize_ = observer(ParentSize);

const NetworkZoomable: React.FunctionComponent<INetworkZoomableProps> = (
  props
) => {
  const stores = useStores();

  const amount_nodes = Array.from(stores.graphStore.graphMap.values()).reduce(
    (acc, value) => {
      return acc + value.length;
    },
    0
  );
  function networkNodeDisplayed(width: number): boolean {
    if (width === 0) {
      return undefined;
    }
    return width > max_width_network && amount_nodes < max_nodes_network;
  }
  return (
    <ParentSize_>
      {(parent) => (
        <>
          {stores.graphStore.renderGraph(
            props.itemId,
            stores.feedStore,
            size_factor * parent.width,
            size_factor * parent.height
          )}
          <>
            {networkNodeDisplayed(parent.width) ? (
              <MyZoom
                width={parent.width - margin}
                height={parent.height - margin}
              >
                <Group
                  left={(-parent.width * (size_factor - 1)) / 2}
                  top={(-parent.height * (size_factor - 1)) / 2}
                >
                  <Network
                    width={size_factor * parent.width}
                    height={size_factor * parent.height}
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
      )}
    </ParentSize_>
  );
};

export default observer(NetworkZoomable);
