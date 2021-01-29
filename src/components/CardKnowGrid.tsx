import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  handlerT,
  IKnowbook,
  KnowbookID,
  PaddingT,
  SizeT,
} from "../common/types";
import { entierAleatoire } from "../libs/utils";
import { KnowkookStore } from "../stores/KnowkookStore";
import { SavedStore } from "../stores/SavedStore";
import { IStores } from "../stores/_RootStore";
import CardKnow from "./CardKnow";
import CardKnowCompact from "./CardKnowCompact";

interface ICardKnowGridProps {
  id: string;
  stores: IStores;
  knowbooks: IKnowbook[];
  edit_handler: handlerT;
  delete_handler: handlerT;
  savedStore: SavedStore;
  knowbookStore: KnowkookStore;
  compact: boolean;
}

function getKnowbookImage(
  knowbook: KnowbookID,
  savedStore: SavedStore,
  knowbookStore: KnowkookStore
): string {
  let image_paths_list: string[] = knowbookStore
    .getKnowbookAtomsList(knowbook, savedStore)
    .map((item) => {
      return item.image_url;
    });
  image_paths_list = image_paths_list.filter((item) => {
    return item !== "";
  });
  if (image_paths_list.length === 0) {
    return "";
  } else {
    const image_path =
      image_paths_list[entierAleatoire(0, image_paths_list.length - 1)];
    return image_path;
  }
}

const CardKnowGrid: React.FunctionComponent<ICardKnowGridProps> = (props) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.knowbook_sizes;
  const card_sizes_compact = GUI_CONFIG.display.knowbook_compact_sizes;
  const path_knowbook = GUI_CONFIG.paths.pages.Knowbook;
  if (
    props.knowbooks === undefined ||
    props.knowbooks === null ||
    props.knowbooks.length === 0
  ) {
    return <> </>;
  } else {
    return (
      <Box>
        {props.compact ? (
          <Box
            wrap={true}
            display="flex"
            direction="row"
            padding={0}
            justifyContent="around"
          >
            {props.knowbooks.map((item) => {
              return (
                <Box
                  lgPadding={card_sizes_compact.lgPadding as PaddingT}
                  mdPadding={card_sizes_compact.mdPadding as PaddingT}
                  smPadding={card_sizes_compact.smPadding as PaddingT}
                  padding={card_sizes_compact.padding as PaddingT}
                  key={`Box-cardKnowbookGridCompact-${props.id}-${item.id}`}
                >
                  <CardKnowCompact
                    key={`cardKnowbookGridCompact-${props.id}-${item.name}`}
                    id={item.name}
                    stores={props.stores}
                    title={item.name}
                    // image_url={image_path}
                    image_url={getKnowbookImage(
                      item.name,
                      props.savedStore,
                      props.knowbookStore
                    )}
                    pathname={path_knowbook}
                    queryObject={{ title: item.name }}
                    amount={item.items.length}
                    edit_handler={props.edit_handler(item.name)}
                    delete_handler={props.delete_handler(item.name)}
                  />
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box
            wrap={true}
            display="flex"
            direction="row"
            padding={0}
            justifyContent="around"
          >
            {props.knowbooks.map((item) => {
              return (
                <Box
                  lgColumn={card_sizes.lgColumn as SizeT}
                  mdColumn={card_sizes.mdColumn as SizeT}
                  smColumn={card_sizes.smColumn as SizeT}
                  column={card_sizes.column as SizeT}
                  lgPadding={card_sizes.lgPadding as PaddingT}
                  mdPadding={card_sizes.mdPadding as PaddingT}
                  smPadding={card_sizes.smPadding as PaddingT}
                  padding={card_sizes.padding as PaddingT}
                  key={`Box-cardKnowbookGrid-${props.id}-${item.id}`}
                >
                  <CardKnow
                    key={`cardKnowbookGrid-${props.id}-${item.name}`}
                    id={item.name}
                    stores={props.stores}
                    title={item.name}
                    // image_url={image_path}
                    image_url={getKnowbookImage(
                      item.name,
                      props.savedStore,
                      props.knowbookStore
                    )}
                    pathname={path_knowbook}
                    queryObject={{ title: item.name }}
                    amount={item.items.length}
                    edit_handler={props.edit_handler(item.name)}
                    delete_handler={props.delete_handler(item.name)}
                  />
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    );
  }
};

export default observer(CardKnowGrid);
