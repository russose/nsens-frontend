import { observer } from "mobx-react";
import { Image, Box, Mask, Letterbox, Collage } from "gestalt";
import { ParsedUrlQueryInput } from "querystring";
import Link from "next/link";
import { JsText } from "../js_components";
import { KnowbookID } from "../../types";
import { USER_DISPLAY, CONFIG_FETCHING } from "../../config";

interface IKnowCardProps {
  id: KnowbookID;
  name: string;
  images_url: string[];
  pathname: string;
  queryObject: ParsedUrlQueryInput;
  amount: number | string;
}

// const width_screen = window.innerWidth;
// const height_screen = window.innerHeight;

const folder_dim = USER_DISPLAY.folder_dim;
const title_card_size = USER_DISPLAY.title_card_size;
const padding_grid: any = USER_DISPLAY.padding_grid;

const KnowCard: React.FunctionComponent<IKnowCardProps> = (props) => {
  let collage;
  const images_src = props.images_url.slice(0, 4);
  if (props.images_url === undefined || props.images_url.length === 0) {
    collage = (
      <Image
        alt="image"
        color="transparent"
        fit="cover"
        naturalHeight={1}
        naturalWidth={1}
        loading="auto"
        src={CONFIG_FETCHING.path_empty_image}
      />
    );
  } else if (props.images_url.length < 4) {
    collage = (
      <Image
        alt="image"
        color="transparent"
        fit="cover"
        naturalHeight={1}
        naturalWidth={1}
        loading="auto"
        src={props.images_url[0]}
      />
    );
  } else {
    collage = (
      <Collage
        columns={2}
        height={folder_dim}
        width={folder_dim}
        renderImage={({ index, width, height }) => {
          const images = images_src.map((src) => {
            return {
              color: "transparent",
              naturalHeight: 1,
              naturalWidth: 1,
              src: src,
            };
          });
          const image = images[index];
          return (
            <Mask wash width={width} height={height}>
              <Image
                alt="collage image"
                color={image.color}
                fit="cover"
                naturalHeight={image.naturalHeight}
                naturalWidth={image.naturalWidth}
                src={image.src}
              />{" "}
            </Mask>
          );
        }}
      />
    );
  }

  return (
    <Box padding={padding_grid}>
      <Box
        color="lightGray"
        display="flex"
        direction="column"
        justifyContent="between"
        borderSize="lg"
        rounding={2}
        padding={1}
      >
        <Box padding={1}>
          <JsText align="center" size={title_card_size} weight="bold">
            {/* {props.name.charAt(0).toUpperCase() + props.name.slice(1)} */}
            {props.name}
          </JsText>
        </Box>

        <Mask rounding={2}>
          <Letterbox
            height={folder_dim}
            width={folder_dim}
            contentAspectRatio={1}
          >
            <Link href={{ pathname: props.pathname, query: props.queryObject }}>
              <a>{collage}</a>
            </Link>
          </Letterbox>
        </Mask>
        <Box display="flex" direction="row" justifyContent="end" padding={1}>
          <JsText align="center" size="sm" weight="bold">
            {props.amount}
          </JsText>
        </Box>
      </Box>
    </Box>
  );
};

export default observer(KnowCard);
