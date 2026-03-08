import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { ICardKnowProps, PaddingT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import CardKnow from "./CardKnow";

interface ICardKnowGridProps {
  id: string;
  stores: IStores;
  cardKnowProps: ICardKnowProps[];

  size_factor?: number;
}

const CardKnowGrid: React.FunctionComponent<ICardKnowGridProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.knowbook_sizes;

  if (
    props.cardKnowProps === undefined ||
    props.cardKnowProps === null ||
    props.cardKnowProps.length === 0
  ) {
    return <></>;
  } else {
    return (
      <Box wrap={true} display="flex" direction="row" justifyContent="around">
        {props.cardKnowProps
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
                key={`Box-CardKnowGrid-${props.id}-${item.knowbook.id}-${item.knowbook.name}`}
              >
                <CardKnow
                  key={`CardKnowGrid-${props.id}-${item.knowbook.id}-${item.knowbook.name}`}
                  id={item.knowbook.id}
                  stores={props.stores}
                  knowbook={item.knowbook}
                  // title={item.knowbook.name}
                  // image_url={item.knowbook.image_url}
                  color_image={item.color_image}
                  image_handler={item.image_handler}
                  // amount={item.knowbook.amount}
                  // followPublic_handler={item.followPublic_handler}
                  // delete_handler={item.delete_handler}
                  // followPublic_color={item.followPublic_color}
                  buttons={item.buttons}
                  // nb_saved={item.knowbook.nb_saved}
                  // public={item.knowbook.public}
                  size_factor={props.size_factor}
                />
              </Box>
            );
          })}
      </Box>
    );
  }
};

export default observer(CardKnowGrid);
