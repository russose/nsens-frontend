import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  configPaths,
  handlerT,
  IKnowbookStatic,
  PaddingT,
  SizeT,
} from "../config/globals";
import { getRandomImageFromItems } from "../libs/utils";
import { IStores } from "../stores/RootStore";
import CardKnow from "./CardKnow";

interface ICardKnowGridStaticProps {
  id: string;
  stores: IStores;
  knowbooks: IKnowbookStatic[];
  edit_handler: handlerT;
  delete_handler: handlerT;
}

const CardKnowGridStatic: React.FunctionComponent<ICardKnowGridStaticProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.knowbook_sizes;
  const path_knowbook = configPaths.pages.StaticKnowbooks;

  if (
    props.knowbooks === undefined ||
    props.knowbooks === null ||
    props.knowbooks.length === 0
  ) {
    return <> </>;
  } else {
    return (
      <Box
        wrap={true}
        display="flex"
        direction="row"
        padding={0}
        justifyContent="around"
      >
        {props.knowbooks.map((item: IKnowbookStatic) => {
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
              key={`Box-cardKnowGridStatic-${props.id}-${item.name}`}
            >
              <CardKnow
                key={`cardKnowGridStatic-${props.id}-${item.name}`}
                id={item.name}
                stores={props.stores}
                title={item.name_display}
                // image_url={image_path}
                image_url={getRandomImageFromItems(item.items)}
                pathname={path_knowbook}
                queryObject={{ nameOrPeriod: item.name }}
                amount={item.items.length}
                edit_handler={props.edit_handler(item.name)}
                delete_handler={props.delete_handler(item.name)}
              />
            </Box>
          );
        })}
      </Box>
    );
  }
};

export default observer(CardKnowGridStatic);
