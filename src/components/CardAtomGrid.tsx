import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { GUI_CONFIG } from "../common/config";
import { paths } from "../common/configPaths";
import { IAtom } from "../common/types";
import CardAtom from "./CardAtom";
import CardAtomCompact from "./CardAtomCompact";

interface ICardAtomGridProps {
  id: string;
  atoms: IAtom[];
  isItemSaved_handler: any;
  isItemSavedActionable_handler: any;
  saved_handler: any;
  edit_handler: any;
  compact: boolean;
}

const CardAtomGrid: React.FunctionComponent<ICardAtomGridProps> = (props) => {
  const card_sizes = GUI_CONFIG.display.atom_sizes;
  const card_sizes_compact = GUI_CONFIG.display.atom_compact_sizes;

  const path_Itemview = paths.pages.Item;

  if (
    props.atoms === undefined ||
    props.atoms === null ||
    props.atoms.length === 0
  ) {
    return <></>;
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
            {props.atoms.map((item) => {
              return (
                <Box
                  lgPadding={card_sizes_compact.lgPadding as any}
                  mdPadding={card_sizes_compact.mdPadding as any}
                  smPadding={card_sizes_compact.smPadding as any}
                  padding={card_sizes_compact.padding as any}
                  key={`Box-cardAtomGrid_Compact-${props.id}-${item.id}`}
                >
                  <CardAtomCompact
                    key={`cardAtomGrid_Compact-${props.id}-${item.id}`}
                    id={item.id}
                    title={item.title}
                    image_url={item.image_url}
                    pathname={path_Itemview}
                    queryObject={{ title: item.title, id: item.id }}
                    saved_enabled={props.isItemSaved_handler(item.id)}
                    saved_actionable={props.isItemSavedActionable_handler(
                      item.id
                    )}
                    saved_handler={props.saved_handler(item.id)}
                    edit_handler={props.edit_handler(item.id)}
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
            {props.atoms.map((item) => {
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
                  key={`Box-cardAtomGrid-${props.id}-${item.id}`}
                >
                  <CardAtom
                    key={`cardAtomGrid-${props.id}-${item.id}`}
                    id={item.id}
                    title={item.title}
                    image_url={item.image_url}
                    pathname={path_Itemview}
                    queryObject={{ title: item.title, id: item.id }}
                    saved_enabled={props.isItemSaved_handler(item.id)}
                    saved_actionable={props.isItemSavedActionable_handler(
                      item.id
                    )}
                    saved_handler={props.saved_handler(item.id)}
                    edit_handler={props.edit_handler(item.id)}
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

export default observer(CardAtomGrid);
