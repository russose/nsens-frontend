import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { handlerT, IAtom, PaddingT, SizeT } from "../config/globals";
import { path_link } from "../libs/utils";
import { IStores } from "../stores/RootStore";
import CardAtom from "./CardAtom";

interface ICardAtomGridProps {
  id: string;
  stores: IStores;
  atoms: IAtom[];
  isItemSaved_handler: handlerT;
  isItemSavedActionable_handler: handlerT;
  saved_handler: handlerT;
  edit_handler: handlerT;
}

const CardAtomGrid: React.FunctionComponent<ICardAtomGridProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.atom_sizes;

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

export default observer(CardAtomGrid);
