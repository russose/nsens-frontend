import { Box, IconButton } from "gestalt";
import { observer } from "mobx-react-lite";
import { configGeneral, ICONS, RoundingT } from "../config/globals";
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
  top_handler: handlerT;
  // viz?: boolean;
}

const CardAtom: React.FunctionComponent<ICardAtomProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const size_icon: IconT = GUI_CONFIG.display.size_icon_card;
  const color_item = configGeneral.colors.item_color;
  const buttons_all = GUI_CONFIG.language.buttons;
  const card_sizes = GUI_CONFIG.display.atom_sizes;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;

  const topIcon = (
    <IconButton
      accessibilityLabel="wikipedia"
      size={size_icon}
      icon={ICONS.WIKIPEDIA as any}
      iconColor={configGeneral.colors.iconColorDefaultNotSelected as any}
      bgColor="lightGray"
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
