import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { GUI_CONFIG } from "../common/config";
import { paths } from "../common/configPaths";
import { IKnowbook, KnowbookID } from "../common/types";
import { entierAleatoire } from "../libs/utils";
import { KnowkookStore } from "../stores/KnowkookStore";
import { SavedStore } from "../stores/SavedStore";
import CardKnow from "./CardKnow";
import CardKnowCompact from "./CardKnowCompact";

interface ICardKnowGridProps {
  id: string;
  knowbooks: IKnowbook[];
  edit_handler: any;
  delete_handler: any;
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
  const card_sizes = GUI_CONFIG.display.knowbook_sizes;
  const card_sizes_compact = GUI_CONFIG.display.knowbook_compact_sizes;
  const path_knowbook = paths.pages.Knowbook;
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
            // color="white"
            wrap={true}
            display="flex"
            direction="row"
            padding={1}
            justifyContent="around"
          >
            {props.knowbooks.map((item) => {
              return (
                <Box
                  lgPadding={card_sizes_compact.lgPadding as any}
                  mdPadding={card_sizes_compact.mdPadding as any}
                  smPadding={card_sizes_compact.smPadding as any}
                  padding={card_sizes_compact.padding as any}
                  key={`Box-cardKnowbookGridCompact-${props.id}-${item.id}`}
                >
                  <CardKnowCompact
                    key={`cardKnowbookGridCompact-${props.id}-${item.name}`}
                    id={item.name}
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
            // color="white"
            wrap={true}
            display="flex"
            direction="row"
            padding={1}
            justifyContent="around"
          >
            {props.knowbooks.map((item) => {
              return (
                <Box
                  lgColumn={card_sizes.lgColumn as any}
                  mdColumn={card_sizes.mdColumn as any}
                  smColumn={card_sizes.smColumn as any}
                  column={card_sizes.column as any}
                  lgPadding={card_sizes.lgPadding as any}
                  mdPadding={card_sizes.mdPadding as any}
                  smPadding={card_sizes.smPadding as any}
                  padding={card_sizes.padding as any}
                  key={`Box-cardKnowbookGrid-${props.id}-${item.id}`}
                >
                  <CardKnow
                    key={`cardKnowbookGrid-${props.id}-${item.name}`}
                    id={item.name}
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
