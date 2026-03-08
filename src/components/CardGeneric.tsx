import { Box, Image, Mask, TapArea, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  AtomID,
  ColorT,
  RoundingT,
  SizeT,
  handlerT,
  reactComponentT,
} from "../config/globals";
import { IStores } from "../stores/RootStore";

export interface ICardSizes {
  height: number | string;
  width?: number;
  image_ratio: string;
  // max_title_size: number;
  size_text_title: string;
}

interface ICardGenericProps {
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
  // pathname: string;
  // queryObject?: any;
  image_handler: handlerT;
  full?: boolean;
  width_text?: string;
  TopIcon?: any;

  TypeIcon: any;
  size_factor?: number;
  externalyzeTitle: boolean;
}

const CardGeneric: React.FunctionComponent<ICardGenericProps> = (props) => {
  const rounding = props.rounding;
  // const max_title_size = props.sizes.max_title_size;
  const title_card_size: SizeT = props.sizes.size_text_title;

  // const width = props.width_text === undefined ? "75%" : props.width_text;
  const width = props.width_text === undefined ? "100%" : props.width_text;

  // let title = props.title;
  // if (title.length > max_title_size) {
  //   title = shortenString(title, max_title_size);
  // }

  const color_image =
    props.color_image !== undefined ? props.color_image : "white";
  const path_image = props.image_url !== undefined ? props.image_url : "";

  const image_only = (component: reactComponentT) => {
    return (
      <Image
        key={props.id}
        alt={props.title}
        color={color_image}
        fit="cover"
        naturalHeight={300}
        naturalWidth={300}
        // loading="lazy"
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
        >
          {component}
        </Box>
      </Image>
    );
  };

  const image_with_link = (component: reactComponentT) => {
    return (
      <TapArea fullHeight={true} onTap={props.image_handler}>
        {image_only(component)}
      </TapArea>
    );
  };

  let c_width: string;
  let c_rounding: any;
  let c_marginBottom: any;

  if (props.full === false) {
    c_width = "65%";
    c_rounding = 3;
    c_marginBottom = 9;
  } else {
    c_width = "100%";
    c_rounding = 0;
    c_marginBottom = 4;
  }

  const title_card = (
    <Text size={title_card_size} align="center" weight="bold" lineClamp={4}>
      {props.title}
    </Text>
  );
  const title_card_inside =
    props.externalyzeTitle === true ? <></> : title_card;

  const title_card_externalyzed =
    props.externalyzeTitle === true ? (
      <>
        <Box padding={1} />
        <Box>{title_card}</Box>
      </>
    ) : (
      <></>
    );

  const content: reactComponentT = (
    <>
      {props.TopIcon !== undefined && (
        <Box
          height="100%"
          width="100%"
          display="flex"
          direction="row"
          justifyContent="end"
          alignItems="start"
          padding={2}
        >
          {props.TopIcon}
        </Box>
      )}

      <Box
        display="flex"
        direction="row"
        justifyContent="between"
        alignItems="center"
        color={props.color}
        opacity={1} //0.9
        padding={0}
        borderStyle="none"
        //
        width={c_width}
        rounding={c_rounding}
        marginBottom={c_marginBottom}
        //
      >
        <Box paddingX={1}>{props.TypeIcon}</Box>
        <Box paddingX={0} paddingY={1} width={width}>
          {/* <Text size={title_card_size} align="center" weight="bold">
            {title}
          </Text> */}
          {title_card_inside}
        </Box>
        <Box
          display="flex"
          direction="row"
          justifyContent="end"
          alignItems="center"
          padding={0}
          wrap={true}
        >
          {props.children}
        </Box>
      </Box>
    </>
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

  return (
    <>
      <Box width={width_ !== undefined ? width_ : undefined}>
        <Box
          // height={props.sizes.height}
          // width={props.sizes.width !== undefined ? props.sizes.width : undefined}
          height={height_}
          // width={width_ !== undefined ? width_ : undefined}
          borderStyle="shadow"
          rounding={rounding}
          display="flex"
          direction="column"
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
              {props.image_handler !== undefined
                ? image_with_link(content)
                : image_only(content)}
            </Mask>
          </Box>
        </Box>
        {title_card_externalyzed}
      </Box>
    </>
  );
};

export default observer(CardGeneric);
