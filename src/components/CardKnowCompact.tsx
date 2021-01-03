import { observer } from "mobx-react-lite";
import { Box, IconButton, Text } from "gestalt";
import { AtomID } from "../common/types";
import { ParsedUrlQueryInput } from "querystring";
import { GUI_CONFIG } from "../common/config";
import { iconColorDefault } from "./_Button";
import { paths } from "../common/configPaths";
import CardGenericCompact from "./CardGenericCompact";

interface ICardKnowCompactProps {
  id: AtomID;
  title: string;
  image_url: string;
  pathname: string;
  queryObject: ParsedUrlQueryInput;
  amount: number | string;
  edit_handler: any;
  delete_handler: any;
}

const CardKnowCompact: React.FunctionComponent<ICardKnowCompactProps> = (
  props
) => {
  const card_sizes: any = GUI_CONFIG.display.knowbook_compact_sizes;
  const color = GUI_CONFIG.display.colors.knowbook_color;
  const color_image = GUI_CONFIG.display.colors.knowbook_color_image;
  const size_icon: any = GUI_CONFIG.display.size_icon_card;
  const pathKnowbookSaved = paths.pages.KnowbookSaved;
  const display_edit_icon = props.edit_handler === undefined ? false : true;
  const display_delete_icon =
    props.amount === 0 && props.pathname !== pathKnowbookSaved ? true : false;
  return (
    <CardGenericCompact
      id={props.id}
      title={props.title}
      color={color}
      color_image={color_image}
      image_url={props.image_url}
      sizes={card_sizes}
      pathname={props.pathname}
      queryObject={props.queryObject}
    >
      <Box paddingX={0}>
        {display_delete_icon && (
          <IconButton
            accessibilityLabel="clear"
            icon="clear"
            iconColor={iconColorDefault}
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
            iconColor={iconColorDefault}
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
    </CardGenericCompact>
  );
};

export default observer(CardKnowCompact);
