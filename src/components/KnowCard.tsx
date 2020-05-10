import { observer } from "mobx-react";
import { JsText } from "./js_components";
import { Image, Box, Mask, Letterbox, Collage } from "gestalt";
import { KnowbookID } from "../types";
import { ParsedUrlQueryInput } from "querystring";
import Link from "next/link";
import { card_dim, padding_grid, title_card_size, size_icon } from "../config";

interface IKnowCardProps {
  id: KnowbookID;
  name: string;
  image_url: string[];
  pathname: string;
  queryObject: ParsedUrlQueryInput;
  amount: number;
}

// const width_screen = window.innerWidth;
// const height_screen = window.innerHeight;

export const KnowCard: React.FunctionComponent<IKnowCardProps> = (props) => {
  let collage;
  const images_src = props.image_url.slice(0, 4);
  if (props.image_url.length < 4) {
    collage = (
      <Image
        alt="image"
        color="transparent"
        fit="cover"
        naturalHeight={1}
        naturalWidth={1}
        loading="lazy"
        src={props.image_url[0]}
      />
    );
  } else {
    collage = (
      <Collage
        columns={2}
        height={card_dim}
        width={card_dim}
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
        maxWidth={card_dim}
      >
        <Box padding={1} width={card_dim}>
          <JsText align="center" size={title_card_size} weight="bold">
            {/* {props.name.charAt(0).toUpperCase() + props.name.slice(1)} */}
            {props.name}
          </JsText>
        </Box>

        <Mask rounding={2}>
          <Letterbox height={card_dim} width={card_dim} contentAspectRatio={1}>
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
