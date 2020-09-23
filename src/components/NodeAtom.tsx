import { observer } from "mobx-react";
import { JsText } from "./js_components";
import { Image, Box, IconButton } from "gestalt";
import { AtomID } from "../common/types";
import { USER_DISPLAY } from "../common/config";

interface INodeAtomProps {
  id: AtomID;
  title: string;
  thumbnail_url: string;
  saved_actionable: boolean;
  saved_enabled: boolean;
  saved_handler: any;
  edit_handler: any;
}

const title_card_size = USER_DISPLAY.title_card_size;
const size_icon: any = USER_DISPLAY.size_icon;
const color_image = USER_DISPLAY.colors.item_color_image;

const NodeAtom: React.FunctionComponent<INodeAtomProps> = (props) => {
  return (
    <Box
      display="flex"
      direction="column"
      // justifyContent="around"
      // alignItems="center"
      borderSize="lg"
      color="white"
      rounding={2}
      padding={1}
    >
      <Box
        display="flex"
        direction="row"
        justifyContent="around"
        alignItems="center"
        // borderSize="lg"
        // color="white"
        // rounding={4}
        // padding={1}
      >
        <Box padding={0} width="50%" height="50%">
          <Image
            alt="image"
            color={props.thumbnail_url === "" ? color_image : "white"}
            // fit="cover"
            naturalHeight={1}
            naturalWidth={1}
            loading="auto"
            src={props.thumbnail_url}
          />
        </Box>

        <Box paddingX={0}>
          {props.saved_enabled && (
            <IconButton
              accessibilityLabel="edit"
              icon="edit"
              iconColor="darkGray"
              size={size_icon}
              onClick={props.edit_handler}
            />
          )}
        </Box>
        <Box paddingX={0}>
          <IconButton
            accessibilityLabel="save"
            icon="angled-pin"
            iconColor={props.saved_enabled ? "red" : "darkGray"}
            size={size_icon}
            onClick={props.saved_handler}
            disabled={!props.saved_actionable}
          />
        </Box>
      </Box>
      <Box padding={2}></Box>
      <Box padding={0}>
        <JsText size={title_card_size} align="left" weight="bold">
          {props.title}
        </JsText>
      </Box>
    </Box>
  );
};

export default observer(NodeAtom);
