import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { ICardKnowProps, PaddingT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import CardKnow from "./CardKnow";

interface ICardKnowGridProps {
  id: string;
  stores: IStores;
  knowbooks: ICardKnowProps[];
}

const CardKnowGrid: React.FunctionComponent<ICardKnowGridProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.knowbook_sizes;

  if (
    props.knowbooks === undefined ||
    props.knowbooks === null ||
    props.knowbooks.length === 0
  ) {
    return <></>;
  } else {
    return (
      <Box wrap={true} display="flex" direction="row" justifyContent="around">
        {props.knowbooks
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
                key={`Box-CardKnowGrid-${props.id}-${item.id}`}
              >
                <CardKnow
                  key={`CardKnowGrid-${props.id}-${item.id}`}
                  id={item.id}
                  stores={props.stores}
                  title={item.title}
                  image_url={item.image_url}
                  color_image={item.color_image}
                  image_handler={item.image_handler}
                  amount={item.amount}
                  rename_handler={item.rename_handler}
                  delete_handler={item.delete_handler}
                />
              </Box>
            );
          })}
      </Box>
    );
  }
};

export default observer(CardKnowGrid);
