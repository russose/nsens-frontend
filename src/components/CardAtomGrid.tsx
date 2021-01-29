import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { handlerT, IAtom, PaddingT, SizeT } from "../common/types";
import { IStores } from "../stores/_RootStore";
import CardAtom from "./CardAtom";
import CardAtomCompact from "./CardAtomCompact";

interface ICardAtomGridProps {
  id: string;
  stores: IStores;
  atoms: IAtom[];
  isItemSaved_handler: handlerT;
  isItemSavedActionable_handler: handlerT;
  saved_handler: handlerT;
  edit_handler: handlerT;
  compact: boolean;
}

const CardAtomGrid: React.FunctionComponent<ICardAtomGridProps> = (props) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.atom_sizes;
  const card_sizes_compact = GUI_CONFIG.display.atom_compact_sizes;

  const path_Itemview = GUI_CONFIG.paths.pages.Item;

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
            wrap={true}
            display="flex"
            direction="row"
            justifyContent="around"
          >
            {props.atoms.map((item) => {
              return (
                <Box
                  lgPadding={card_sizes_compact.lgPadding as PaddingT}
                  mdPadding={card_sizes_compact.mdPadding as PaddingT}
                  smPadding={card_sizes_compact.smPadding as PaddingT}
                  padding={card_sizes_compact.padding as PaddingT}
                  key={`Box-cardAtomGrid_Compact-${props.id}-${item.id}`}
                >
                  <CardAtomCompact
                    key={`cardAtomGrid_Compact-${props.id}-${item.id}`}
                    id={item.id}
                    stores={props.stores}
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
            wrap={true}
            display="flex"
            direction="row"
            justifyContent="around"
          >
            {props.atoms.map((item) => {
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
                  key={`Box-cardAtomGrid-${props.id}-${item.id}`}
                >
                  <CardAtom
                    key={`cardAtomGrid-${props.id}-${item.id}`}
                    id={item.id}
                    stores={props.stores}
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
