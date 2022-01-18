import { Box, IconButton } from "gestalt";
import { observer } from "mobx-react-lite";
import { configGeneral, RoundingT } from "../config/globals";
import { AtomID, TButtonID, handlerT, IconT } from "../config/globals";
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
  top_handler?: handlerT;
  // viz?: boolean;
}

const CardAtom: React.FunctionComponent<ICardAtomProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const size_icon: IconT = GUI_CONFIG.display.size_icon_card;
  const color_item = configGeneral.colors.item_color;
  // const color_image = configGeneral.colors.item_color_image;
  const buttons_all = GUI_CONFIG.language.buttons;
  const card_sizes = GUI_CONFIG.display.atom_sizes;
  // let card_sizes;
  // if (props.viz) {
  //   card_sizes = GUI_CONFIG.display.atom_sizes_viz;
  // } else {
  //   card_sizes = GUI_CONFIG.display.atom_sizes;
  // }
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;

  const topIcon = (
    <IconButton
      accessibilityLabel="wikipedia"
      size={size_icon}
      icon="view-type-list"
      iconColor={configGeneral.colors.iconColorDefaultNotSelected as any}
      bgColor="white"
      onClick={props.top_handler}
    />
  );

  return (
    <CardGeneric
      id={props.id}
      stores={props.stores}
      title={props.title}
      image_url={props.image_url}
      color={color_item}
      // color_image={color_image}
      sizes={card_sizes}
      rounding={rounding}
      pathname={props.pathname}
      queryObject={props.queryObject}
      TopIcon={topIcon}
    >
      <Box paddingX={0}>
        {props.saved_enabled && (
          <IconButton
            accessibilityLabel="edit"
            icon={buttons_all[TButtonID.EDIT].icon as IconT}
            iconColor={configGeneral.colors.iconColorDefaultNotSelected as any}
            size={size_icon}
            onClick={props.edit_handler}
          />
        )}
      </Box>
      <Box paddingX={0}>
        <IconButton
          accessibilityLabel="save"
          icon={buttons_all[TButtonID.SAVE].icon as IconT}
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
