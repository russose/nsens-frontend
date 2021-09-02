import { Box, IconButton } from "gestalt";
import { observer } from "mobx-react-lite";
import { configGeneral } from "../config/globals";
import { AtomID, ButtonIDType, handlerT, IconT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import CardGeneric from "./CardGeneric";

interface ICardAtomProps {
  id: AtomID;
  stores: IStores;
  title: string;
  image_url: string;
  pathname: string;
  queryObject?: any;
  saved_actionable: boolean;
  saved_enabled: boolean;
  saved_handler: handlerT;
  edit_handler: handlerT;
}

const CardAtom: React.FunctionComponent<ICardAtomProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.atom_sizes;
  const size_icon: IconT = GUI_CONFIG.display.size_icon_card;
  const color_item = configGeneral.colors.item_color;
  // const color_image = configGeneral.colors.item_color_image;
  const buttons_all = GUI_CONFIG.language.buttons;

  return (
    <CardGeneric
      id={props.id}
      stores={props.stores}
      title={props.title}
      image_url={props.image_url}
      color={color_item}
      // color_image={color_image}
      sizes={card_sizes}
      pathname={props.pathname}
      queryObject={props.queryObject}
    >
      <Box paddingX={0}>
        {props.saved_enabled && (
          <IconButton
            accessibilityLabel="edit"
            icon={buttons_all[ButtonIDType.EDIT].icon as IconT}
            iconColor={configGeneral.colors.iconColorDefaultNotSelected as any}
            size={size_icon}
            onClick={props.edit_handler}
          />
        )}
      </Box>
      <Box paddingX={0}>
        <IconButton
          accessibilityLabel="save"
          icon={buttons_all[ButtonIDType.SAVE].icon as IconT}
          iconColor={
            props.saved_enabled
              ? (configGeneral.colors.iconColorDefaultSelected as any)
              : (configGeneral.colors.iconColorDefaultNotSelected as any)
          }
          size={size_icon}
          onClick={props.saved_handler}
          disabled={!props.saved_actionable}
        />
      </Box>
    </CardGeneric>
  );
};

export default observer(CardAtom);
