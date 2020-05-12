import { observer } from "mobx-react";
import { JsText } from "./js_components";
import { Image, Box, IconButton, Mask, Letterbox, Modal, Layer } from "gestalt";
import { AtomID } from "../types";
import { USER_DISPLAY } from "../config";
import React from "react";

interface IAtomCardSavedProps {
  id: AtomID;
  title: string;
  image_url: string;
  edit_handler: any;
}

// const width_screen = window.innerWidth;
// const height_screen = window.innerHeight;

const card_dim = USER_DISPLAY.card_dim;
const title_card_size = USER_DISPLAY.title_card_size;
const padding_grid: any = USER_DISPLAY.padding_grid;
const size_icon: any = USER_DISPLAY.size_icon;

export const AtomCardSaved: React.FunctionComponent<IAtomCardSavedProps> = (
  props
) => {
  return (
    <Box padding={padding_grid}>
      <Box
        color="white"
        display="flex"
        direction="column"
        justifyContent="between"
        // alignItems="center"
        borderSize="lg"
        rounding={6}
        padding={1}
        maxWidth={card_dim}
      >
        <Box padding={1} width={card_dim}>
          <JsText align="center" size={title_card_size} weight="bold">
            {props.title}
          </JsText>
        </Box>

        <Mask rounding={6}>
          <Letterbox height={card_dim} width={card_dim} contentAspectRatio={1}>
            <Image
              alt="image"
              color="transparent"
              fit="cover"
              naturalHeight={1}
              naturalWidth={1}
              loading="lazy"
              src={props.image_url}
            />
          </Letterbox>
        </Mask>

        <Box display="flex" direction="row" justifyContent="end" padding={0}>
          <IconButton
            accessibilityLabel="edit"
            icon="edit"
            iconColor="darkGray"
            bgColor="transparent"
            size={size_icon}
            onClick={props.edit_handler}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default observer(AtomCardSaved);
