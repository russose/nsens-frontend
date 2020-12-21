import { observer } from "mobx-react-lite";
import { JsText } from "./js_components";
import { Image, Box, Mask } from "gestalt";
import { AtomID } from "../common/types";
import { USER_DISPLAY } from "../common/config";
import { ParsedUrlQueryInput } from "querystring";
import Link from "next/link";

interface ICardSizes {
  height: number;
  image_ratio: string;
  max_title_size: number;
}

interface ICardGenericProps {
  id: AtomID;
  title: string;
  image_url: string;
  color_image: string;
  sizes: ICardSizes;
  pathname?: string;
  queryObject?: ParsedUrlQueryInput;
}

const title_card_size = USER_DISPLAY.title_card_size;
const path_empty_image = USER_DISPLAY.paths.item_empty_image;

const rounding = 3;

const CardGeneric: React.FunctionComponent<ICardGenericProps> = (props) => {
  const max_title_size = props.sizes.max_title_size;
  let title = props.title;
  if (title.length > max_title_size) {
    title = props.title.substring(0, max_title_size) + "...";
  }
  return (
    <Box height={props.sizes.height}>
      <Box
        height="100%"
        borderSize="lg"
        rounding={rounding}
        display="flex"
        direction="column"
      >
        <Box height={props.sizes.image_ratio} width="100%">
          <Mask rounding={rounding} height="100%" width="100%">
            <Link
              href={{ pathname: props.pathname, query: props.queryObject }}
              passHref
            >
              <a>
                <Image
                  alt="image"
                  color={props.image_url === "" ? props.color_image : "white"}
                  fit="cover"
                  naturalHeight={1}
                  naturalWidth={1}
                  loading="auto"
                  src={
                    props.image_url === "" || props.image_url === undefined
                      ? path_empty_image
                      : props.image_url
                  }
                  // src=""
                ></Image>
              </a>
            </Link>
          </Mask>
          <Box display="flex" direction="row" height="2%"></Box>

          <Box
            display="flex"
            direction="row"
            justifyContent="between"
            alignItems="center"
            padding={0}
          >
            <Box padding={1} width="85%">
              <JsText size={title_card_size} align="left" weight="bold">
                {title}
              </JsText>
            </Box>

            <Box
              display="flex"
              direction="row"
              justifyContent="end"
              alignItems="center"
              padding={0}
            >
              {props.children}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default observer(CardGeneric);
