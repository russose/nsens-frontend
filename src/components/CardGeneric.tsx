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
  lgColumn: any;
  mdColumn: any;
  smColumn: any;
  column: any;
  lgPadding?: any;
  mdPadding?: any;
  smPadding?: any;
  padding?: any;
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

//const card_height = USER_DISPLAY.card_height;
const title_card_size = USER_DISPLAY.title_card_size;

const CardGeneric: React.FunctionComponent<ICardGenericProps> = (props) => {
  return (
    <Box
      // padding={padding_grid}
      height={props.sizes.height}
      lgColumn={props.sizes.lgColumn}
      mdColumn={props.sizes.mdColumn}
      smColumn={props.sizes.smColumn}
      column={props.sizes.column}
      lgPadding={props.sizes.lgPadding}
      mdPadding={props.sizes.mdPadding}
      smPadding={props.sizes.smPadding}
      padding={props.sizes.padding}
    >
      <Box
        height="100%"
        borderSize="lg"
        rounding={4}
        display="flex"
        direction="column"
      >
        <Box height={props.sizes.image_ratio} width="100%">
          <Mask rounding={4} height="100%" width="100%">
            <Link
              href={{ pathname: props.pathname, query: props.queryObject }}
              as={props.pathname}
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
                  src={props.image_url}
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
                {props.title}
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
