import { observer } from "mobx-react-lite";
import { Box, IconButton } from "gestalt";
import { AtomID, ButtonIDType, handlerT, IconT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { configGeneral } from "../config/globals";
import React from "react";
import CardGenericCompact from "./CardGenericCompact";
import CardGenericCompactExtra from "./CardGenericCompactExtra";

interface ICardAtomCompactVizProps {
  id: AtomID;
  stores: IStores;
  title: string;
  image_url: string;
  pathname?: string;
  queryObject?: any;
  saved_actionable: boolean;
  saved_enabled: boolean;
  saved_handler: handlerT;
  edit_handler: handlerT;
  CompactExtra?: boolean;
}

const CardAtomCompactViz: React.FunctionComponent<ICardAtomCompactVizProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  let size_icon: IconT = GUI_CONFIG.display.size_icon_card;
  const color_item = configGeneral.colors.item_compact_color;
  const color_image = configGeneral.colors.item_color_image;
  let card_sizes = GUI_CONFIG.display.atom_compact_vizs_sizes;
  if (props.CompactExtra === true) {
    size_icon = "xs";
  }

  const buttons_all = GUI_CONFIG.language.buttons;

  const icons = (
    <>
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
    </>
  );

  return props.CompactExtra ? (
    <CardGenericCompactExtra
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
      {icons}
    </CardGenericCompactExtra>
  ) : (
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
      {icons}
    </CardGenericCompact>
  );
};

export default observer(CardAtomCompactViz);
