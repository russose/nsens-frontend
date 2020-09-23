import React from "react";
import { Group } from "@vx/group";
import { Cluster, hierarchy } from "@vx/hierarchy";
import {
  HierarchyPointNode,
  HierarchyPointLink,
} from "@vx/hierarchy/lib/types";
import { LinkVertical } from "@vx/shape";
import { NodeShape } from "../../../pages/Vizs";

export type DendrogramProps = {
  nodeComponent: any;
  graphData: NodeShape;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const black = "#000000";
const defaultMargin = { top: 20, left: 0, right: 0, bottom: 150 };
const widthNode = 100;
const heightNode = 200;
const centerY = -5;
const centerX = -widthNode / 2;
// const centerY = -height / 2;

function RootNode({
  node,
  nodeComponent,
}: {
  node: HierarchyPointNode<NodeShape>;
  nodeComponent: any;
}) {
  return (
    <Group top={node.y} left={node.x}>
      <foreignObject
        x={centerX}
        y={centerY}
        width={widthNode}
        height={heightNode}
      >
        {nodeComponent}
      </foreignObject>
    </Group>
  );
}

function Node({
  node,
  nodeComponent,
}: {
  node: HierarchyPointNode<NodeShape>;
  nodeComponent: any;
}) {
  const isRoot = node.depth === 0;

  if (isRoot) return <RootNode node={node} nodeComponent={nodeComponent} />;
  return (
    <Group top={node.y} left={node.x}>
      {node.depth !== 0 && (
        <foreignObject
          x={centerX}
          y={centerY}
          width={widthNode}
          height={heightNode}
        >
          {nodeComponent}
        </foreignObject>
      )}
    </Group>
  );
}

export default function Example({
  nodeComponent,
  graphData,
  width,
  height,
  margin = defaultMargin,
}: DendrogramProps) {
  // const data = useMemo(() => hierarchy<NodeShape>(graphData), []);
  const data = hierarchy<NodeShape>(graphData);
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  return width < 10 ? null : (
    <svg width={width} height={height}>
      {/* <rect width={width} height={height} rx={14} fill={background} /> */}

      <Cluster<NodeShape> root={data} size={[xMax, yMax]}>
        {(cluster) => (
          <Group top={margin.top} left={margin.left}>
            {cluster.links().map((link, i) => (
              <LinkVertical<
                HierarchyPointLink<NodeShape>,
                HierarchyPointNode<NodeShape>
              >
                key={`cluster-link-${i}`}
                data={link}
                stroke={black}
                strokeWidth="2"
                strokeOpacity={0.9}
                fill="none"
              />
            ))}
            {cluster.descendants().map((node, i) => (
              <Node
                key={`cluster-node-${i}`}
                node={node}
                nodeComponent={nodeComponent}
              />
            ))}
          </Group>
        )}
      </Cluster>
    </svg>
  );
}
