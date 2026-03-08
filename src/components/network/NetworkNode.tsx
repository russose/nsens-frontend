import { Text } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  IAtom,
  ICardKnowProps,
  IKnowbook,
  INode,
  KnowbookID,
  SizeT,
  TKnowbooksPages,
  TRelationName,
  configPaths,
} from "../../config/globals";
import { onGoKnowbookPage } from "../../handlers/handlers_Navigation";
import { isMobile } from "../../libs/helpersBase";
import { IStores } from "../../stores/RootStore";
import CardAtomGridDynamic from "../CardAtomGridDynamic";
import CardKnowGrid from "../CardKnowGrid";
import { buttons_Knowbook_Card } from "../_buttons_definition";

interface IProps {
  stores: IStores;
  node: INode;
  id: string;
}

const NetworkNode: React.FunctionComponent<IProps> = (props) => {
  const stores = props.stores;
  const GUI_CONFIG = stores.baseStore.GUI_CONFIG;

  // let node_dx = GUI_CONFIG.display.atom_compact_vizs_sizes.width;
  // let node_dy = GUI_CONFIG.display.atom_compact_vizs_sizes.height;

  const title_card_size: SizeT = GUI_CONFIG.display.atom_sizes.size_text_title;

  const isKnowbook: boolean = !stores.graphStore.isItem(props.node.id);

  let node;
  let node_dy;
  let offset = <></>;

  if (props.node.relation_name === TRelationName.group) {
    node_dy = 10;
    const Y_offset = 50;

    node = (
      <>
        <Text size={title_card_size} align="center" weight="bold">
          {props.node.id}
        </Text>
      </>
    );

    offset = (
      <div
        style={{
          height: String(node_dy + Y_offset) + "px",
          pointerEvents: "none",
        }}
      ></div>
    );
  } else if (isKnowbook) {
    const size_factor = GUI_CONFIG.display.size_factor_knowbook_network;
    node_dy = GUI_CONFIG.display.knowbook_sizes.height * size_factor * 1.4;

    const Y_offset = 0;

    const id: KnowbookID = Number(props.node.id);
    const publicKnowbook: IKnowbook =
      stores.knowbookStore.getKnowbookFromId(id);

    if (publicKnowbook === undefined) {
      return <></>;
    }

    const cardKnowProps: ICardKnowProps = {
      id: publicKnowbook.id,
      stores: props.stores,
      knowbook: publicKnowbook,
      // title: publicKnowbook.public
      //   ? buildPublicName(publicKnowbook.name, publicKnowbook.owner_username)
      //   : publicKnowbook.name,
      // image_url: publicKnowbook.image_url,
      image_handler: onGoKnowbookPage(props.stores)(
        configPaths.pages.Knowbook,
        {
          type: publicKnowbook.public
            ? TKnowbooksPages.publicKnowbooks
            : TKnowbooksPages.myKnowbooks,
          title: publicKnowbook.name,
          id: publicKnowbook.id,
        }
      ),
      // amount: undefined,
      buttons: buttons_Knowbook_Card(
        props.stores,
        publicKnowbook,
        props.node.id === props.stores.uiStore.selectedAtom.id //desactivate Network link for the network of item id
      ),
      // nb_saved: publicKnowbook.nb_saved,
      // public: publicKnowbook.public,
    };

    if (isMobile(props.stores)) {
      offset = (
        <div
          style={{
            height: String(node_dy + Y_offset) + "px",
            pointerEvents: "none",
          }}
        ></div>
      );
    }

    node = (
      <CardKnowGrid
        id="NetworkKnowbook"
        stores={stores}
        cardKnowProps={[cardKnowProps]}
        size_factor={size_factor}
      />
    );
  } else {
    const item: IAtom = stores.baseStore.getHistoryItem(props.node.id);

    if (item === undefined) {
      return <></>;
    }

    // node_dy = GUI_CONFIG.display.atom_compact_vizs_sizes.height;
    const size_factor = GUI_CONFIG.display.size_factor_atom_network;
    node_dy = GUI_CONFIG.display.atom_sizes.height * size_factor;

    node = (
      <CardAtomGridDynamic
        stores={stores}
        id="Network"
        atoms={[item]}
        size_factor={size_factor}
        desactivateGoNetwork={
          props.node.id === props.stores.uiStore.selectedAtom.id
        } //desactivate Network link for the network of item id
        externalyzeTitle={true}
      />
    );
  }

  return (
    <>
      {
        <div id={props.id}>
          <div
            style={{
              pointerEvents: "auto",
            }}
          >
            {node}
          </div>
          {offset}
        </div>
      }
    </>
  );
};

export default observer(NetworkNode);
