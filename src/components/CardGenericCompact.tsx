import { observer } from "mobx-react-lite";
import { Image, Box, Mask, Text } from "gestalt";
import { AtomID } from "../common/types";
import { GUI_CONFIG } from "../common/config";
import { ParsedUrlQueryInput } from "querystring";
import Link from "next/link";

interface ICardSizes {
  height: number;
  width: number;
  // image_ratio: string;
  max_title_size: number;
}

interface ICardGenericCompactProps {
  id: AtomID;
  title: string;
  image_url: string;
  color_image: string;
  sizes: ICardSizes;
  pathname?: string;
  queryObject?: ParsedUrlQueryInput;
}

const title_card_size: any = GUI_CONFIG.display.title_card_size;
const path_empty_image = GUI_CONFIG.paths.item_empty_image;

const rounding = 3;

const CardGenericCompact: React.FunctionComponent<ICardGenericCompactProps> = (
  props
) => {
  const max_title_size = props.sizes.max_title_size;
  let title = props.title;
  if (title.length > max_title_size) {
    title = props.title.substring(0, max_title_size) + "...";
  }
  return (
    // <Box height={props.sizes.height} width={props.sizes.width} color="white">
    <Box height={props.sizes.height} width={props.sizes.width}>
      <Box
        height="100%"
        borderStyle="shadow"
        // borderStyle="lg"
        rounding={rounding}
        display="flex"
        direction="column"
      >
        <Box
          display="flex"
          direction="row"
          justifyContent="between"
          alignItems="start"
          padding={0}
          // height={props.sizes.image_ratio}
          height="100%"
        >
          <Box padding={1} height="100%" width="100%">
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
          </Box>

          <Box display="flex" direction="column" padding={0}>
            {props.children}
          </Box>
        </Box>

        <Box padding={1}>
          <Text size={title_card_size} align="left" weight="bold">
            {title}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default observer(CardGenericCompact);
