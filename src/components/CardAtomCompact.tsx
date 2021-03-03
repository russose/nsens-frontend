import { observer } from "mobx-react-lite";
import { Box, IconButton } from "gestalt";
import { AtomID, ButtonIDType, handlerT, IconT } from "../common/types";
import CardGenericCompact from "./CardGenericCompact";
import { ParsedUrlQueryInput } from "querystring";
import { iconColorDefault } from "./_Button";
import { IStores } from "../stores/_RootStore";

interface ICardAtomCompactProps {
  id: AtomID;
  stores: IStores;
  title: string;
  image_url: string;
  pathname?: string;
  queryObject?: ParsedUrlQueryInput;
  saved_actionable: boolean;
  saved_enabled: boolean;
  saved_handler: handlerT;
  edit_handler: handlerT;
  forVizs?: boolean;
}

const CardAtomCompact: React.FunctionComponent<ICardAtomCompactProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const size_icon: IconT = GUI_CONFIG.display.size_icon_card;
  const color_item = GUI_CONFIG.general.colors.item_compact_color;
  const color_image = GUI_CONFIG.general.colors.item_color_image;
  let card_sizes;
  if (props.forVizs === true) {
    card_sizes = GUI_CONFIG.display.atom_compact_vizs_sizes;
  } else {
    card_sizes = GUI_CONFIG.display.atom_compact_sizes;
  }
  const buttons_all = GUI_CONFIG.language.buttons;

  return (
    <CardGenericCompact
      id={props.id}
      stores={props.stores}
      title={props.title}
      image_url={props.image_url}
      color={color_item}
      color_image={color_image}
      sizes={card_sizes}
      pathname={props.pathname}
      queryObject={props.queryObject}
    >
      <Box paddingX={0}>
        <IconButton
          accessibilityLabel="save"
          icon={buttons_all[ButtonIDType.SAVE].icon as IconT}
          iconColor={props.saved_enabled ? "red" : iconColorDefault}
          size={size_icon}
          onClick={props.saved_handler}
          disabled={!props.saved_actionable}
        />
      </Box>
      <Box paddingX={0}>
        {props.saved_enabled && (
          <IconButton
            accessibilityLabel="edit"
            icon={buttons_all[ButtonIDType.EDIT].icon as IconT}
            iconColor={iconColorDefault}
            size={size_icon}
            onClick={props.edit_handler}
          />
        )}
      </Box>
    </CardGenericCompact>
  );
};

export default observer(CardAtomCompact);
