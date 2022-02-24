import { observer } from "mobx-react-lite";
import { Image, Box, Mask, Text } from "gestalt";
import {
  AtomID,
  ColorT,
  reactComponentT,
  RoundingT,
  SizeT,
} from "../config/globals";
import Link from "next/link";
import { IStores } from "../stores/RootStore";
import { configPaths } from "../config/globals";
import React from "react";

interface ICardSizes {
  height: number | string;
  width?: number;
  image_ratio: string;
  max_title_size: number;
  title_card_size: string;
}

interface ICardGenericProps {
  id: AtomID;
  stores: IStores;
  title: string;
  image_url: string;
  color: ColorT;
  colorEdge?: ColorT;
  color_image?: string;
  sizes: ICardSizes;
  rounding: RoundingT;
  pathname: string;
  queryObject?: any;
  full?: boolean;
  width_text?: string;
  TopIcon?: any;
}

const CardGeneric: React.FunctionComponent<ICardGenericProps> = (props) => {
  const rounding = props.rounding;
  const max_title_size = props.sizes.max_title_size;
  const title_card_size: SizeT = props.sizes.title_card_size;

  const width = props.width_text === undefined ? "75%" : props.width_text;

  let title = props.title;
  if (title.length > max_title_size) {
    title = props.title.substring(0, max_title_size) + "...";
  }

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
        naturalHeight={3000}
        naturalWidth={3000}
        loading="lazy"
        src={path_image}
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
      <Link
        prefetch={false}
        href={{
          pathname: configPaths.rootPath + props.pathname,
          query: { ...props.stores.baseStore.paramsPage, ...props.queryObject },
        }}
        passHref
      >
        <a>{image_only(component)}</a>
      </Link>
    );
  };

  const hasLink: boolean =
    props.pathname !== undefined && props.pathname !== "";

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
        opacity={0.9}
        padding={0}
        borderStyle="none"
        //
        width={c_width}
        rounding={c_rounding}
        marginBottom={c_marginBottom}
        //
      >
        <Box paddingX={1} paddingY={1} width={width}>
          <Text size={title_card_size} align="center" weight="bold">
            {title}
          </Text>
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

  return (
    <Box
      height={props.sizes.height}
      width={props.sizes.width !== undefined ? props.sizes.width : undefined}
      // borderStyle="shadow"
      borderStyle="lg"
      rounding={rounding}
      display="flex"
      direction="column"
    >
      <Box
        height="100%"
        width="100%"
        color={props.colorEdge === undefined ? "transparent" : props.colorEdge}
        padding={props.colorEdge === undefined ? 0 : 1}
        rounding={rounding}
      >
        <Mask rounding={rounding} height="100%" width="100%">
          {hasLink ? image_with_link(content) : image_only(content)}
        </Mask>
      </Box>
    </Box>
  );
};

export default observer(CardGeneric);
