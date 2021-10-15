import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { handlerT, IAtom, PaddingT } from "../config/globals";
import { path_link } from "../libs/utils";
import { IStores } from "../stores/RootStore";
import CardAtomCompact from "./CardAtomCompact";

interface ICardAtomGridCompactProps {
  id: string;
  stores: IStores;
  atoms: IAtom[];
  isItemSaved_handler: handlerT;
  isItemSavedActionable_handler: handlerT;
  saved_handler: handlerT;
  edit_handler: handlerT;
}

const CardAtomGridCompact: React.FunctionComponent<ICardAtomGridCompactProps> =
  (props) => {
    const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
    const card_sizes_compact = GUI_CONFIG.display.atom_compact_sizes;

    // const path_link = configPaths.pages.ItemArticle;
    // const path_link = configPaths.pages.ItemNetwork;

    if (
      props.atoms === undefined ||
      props.atoms === null ||
      props.atoms.length === 0
    ) {
      return <></>;
    } else {
      return (
        <Box wrap={true} display="flex" direction="row" justifyContent="around">
          {props.atoms
            .filter((item_) => {
              return item_ !== undefined;
            })
            .map((item) => {
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
                    // pathname={path_Itemview}
                    pathname={path_link(item.id, props.stores)}
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
      );
    }
  };

export default observer(CardAtomGridCompact);
