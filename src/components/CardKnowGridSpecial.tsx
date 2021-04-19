import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { PaddingT, SizeT } from "../config/globals";
import { IStores } from "../stores/_RootStore";
import CardKnow, { ICardKnowProps } from "./CardKnow";

interface ICardKnowGridSpecialProps {
  id: string;
  stores: IStores;
  cardKnowProps: ICardKnowProps[];
}

const CardKnowGridSpecial: React.FunctionComponent<ICardKnowGridSpecialProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.knowbook_sizes;
  if (props.cardKnowProps === undefined || props.cardKnowProps.length === 0) {
    return <> </>;
  } else {
    return (
      // <Box>
      //   {props.compact ? (
      //     <Box
      //       // color="white"
      //       wrap={true}
      //       display="flex"
      //       direction="row"
      //       justifyContent="around"
      //     >
      //       {props.cardKnowProps.map((item) => {
      //         return (
      //           <Box
      //             lgPadding={card_sizes_compact.lgPadding as PaddingT}
      //             mdPadding={card_sizes_compact.mdPadding as PaddingT}
      //             smPadding={card_sizes_compact.smPadding as PaddingT}
      //             padding={card_sizes_compact.padding as PaddingT}
      //             key={`Box-cardKnowbookGridSpecialCompact-${props.id}-${item.id}`}
      //           >
      //             <CardKnowCompact
      //               key={`cardKnowbookGridSpecialCompact-${props.id}-${item.title}`}
      //               id={item.title}
      //               stores={props.stores}
      //               title={item.title}
      //               image_url={item.image_url}
      //               pathname={item.pathname}
      //               queryObject={{}}
      //               amount={item.amount}
      //               edit_handler={item.edit_handler}
      //               delete_handler={item.delete_handler}
      //             />
      //           </Box>
      //         );
      //       })}
      //     </Box>
      //   ) : (
      <Box
        // color="white"
        wrap={true}
        display="flex"
        direction="row"
        justifyContent="around"
      >
        {props.cardKnowProps.map((item) => {
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
              key={`Box-cardKnowbookGridSpecial-${props.id}-${item.id}`}
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
