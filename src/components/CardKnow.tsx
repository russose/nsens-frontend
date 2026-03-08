import { Box, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import {
  IButton,
  ICardKnowProps,
  IconT,
  RoundingT,
  TButtonID,
  buttons_all,
  configGeneral,
} from "../config/globals";
import Button from "./Button";
import CardGenericK from "./CardGenericK";
import LazyComponent from "./LazyComponent";
import { buildPublicName } from "../libs/utils";

const CardKnow: React.FunctionComponent<ICardKnowProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.knowbook_sizes;
  const color = configGeneral.colors.knowbook_color;
  const colorEdge = configGeneral.colors.knowbook_edge_color;
  const size_icon: IconT = GUI_CONFIG.display.size_icon_card;

  // card_sizes.height = Math.round(card_sizes.height * 0.5);
  // card_sizes.width = Math.round(card_sizes.width * 0.5);

  const rounding: RoundingT = GUI_CONFIG.display.rounding_knowbooks;

  const color_image =
    props.color_image === undefined
      ? configGeneral.colors.knowbook_color_image
      : props.color_image;

  const buttons_all_label = GUI_CONFIG.language.buttons_all_label as any;

  const buttons_knowbook: IButton[] =
    props.buttons !== undefined &&
    props.buttons.length !== 0 &&
    props.buttons.filter((button) => {
      return button.hidden === false || button.hidden === undefined;
    }).length !== 0
      ? props.buttons
      : [
          {
            Id: TButtonID.DELETE,
            onClick: undefined,
            iconColor: "white",
            disabled: true,
            hidden: false,
          },
        ];

  const nb_saved_counter = props.knowbook.public && (
    <Box display="flex" direction="column" justifyContent="center" padding={0}>
      <Text size={card_sizes.size_text_title as any} weight="bold">
        {props.knowbook.nb_saved}
      </Text>
    </Box>
  );

  return (
    <LazyComponent sizes={card_sizes} topMargin={"-100"}>
      <CardGenericK
        id={props.knowbook.id.toString()}
        stores={props.stores}
        // title={props.knowbook.name}
        title={
          props.knowbook.public
            ? buildPublicName(
                props.knowbook.name,
                props.knowbook.owner_username
              )
            : props.knowbook.name
        }
        color={color}
        colorEdge={colorEdge}
        color_image={color_image}
        image_url={props.knowbook.image_url}
        sizes={card_sizes}
        rounding={rounding}
        image_handler={props.image_handler}
        size_factor={props.size_factor}
      >
        {nb_saved_counter}

        {buttons_knowbook.map((button) => {
          const display = button.hidden ? "none" : "block";
          const label =
            buttons_all_label[button.Id] === undefined
              ? "no button"
              : buttons_all_label[button.Id].label;

          return (
            <Box
              key={`'box_knowbook'-${props.id}-${button.Id}`}
              alignItems="center"
              display={display}
            >
              <Button
                key={`${props.id}-${button.Id}`}
                stores={props.stores}
                icon={buttons_all[button.Id].icon}
                // label={buttons_all_label[button.Id].label}
                label={label}
                icon_size={size_icon}
                iconColor={button.iconColor}
                disabled={button.disabled}
                onClick={button.onClick}
                // tooltip={button.tooltip}
                displayLabel={false}
              />
            </Box>
          );
        })}
      </CardGenericK>
    </LazyComponent>
  );
};

export default observer(CardKnow);
