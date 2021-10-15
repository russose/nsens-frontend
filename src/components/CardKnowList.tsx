import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  configPaths,
  handlerT,
  IKnowbook,
  IKnowbookStatic,
  PaddingT,
  SizeT,
} from "../config/globals";
import { getKnowbookAtomsList } from "../libs/helpersSavedKnowbooks";
import { getRandomImageFromItems } from "../libs/utils";
import { IStores } from "../stores/RootStore";
import CardKnow from "./CardKnow";

interface ICardKnowListProps {
  id: string;
  stores: IStores;
  knowbooks: IKnowbook[] | IKnowbookStatic[];
  edit_handler: handlerT;
  delete_handler: handlerT;
  static: boolean;
}

const CardKnowList: React.FunctionComponent<ICardKnowListProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.knowbook_sizes;

  let path_knowbook: string;
  let knowbooks_: any;
  if (props.static) {
    path_knowbook = configPaths.pages.StaticKnowbook;
    knowbooks_ = props.knowbooks as IKnowbookStatic[];
  } else {
    path_knowbook = configPaths.pages.Knowbook;
    knowbooks_ = props.knowbooks as IKnowbook[];
  }

  if (
    props.knowbooks === undefined ||
    props.knowbooks === null ||
    props.knowbooks.length === 0
  ) {
    return <> </>;
  } else {
    return (
      // <Box
      //   wrap={true}
      //   display="flex"
      //   direction="row"
      //   flex="grow"
      //   padding={0}
      //   justifyContent="around"
      // >
      <>
        {props.static
          ? knowbooks_.map((item: IKnowbookStatic) => {
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
            })
          : knowbooks_.map((item: IKnowbook) => {
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
                  key={`Box-cardKnowbookGrid-${props.id}-${item.name}`}
                >
                  <CardKnow
                    key={`cardKnowbookGrid-${props.id}-${item.name}`}
                    id={item.name}
                    stores={props.stores}
                    title={item.name}
                    // image_url={image_path}
                    // image_url={getKnowbookImage(item.name, props.stores)}
                    image_url={getRandomImageFromItems(
                      getKnowbookAtomsList(item.name, props.stores)
                    )}
                    pathname={path_knowbook}
                    queryObject={{ title: item.name }}
                    amount={item.items.length}
                    edit_handler={props.edit_handler(item.name)}
                    delete_handler={props.delete_handler(item.name)}
                  />
                </Box>
              );
            })}
      </>
      // </Box>
    );
  }
};

export default observer(CardKnowList);
