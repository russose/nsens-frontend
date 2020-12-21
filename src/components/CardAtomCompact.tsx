import { observer } from "mobx-react-lite";
import { Box, IconButton } from "gestalt";
import { AtomID } from "../common/types";
import CardGenericCompact from "./CardGenericCompact";
import { ParsedUrlQueryInput } from "querystring";
import { USER_DISPLAY } from "../common/config";

interface ICardAtomCompactProps {
  id: AtomID;
  title: string;
  image_url: string;
  pathname?: string;
  queryObject?: ParsedUrlQueryInput;
  saved_actionable: boolean;
  saved_enabled: boolean;
  saved_handler: any;
  edit_handler: any;
}

const card_sizes = USER_DISPLAY.atom_compact_sizes;
const size_icon: any = USER_DISPLAY.size_icon;
const color_image = USER_DISPLAY.colors.item_color_image;

const CardAtomCompact: React.FunctionComponent<ICardAtomCompactProps> = (
  props
) => {
  return (
    <CardGenericCompact
      id={props.id}
      title={props.title}
      image_url={props.image_url}
      color_image={color_image}
      sizes={card_sizes}
      pathname={props.pathname}
      queryObject={props.queryObject}
    >
      <Box paddingX={0}>
        {props.saved_enabled && (
          <IconButton
            accessibilityLabel="edit"
            icon="edit"
            iconColor="darkGray"
            size={size_icon}
            onClick={props.edit_handler}
          />
        )}
      </Box>
      <Box paddingX={0}>
        <IconButton
          accessibilityLabel="save"
          icon="angled-pin"
          iconColor={props.saved_enabled ? "red" : "darkGray"}
          size={size_icon}
          onClick={props.saved_handler}
          disabled={!props.saved_actionable}
        />
      </Box>
    </CardGenericCompact>
  );
};

export default observer(CardAtomCompact);
