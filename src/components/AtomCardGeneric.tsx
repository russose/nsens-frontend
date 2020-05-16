import { SyntheticEvent } from "react";
import { observer } from "mobx-react";
import { JsText } from "./js_components";
import { Image, Box, IconButton, Mask, Letterbox } from "gestalt";
import { AtomID } from "../types";
import { USER_DISPLAY } from "../config";

interface IAtomCardGenericProps {
  id: AtomID;
  title: string;
  image_url: string;
  saved_enabled: boolean;
  saved_desactivated: boolean;
  saved_handler: (args: { event: SyntheticEvent<any> }) => void;
  edit_handler: any;
}

// const width_screen = window.innerWidth;
// const height_screen = window.innerHeight;
// console.log(width_screen, height_screen);

const card_dim = USER_DISPLAY.card_dim;
const title_card_size = USER_DISPLAY.title_card_size;
const padding_grid: any = USER_DISPLAY.padding_grid;
const size_icon: any = USER_DISPLAY.size_icon;

const AtomCardGeneric: React.FunctionComponent<IAtomCardGenericProps> = (
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
          <Box paddingX={2}>
            {props.saved_enabled && (
              <IconButton
                accessibilityLabel="edit"
                icon="edit"
                iconColor="darkGray"
                bgColor="transparent"
                size={size_icon}
                onClick={props.edit_handler}
              />
            )}
          </Box>
          <Box paddingX={1}>
            <IconButton
              accessibilityLabel="save"
              icon="angled-pin"
              iconColor={props.saved_enabled ? "red" : "darkGray"}
              bgColor="transparent"
              size={size_icon}
              onClick={props.saved_handler}
              disabled={props.saved_desactivated}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default observer(AtomCardGeneric);
