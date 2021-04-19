import { observer } from "mobx-react-lite";
import { Box, IconButton, Text } from "gestalt";
import { AtomID, handlerT, IconT } from "../common/globals";
import CardGeneric from "./CardGeneric";
import { configGeneral, configPaths } from "../common/globals";
import { IStores } from "../stores/_RootStore";

export interface ICardKnowProps {
  id: AtomID;
  stores: IStores;
  title: string;
  image_url: string;
  pathname: string;
  queryObject: any;
  amount: number | string;
  edit_handler: handlerT;
  delete_handler: handlerT;
}

const CardKnow: React.FunctionComponent<ICardKnowProps> = (props) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.knowbook_sizes;
  const color = configGeneral.colors.knowbook_color;
  const color_image = configGeneral.colors.knowbook_color_image;
  const size_icon: IconT = GUI_CONFIG.display.size_icon_card;
  const pathKnowbookSaved = configPaths.pages.KnowbookSaved;
  const display_edit_icon = props.edit_handler === undefined ? false : true;
  const display_delete_icon =
    props.amount === 0 && props.pathname !== pathKnowbookSaved ? true : false;
  return (
    <CardGeneric
      id={props.id}
      stores={props.stores}
      title={props.title}
      color={color}
      color_image={color_image}
      image_url={props.image_url}
      sizes={card_sizes}
      pathname={props.pathname}
      queryObject={props.queryObject}
      full={false}
    >
      <Box paddingX={0}>
        {display_delete_icon && (
          <IconButton
            accessibilityLabel="clear"
            icon="clear"
            iconColor={configGeneral.colors.iconColorDefault as any}
            size={size_icon}
            onClick={props.delete_handler}
          />
        )}
      </Box>

      <Box paddingX={0}>
        {display_edit_icon && (
          <IconButton
            accessibilityLabel="edit"
            icon="edit"
            iconColor={configGeneral.colors.iconColorDefault as any}
            size={size_icon}
            onClick={props.edit_handler}
          />
        )}
      </Box>
      <Box paddingX={2}>
        <Text align="center" size="sm" weight="bold">
          {props.amount}
        </Text>
      </Box>
    </CardGeneric>
  );
};

export default observer(CardKnow);
