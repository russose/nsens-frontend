import { Box, Image, Mask, TapArea, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { AtomID, ColorT, RoundingT, SizeT, handlerT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { ICardSizes } from "./CardGeneric";
// import ImageLazy from "./ImageLazy";

interface Props {
  children?: React.ReactNode;
  id: AtomID;
  stores: IStores;
  title: string;
  image_url: string;
  color: ColorT;
  colorEdge?: ColorT;
  color_image?: string;
  sizes: ICardSizes;
  rounding: RoundingT;
  image_handler: handlerT;
  size_factor?: number;
}

const CardGenericK: React.FunctionComponent<Props> = (props) => {
  const rounding = props.rounding;
  // const max_title_size = props.sizes.max_title_size;
  const title_card_size: SizeT = props.sizes.size_text_title;

  // let title = props.title;
  // if (title.length > max_title_size) {
  //   title = shortenString(title, max_title_size);
  // }

  const color_image =
    props.color_image !== undefined ? props.color_image : "white";
  const path_image = props.image_url !== undefined ? props.image_url : "";

  const image_with_link = (
    <TapArea fullHeight={true} onTap={props.image_handler}>
      <Image
        key={props.id}
        alt={props.title}
        color={color_image}
        fit="cover"
        naturalHeight={300}
        naturalWidth={300}
        loading="lazy"
        src={path_image}
        // importance="high"
      >
        <Box
          display="flex"
          direction="column"
          height="100%"
          justifyContent="end"
          alignItems="center"
          padding={0}
        ></Box>
      </Image>
    </TapArea>
  );

  let height_ = props.sizes.height;
  let width_ = props.sizes.width;
  if (
    props.size_factor !== undefined &&
    typeof props.sizes.height === "number" &&
    typeof props.sizes.width === "number"
  ) {
    height_ = Math.round((height_ as number) * props.size_factor);
    width_ = Math.round((width_ as number) * props.size_factor);
  }

  const title_and_icons = (
    <Box width={width_ !== undefined ? width_ : undefined}>
      <Box display="flex" direction="row" justifyContent="evenly" padding={0}>
        {props.children}
      </Box>
      <Box
        justifyContent="between"
        alignItems="center"
        color={props.color}
        // opacity={0.9}
        padding={0}
        borderStyle="lg"
        width="100%"
        rounding={2}
      >
        <Box paddingX={1} paddingY={1} width="100%">
          <Text
            size={title_card_size}
            align="center"
            weight="bold"
            lineClamp={2}
          >
            {props.title}
          </Text>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
      // height={height_}
      // width={width_ !== undefined ? width_ : undefined}
      // borderStyle="shadow"
      // rounding={rounding}
      // display="flex"
      // direction="column"
      // color="brand"
      >
        <Box
          height={height_}
          width={width_ !== undefined ? width_ : undefined}
          borderStyle="shadow"
          rounding={rounding}
          // display="flex"
          // direction="column"
        >
          <Box
            height="100%"
            width="100%"
            color={
              props.colorEdge === undefined ? "transparent" : props.colorEdge
            }
            padding={props.colorEdge === undefined ? 0 : 1}
            rounding={rounding}
          >
            <Mask rounding={rounding as RoundingT} height="100%" width="100%">
              {image_with_link}
            </Mask>
          </Box>
        </Box>
        {title_and_icons}
      </Box>
    </>
  );
};

export default observer(CardGenericK);
