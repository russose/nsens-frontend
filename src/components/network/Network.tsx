import { Box, FixedZIndex } from "gestalt";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AtomID, ILink, INode, TRelationName } from "../../config/globals";
import { IStores } from "../../stores/RootStore";
import ForceGraph3D_ from "./ForceGraph3D_";
import NetworkNode from "./NetworkNode";
import { computeNodesEdgesGraph } from "./computeGraph";
import NetworkLink from "./NetworkLink";

//https://github.com/vasturiano/react-force-graph

export interface IProps {
  stores: IStores;
  item_title: string;
  item_id: string;
  scenario_index: number;
}

function convertStringToNumberWithoutLast(
  original: string,
  amount_last: number
): number {
  const result = parseInt(original.slice(0, original.length - amount_last), 10);
  return result;
}

const Network: React.FunctionComponent<IProps> = (props) => {
  const [graphData, setGraphData] = useState(undefined);
  const stores = props.stores;
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;

  stores.baseStore.setScreenNoSSR();

  // const height_legend = 25;
  const heightBody = GUI_CONFIG.display.layout.heightBody;
  const heightHeader = GUI_CONFIG.display.layout.heightHeader;
  const height =
    stores.baseStore.screen.height *
      0.01 *
      convertStringToNumberWithoutLast(heightBody, 2) -
    heightHeader;

  const width = stores.baseStore.screen.width;

  useEffect(() => {
    computeNodesEdgesGraph(props.item_id, stores);

    //Very important: Deep Copy to not update observable, all other solutions didn't worked!
    const nodesClone = stores.graphStore.graph.nodes.map((el) => {
      return { ...el };
    });
    const linksClone = stores.graphStore.graph.links.map((link: ILink) => {
      return {
        source: nodesClone[link.source.pos],
        target: nodesClone[link.target.pos],
      };
    });

    const graphData_ = {
      nodes: nodesClone,
      links: linksClone,
    };

    setGraphData(graphData_);

    //Fetch missing images
    const related_Ids: AtomID[] = stores.graphStore.relatedMapFlat.atomIds;
    for (const id of related_Ids) {
      stores.baseStore.setGoodImageInHistoryItem(id);
    }
  }, []);

  if (props.item_id === undefined || props.item_title === undefined) {
    return <></>;
  }

  if (graphData === undefined) {
    return <></>;
  }

  const Nodes = (
    <Box display="none">
      {graphData.nodes.map((node: INode) => {
        return (
          <NetworkNode
            stores={props.stores}
            node={node}
            id={node.id}
            key={node.id}
          />
        );
      })}
    </Box>
  );

  const LinkLabels = (
    <Box display="none">
      {graphData.links.map((link: ILink) => {
        const hide_relation: boolean = link.target.relation_name.includes(
          TRelationName.hide_relation
        );

        const displayCondition =
          link.target.relation_name !== TRelationName.group &&
          link.target.relation_name !== "" &&
          !hide_relation;

        const id = link.source.pos + "-" + link.target.pos;

        if (displayCondition) {
          return (
            <NetworkLink stores={props.stores} link={link} id={id} key={id} />
          );
        } else {
          return <Box key={id} />;
        }
      })}
    </Box>
  );

  const fixedZindex = new FixedZIndex(0);

  return (
    <Box zIndex={fixedZindex}>
      {LinkLabels}
      {Nodes}
      <ForceGraph3D_
        stores={stores}
        graphData={graphData}
        width={width * 1}
        height={height * 0.99}
        item_title={props.item_title}
        item_id={props.item_id}
        scenario_index={props.scenario_index}
      />
    </Box>
  );
};

export default observer(Network);
