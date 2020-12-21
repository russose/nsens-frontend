import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { observer } from "mobx-react-lite";
import React from "react";
import { USER_DISPLAY } from "../../common/config";
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
const max_nodes_network = USER_DISPLAY.max_nodes_network;
const max_width_network = USER_DISPLAY.max_width_network;

const NetworkZoomable: React.FunctionComponent<INetworkZoomableProps> = (
  props
) => {
  const {
    uiStore,
    feedStore,
    graphStore,
    savedStore,
    knowbookStore,
    userStore,
  } = useStores();

  const amount_nodes = Array.from(graphStore.graphMap.values()).reduce(
    (acc, value) => {
      return acc + value.length;
    },
    0
  );
  function displayConditionNetwork(width: number): boolean {
    if (width === 0) {
      return undefined;
    }
    return width > max_width_network && amount_nodes < max_nodes_network;
  }
  return (
    <ParentSize>
      {(parent) => (
        <>
          {graphStore.renderGraph(
            props.itemId,
            feedStore,
            size_factor * parent.width,
            size_factor * parent.height
          )}
          <>
            {displayConditionNetwork(parent.width) ? (
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
              <NetworkFlat
                rootItemId={props.itemId}
                graphStore={graphStore}
                savedStore={savedStore}
                userStore={userStore}
                knowbookStore={knowbookStore}
                feedStore={feedStore}
                uiStore={uiStore}
              />
            )}
          </>
        </>
      )}
    </ParentSize>
  );
};

export default observer(NetworkZoomable);
