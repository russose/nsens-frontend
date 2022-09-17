import { Box, IconButton } from "gestalt";
import { observer } from "mobx-react-lite";
import { configGeneral, CUSTOM_ICONS, RoundingT } from "../config/globals";
import { AtomID, TButtonID, handlerT, IconT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import Button from "./Button";
import CardGeneric from "./CardGeneric";
import LazyComponent from "./LazyComponent";

interface ICardAtomProps {
  id: AtomID;
  stores: IStores;
  title: string;
  image_url: string;
  // pathname: string;
  // queryObject?: any;
  image_handler: handlerT;
  saved_actionable: boolean;
  saved_enabled: boolean;
  saved_handler: handlerT;
  edit_handler: handlerT;
  top_handler: handlerT;
  size_factor?: number;
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
    <Button
      stores={props.stores}
      icon={CUSTOM_ICONS.NETWORK as any}
      label="ItemPageDefault"
      icon_size={size_icon}
      bgColor="lightGray"
      displayLabel={false}
      onClick={props.top_handler}
    />
  );

  return (
    <LazyComponent
      sizes={card_sizes}
      topMargin={"200"}
      onChangeHandler={() => {
        props.stores.baseStore.setGoodImageInHistoryItem(props.id);
      }}
    >
      <>
        <CardGeneric
          id={props.id}
          stores={props.stores}
          title={props.title}
          image_url={props.image_url}
          color={color_item}
          sizes={card_sizes}
          rounding={rounding}
          image_handler={props.image_handler}
          TopIcon={topIcon}
          size_factor={props.size_factor}
        >
          <Box paddingX={0}>
            {props.saved_enabled && (
              <IconButton
                accessibilityLabel="edit"
                icon={buttons_all[TButtonID.EDIT].icon as IconT}
                iconColor={configGeneral.colors.iconColorDefault as any}
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
      </>
    </LazyComponent>
  );
};

export default observer(CardAtom);
