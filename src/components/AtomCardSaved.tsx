import { observer } from "mobx-react";
import { JsText } from "./js_components";
import { Image, Box, IconButton, Mask, Letterbox, TextField } from "gestalt";
import { AtomID } from "../types";
import { card_dim, size_icon, padding_grid, title_card_size } from "../config";

interface IAtomCardSavedProps {
  id: AtomID;
  title: string;
  image_url: string;
}

// const width_screen = window.innerWidth;
// const height_screen = window.innerHeight;

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
        // column={5}
        // minWidth={150}
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
          />
        </Box>
      </Box>
    </Box>
  );
};

export default observer(AtomCardSaved);
