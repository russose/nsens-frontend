import { Box } from "gestalt";
import { observer } from "mobx-react";
import React from "react";
import { PaddingT, SizeT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import CardKnow, { ICardKnowProps } from "./CardKnow";

interface ICardKnowGridSpecialProps {
  id: string;
  stores: IStores;
  cardKnowProps: ICardKnowProps[];
}

const CardKnowGridSpecial: React.FunctionComponent<ICardKnowGridSpecialProps> =
  (props) => {
    const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
    const card_sizes = GUI_CONFIG.display.knowbook_sizes;
    if (props.cardKnowProps === undefined || props.cardKnowProps.length === 0) {
      return <> </>;
    } else {
      return (
        <Box
          wrap={true}
          display="flex"
          direction="row"
          flex="grow"
          justifyContent="around"
        >
          {props.cardKnowProps.map((item: ICardKnowProps) => {
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
                key={`Box-cardKnowbookGridSpecial-${props.id}-${item.title}`}
              >
                <CardKnow
                  key={`cardKnowbookGridSpecial-${props.id}-${item.title}`}
                  id={item.title}
                  stores={props.stores}
                  title={item.title}
                  image_url={item.image_url}
                  pathname={item.pathname}
                  queryObject={{}}
                  amount={item.amount}
                  edit_handler={item.edit_handler}
                  delete_handler={item.delete_handler}
                />
              </Box>
            );
          })}
        </Box>
        //   )}
        // </Box>
      );
    }
  };

export default observer(CardKnowGridSpecial);
