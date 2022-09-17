import { observer } from "mobx-react-lite";
import { Box, IconButton } from "gestalt";
import { ICardKnowProps, IconT, RoundingT } from "../config/globals";
import CardGeneric from "./CardGeneric";
import { configGeneral } from "../config/globals";
import LazyComponent from "./LazyComponent";

const CardKnow: React.FunctionComponent<ICardKnowProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.knowbook_sizes;
  const color = configGeneral.colors.knowbook_color;
  const colorEdge = configGeneral.colors.knowbook_edge_color;
  const size_icon: IconT = GUI_CONFIG.display.size_icon_card;
  const display_edit_icon = props.rename_handler === undefined ? false : true;
  const display_delete_icon =
    props.amount === 0 && props.delete_handler !== undefined ? true : false;

  const width = display_edit_icon || display_edit_icon ? undefined : "100%";
  const rounding: RoundingT = GUI_CONFIG.display.rounding_knowbooks;

  const color_image =
    props.color_image === undefined
      ? configGeneral.colors.knowbook_color_image
      : props.color_image;

  return (
    <LazyComponent sizes={card_sizes} topMargin={"-100"}>
      <CardGeneric
        id={props.id}
        stores={props.stores}
        title={props.title}
        color={color}
        colorEdge={colorEdge}
        color_image={color_image}
        image_url={props.image_url}
        sizes={card_sizes}
        rounding={rounding}
        image_handler={props.image_handler}
        full={false}
        width_text={width}
      >
        <Box paddingX={0}>
          {display_delete_icon && (
            <IconButton
              accessibilityLabel="clear"
              icon="clear"
              iconColor={configGeneral.colors.iconColorDefault as any}
              size={size_icon}
              onClick={props.delete_handler(props.id)}
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
              onClick={props.rename_handler(props.id)}
            />
          )}
        </Box>
      </CardGeneric>
    </LazyComponent>
  );
};

export default observer(CardKnow);
