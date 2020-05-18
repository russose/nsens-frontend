import { observer } from "mobx-react";
import { JsText } from "./js_components";
import { Image, Box, Mask } from "gestalt";
import { AtomID } from "../types";
import { USER_DISPLAY } from "../config";
import { ParsedUrlQueryInput } from "querystring";
import Link from "next/link";

interface ICardGenericProps {
  id: AtomID;
  title: string;
  image_url: string;
  pathname?: string;
  queryObject?: ParsedUrlQueryInput;
}

const card_height = USER_DISPLAY.card_height;
const title_card_size = USER_DISPLAY.title_card_size;
const padding_grid: any = USER_DISPLAY.padding_grid;

const CardGeneric: React.FunctionComponent<ICardGenericProps> = (props) => {
  return (
    <Box
      padding={padding_grid}
      height={card_height}
      lgColumn={2}
      mdColumn={3}
      smColumn={4}
      column={6}
    >
      <Box height="100%" borderSize="lg" rounding={4}>
        <Box height="80%" width="100%">
          <Mask rounding={4} height="100%" width="100%">
            <Link href={{ pathname: props.pathname, query: props.queryObject }}>
              <a>
                <Image
                  alt="image"
                  color="white"
                  fit="cover"
                  naturalHeight={1}
                  naturalWidth={1}
                  loading="auto"
                  src={props.image_url}
                ></Image>
              </a>
            </Link>
          </Mask>
          <Box
            display="flex"
            direction="row"
            justifyContent="between"
            alignItems="center"
            padding={0}
          >
            <Box padding={1} width="85%">
              <JsText size={title_card_size} align="left" weight="bold">
                {props.title}
              </JsText>
            </Box>

            <Box
              display="flex"
              direction="row"
              justifyContent="end"
              padding={0}
            >
              {props.children}
              {/* <Box paddingX={0}>
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
                  disabled={props.saved_desactivated}
                />
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default observer(CardGeneric);
