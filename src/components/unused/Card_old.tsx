import { SyntheticEvent } from "react";
import { observer } from "mobx-react";
import { JsText } from "./js_components";
import { Touchable, Image, Box, IconButton } from "gestalt";
import ColoredContour from "./ColoredContour";

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

export const Card: React.FunctionComponent<ICardProps> = (props) => {
  const my_size = "sm";
  return (
    <Box color="green" padding={1} column={6} minWidth={150} maxWidth={300}>
      <ColoredContour
        color_contour={props.color}
        color_inside="white"
        rounding={3}
      >
        <JsText align="center" size="sm" weight="bold">
          {props.title}
        </JsText>

        <Touchable onTouch={props.image_handler} rounding={1}>
          <Box
            color="darkGray"
            height={150}
            width={150}
            marginLeft={4}
            marginRight={4}
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
          </Box>
        </Touchable>

        <Box
          display="flex"
          direction="row"
          justifyContent="end"
          alignItems="center"
          padding={2}
        >
          <IconButton
            accessibilityLabel="save"
            icon="angled-pin"
            iconColor={props.saved_enabled ? "red" : "gray"}
            bgColor="white"
            size={my_size}
            onClick={props.saved_handler}
          />
          {/* <IconButton
            accessibilityLabel="like"
            icon="heart"
            iconColor={props.liked_enabled ? "red" : "gray"}
            size={my_size}
            onClick={props.liked_handler}
          /> */}
        </Box>
      </ColoredContour>
    </Box>
  );
};

export default observer(Card);
