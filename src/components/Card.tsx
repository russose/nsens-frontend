import { SyntheticEvent } from "react";
import { observer } from "mobx-react";
import { JsText } from "./js_components";
import {
  Touchable,
  Image,
  Box,
  IconButton,
  Card,
  Mask,
  Letterbox,
} from "gestalt";

interface ICardProps {
  id: number;
  title: string;
  image_url: string;
  image_handler: (args: { event: SyntheticEvent<any> }) => void;
  saved_enabled: boolean;
  saved_handler: (args: { event: SyntheticEvent<any> }) => void;
  // liked_enabled: boolean;
  // liked_handler: (args: { event: SyntheticEvent<any> }) => void;
  color: any;
}

// const width_screen = window.innerWidth;
// const height_screen = window.innerHeight;
const image_dim = 150;
const my_size = "xs";

export const CardAtom: React.FunctionComponent<ICardProps> = (props) => {
  return (
    <Box padding={3}>
      <Box
        color="lightGray"
        display="flex"
        direction="column"
        justifyContent="between"
        // alignItems="center"
        borderSize="lg"
        rounding={4}
        padding={1}
        // column={5}
        // minWidth={150}
        // maxWidth={300}
      >
        <Box padding={1} width={image_dim}>
          <JsText align="center" size="sm" weight="bold">
            {props.title}
          </JsText>
        </Box>

        <Mask rounding={3}>
          <Letterbox
            height={image_dim}
            width={image_dim}
            contentAspectRatio={1}
          >
            <Image
              alt="image"
              color="white"
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
            accessibilityLabel="save"
            icon="angled-pin"
            iconColor={props.saved_enabled ? "red" : "darkGray"}
            bgColor="transparent"
            size={my_size}
            onClick={props.saved_handler}
          />
        </Box>
      </Box>{" "}
    </Box>
  );
};

export default observer(CardAtom);
