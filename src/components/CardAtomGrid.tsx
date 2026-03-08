import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { handlerT, IAtom, PaddingT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import CardAtom from "./CardAtom";

interface ICardAtomGridProps {
  id: string;
  stores: IStores;
  atoms: IAtom[];
  image_handler: handlerT;
  isInAnyKnowbook_handler: handlerT;
  edit_handler: handlerT;
  top_handler: handlerT;
  size_factor?: number;
  externalyzeTitle?: boolean;
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
      <Box
        wrap={true}
        display="flex"
        direction="row"
        justifyContent="around"
        // color="primary"
      >
        {props.atoms
          .filter((item_) => {
            return item_ !== undefined;
          })
          .map((item) => {
            return (
              <Box
                // lgColumn={card_sizes.lgColumn as SizeT}
                // mdColumn={card_sizes.mdColumn as SizeT}
                // smColumn={card_sizes.smColumn as SizeT}
                // column={card_sizes.column as SizeT}
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
                  image_handler={
                    props.image_handler === undefined
                      ? undefined
                      : props.image_handler(item.title, item.id, item.source)
                  }
                  isInAnyKnowbook={
                    props.isInAnyKnowbook_handler !== undefined
                      ? props.isInAnyKnowbook_handler(item.id)
                      : false
                  }
                  edit_handler={
                    props.edit_handler !== undefined
                      ? props.edit_handler(item.id)
                      : undefined
                  }
                  top_handler={props.top_handler(item.title, item.id)}
                  source={item.source}
                  size_factor={props.size_factor}
                  externalyzeTitle={props.externalyzeTitle}
                />
              </Box>
            );
          })}
      </Box>
    );
  }
};

export default observer(CardAtomGrid);
