import { observer } from "mobx-react-lite";
import { JsText } from "../js_components";
import { Image, Box, IconButton } from "gestalt";
import { AtomID } from "../../common/types";
import { USER_DISPLAY } from "../../common/config";
import { ParsedUrlQueryInput } from "querystring";
import Link from "next/link";

export interface INodeAtomProps {
  id: AtomID;
  title: string;
  thumbnail_url: string;
  saved_actionable: boolean;
  saved_enabled: boolean;
  saved_handler: any;
  edit_handler: any;
  pathname?: string;
  queryObject?: ParsedUrlQueryInput;
}

const title_card_size = USER_DISPLAY.title_card_size;
const size_icon: any = USER_DISPLAY.size_icon;
// const color_image = USER_DISPLAY.colors.item_color_image;
const max_title_size = USER_DISPLAY.network.max_title_size;
const image_size = USER_DISPLAY.network.image_size;

const NodeAtom: React.FunctionComponent<INodeAtomProps> = (props) => {
  let title = props.title;
  if (title.length > max_title_size) {
    title = props.title.substring(0, max_title_size) + "...";
  }

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
        // color="white"
        // borderSize="lg"
        // rounding={4}
        // padding={1}
      >
        {/* <Box padding={0} width="50%" height="50%"> */}
        <Box padding={1} width={image_size} height={image_size}>
          <Link
            href={{ pathname: props.pathname, query: props.queryObject }}
            as={props.pathname}
            passHref
          >
            <a>
              <Image
                alt="image"
                // color={props.thumbnail_url === "" ? color_image : "white"}
                color="white"
                fit="cover"
                naturalHeight={1}
                naturalWidth={1}
                loading="auto"
                src={props.thumbnail_url}
              />
            </a>
          </Link>
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
      {/* <Box padding={0}></Box> */}
      <Box padding={0}>
        <JsText size={title_card_size} align="left" weight="bold">
          {title}
        </JsText>
      </Box>
    </Box>
  );
};

export default observer(NodeAtom);
