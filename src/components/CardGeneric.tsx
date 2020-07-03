import { observer } from "mobx-react";
import { JsText } from "./js_components";
import { Image, Box, Mask } from "gestalt";
import { AtomID } from "../srcCommon/types";
import { USER_DISPLAY } from "../srcCommon/config";
import { ParsedUrlQueryInput } from "querystring";
import Link from "next/link";

interface ICardSizes {
  height: number;
  image_ratio: string;
  lgColumn: any;
  mdColumn: any;
  smColumn: any;
  column: any;
}

interface ICardGenericProps {
  id: AtomID;
  title: string;
  image_url: string;
  sizes: ICardSizes;
  pathname?: string;
  queryObject?: ParsedUrlQueryInput;
}

//const card_height = USER_DISPLAY.card_height;
const title_card_size = USER_DISPLAY.title_card_size;
const padding_grid: any = USER_DISPLAY.padding_grid;

const CardGeneric: React.FunctionComponent<ICardGenericProps> = (props) => {
  return (
    <Box
      padding={padding_grid}
      height={props.sizes.height}
      lgColumn={props.sizes.lgColumn}
      mdColumn={props.sizes.mdColumn}
      smColumn={props.sizes.smColumn}
      column={props.sizes.column}
    >
      <Box height="100%" borderSize="lg" rounding={4}>
        <Box height={props.sizes.image_ratio} width="100%">
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default observer(CardGeneric);
