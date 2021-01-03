import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { GUI_CONFIG } from "../common/config";
import CardKnow, { ICardKnowProps } from "./CardKnow";
import CardKnowCompact from "./CardKnowCompact";

interface ICardKnowGridSpecialProps {
  id: string;
  cardKnowProps: ICardKnowProps[];
  compact: boolean;
}

const CardKnowGridSpecial: React.FunctionComponent<ICardKnowGridSpecialProps> = (
  props
) => {
  const card_sizes = GUI_CONFIG.display.knowbook_sizes;
  const card_sizes_compact = GUI_CONFIG.display.knowbook_compact_sizes;
  if (props.cardKnowProps === undefined || props.cardKnowProps.length === 0) {
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
            {props.cardKnowProps.map((item) => {
              return (
                <Box
                  lgPadding={card_sizes_compact.lgPadding as any}
                  mdPadding={card_sizes_compact.mdPadding as any}
                  smPadding={card_sizes_compact.smPadding as any}
                  padding={card_sizes_compact.padding as any}
                  key={`Box-cardKnowbookGridSpecialCompact-${props.id}-${item.id}`}
                >
                  <CardKnowCompact
                    key={`cardKnowbookGridSpecialCompact-${props.id}-${item.title}`}
                    id={item.title}
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
        ) : (
          <Box
            // color="white"
            wrap={true}
            display="flex"
            direction="row"
            padding={1}
            justifyContent="around"
          >
            {props.cardKnowProps.map((item) => {
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
                  key={`Box-cardKnowbookGridSpecial-${props.id}-${item.id}`}
                >
                  <CardKnow
                    key={`cardKnowbookGridSpecial-${props.id}-${item.title}`}
                    id={item.title}
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
        )}
      </Box>
    );
  }
};

export default observer(CardKnowGridSpecial);
