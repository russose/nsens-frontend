import { forceCollide } from "d3-force";
import { observer } from "mobx-react-lite";
import ForceGraph3D from "react-force-graph-3d";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import { IStores } from "../../stores/RootStore";

import { useEffect, useRef } from "react";
import { CONFIG_ENV, configGeneral, configPaths } from "../../config/globals";
import { suite } from "../../libs/utils";
import { isMobile } from "../../libs/helpersBase";
import { MOUSE, TOUCH } from "three";

//https://github.com/vasturiano/react-force-graph

// Lancer Chrome/Brave avec les dev tools pour scenarios: --auto-open-devtools-for-tabs

export interface IProps {
  stores: IStores;
  graphData: any;

  width: number;
  height: number;

  item_title: string;
  item_id: string;
  scenario_index?: number;
}

interface INetworkConfig {
  index?: number;
  collisionDistFactor: number;
  linkDistFactor: number;
  distance_for_zoom: number;
  ms_per_node: number;
}

// To activate the scenarios, add at the end of the url: "&scenario_index=0"
const print_scenarios_links_md = (
  stores: IStores,
  scenarios: INetworkConfig[],
  item_title: string,
  item_id: string
) => {
  const base_url_itemNetwork =
    CONFIG_ENV.FRONT_URL +
    "/" +
    stores.baseStore.paramsPage.lang +
    "/" +
    stores.baseStore.paramsPage.display +
    configPaths.pages.ItemNetwork +
    "/?title=" +
    encodeURI(item_title + "&id=" + item_id);

  let output_full_md = "";
  scenarios.forEach((scenario) => {
    const link = base_url_itemNetwork + "&scenario_index=" + scenario.index;
    const link_md = `[${JSON.stringify(scenario)}](${link})`;
    const output_md = `${link_md}  \n \n`;

    output_full_md = output_full_md + output_md;
  });

  console.log("*** Copy/past *.md file: ***");
  console.log(output_full_md);
};

const ForceGraph3D_: React.FunctionComponent<IProps> = (props) => {
  const forceRef = useRef(null);

  const isMobile_ = isMobile(props.stores);

  // console.log("links:", props.graphData.links);
  // console.log("nodes:", props.graphData.nodes);

  const scenario_index = props.scenario_index;

  const display = props.stores.baseStore.GUI_CONFIG.display;
  const atom_width =
    display.atom_sizes.width * display.size_factor_atom_network;

  useEffect(() => {
    forceRef.current.d3Force(
      "collision",
      forceCollide().radius(atom_width * configNetwork.collisionDistFactor)
      // .strength(0.2)
    );
    //
    forceRef.current
      .d3Force("link")
      .links(props.graphData.links)
      .distance(atom_width * configNetwork.linkDistFactor);
    // .strength(0.2);

    forceRef.current.controls().mouseButtons = {
      LEFT: MOUSE.RIGHT,
      MIDDLE: MOUSE.LEFT,
      RIGHT: MOUSE.MIDDLE,
    };

    forceRef.current.controls().touches = {
      ONE: TOUCH.PAN,
      TWO: TOUCH.DOLLY_ROTATE,
    };
  }, []);

  const zoom_to_node = (node: any) => {
    forceRef.current.cameraPosition(
      {
        x: node.x,
        y: node.y,
        z: configNetwork.distance_for_zoom,
      }, // new position
      node, // lookAt ({ x, y, z })
      1000 // ms transition duration
    );
  };

  let firstRender = true;

  let configNetwork: INetworkConfig;

  if (isMobile_) {
    configNetwork = {
      collisionDistFactor: 0.8,
      linkDistFactor: 1.6,
      distance_for_zoom: 400,
      ms_per_node: 60,
    };
  } else {
    configNetwork = {
      collisionDistFactor: 0.4,
      linkDistFactor: 0.4,
      distance_for_zoom: 600,
      ms_per_node: 60,
    };
  }

  const scenarios: INetworkConfig[] = [];
  if (scenario_index !== undefined && configGeneral.testScenariosNetwork) {
    let index = 0;
    const collision_distances = suite(0.8, 0.8, 0.2);
    const link_distances = suite(1.6, 1.6, 0.2);
    const distance_for_zoom_list = suite(50, 1000, 50);
    const ms_per_node_list = suite(60, 60, 5);

    for (const collision_distance of collision_distances) {
      for (const link_distance of link_distances) {
        for (const distance_for_zoom of distance_for_zoom_list) {
          for (const ms_per_node of ms_per_node_list) {
            const scenario: INetworkConfig = {
              index: index,
              collisionDistFactor: collision_distance,
              linkDistFactor: link_distance,
              distance_for_zoom: distance_for_zoom,
              ms_per_node: ms_per_node,
            };
            scenarios.push(scenario);
            index = index + 1;
          }
        }
      }
    }

    configNetwork = scenarios[scenario_index];

    if (configNetwork === undefined) {
      console.error(
        "scenario_index not correct",
        "scenario_index:",
        scenario_index,
        "scenario_index max:",
        scenarios.length - 1
      );
    }

    print_scenarios_links_md(
      props.stores,
      scenarios,
      props.item_title,
      props.item_id
    );
  }

  return (
    <ForceGraph3D
      ref={forceRef}
      graphData={props.graphData}
      backgroundColor={"#FFFFFF"}
      // showNavInfo={!isMobile_}
      showNavInfo={false}
      nodeRelSize={isMobile_ ? 5 : 3}
      nodeColor={() => "rgb(0, 0, 0 )"}
      // linkColor={() => "rgb(0, 0, 0 )"}
      linkAutoColorBy={(link: any) => {
        return link.source.id;
      }}
      linkOpacity={0.8}
      // linkWidth={1}
      width={props.width}
      height={props.height}
      onNodeDragEnd={(node) => {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
      }}
      extraRenderers={[new CSS2DRenderer()] as any}
      nodeThreeObject={(node: any) => {
        const nodeEl = document.getElementById(String(node.id));
        if (nodeEl === null) {
          return null;
        }
        nodeEl.style.display = "unset";
        return new CSS2DObject(nodeEl);
      }}
      nodeThreeObjectExtend={true}
      enableNodeDrag={true}
      cooldownTime={configNetwork.ms_per_node * props.graphData.nodes.length}
      onEngineStop={() => {
        if (firstRender) {
          zoom_to_node(props.graphData.nodes[0]);
          firstRender = false;
        }
      }}
      onLinkClick={(link: any) => {
        zoom_to_node(props.graphData.nodes[link.target.pos]);
      }}
      numDimensions={2}
      linkCurvature={0.2}
      controlType="orbit"
      linkThreeObjectExtend={true}
      linkThreeObject={(link: any) => {
        const linkEl = document.getElementById(
          String(link.source.pos + "-" + link.target.pos)
        );
        if (linkEl === null) {
          // console.log("error...");
          return undefined;
        }
        linkEl.style.display = "unset";

        return new CSS2DObject(linkEl);
      }}
      linkPositionUpdate={(label, { start, end }) => {
        if (label === undefined) {
          return;
        }
        const x = start.x + (end.x - start.x) / 2;
        const y = start.y + (end.y - start.y) / 2;
        const z = start.z + (end.z - start.z) / 2;

        const z_ = isNaN(z) ? 0 : z;

        Object.assign(label.position, { x: x, y: y, z: z_ });
      }}
    />
  );
};

export default observer(ForceGraph3D_);
