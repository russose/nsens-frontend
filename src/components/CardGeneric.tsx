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

interface ICardSizes {
  height: number | string;
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
  color_image?: string;
  sizes: ICardSizes;
  pathname: string;
  queryObject?: any;
  full?: boolean;
}

const CardGeneric: React.FunctionComponent<ICardGenericProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const path_empty_image = configPaths.item_empty_image;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;
  const max_title_size = props.sizes.max_title_size;
  const title_card_size: SizeT = props.sizes.title_card_size;

  let title = props.title;
  if (title.length > max_title_size) {
    title = props.title.substring(0, max_title_size) + "...";
  }

  const color_image =
    props.image_url === "" && props.color_image !== undefined
      ? props.color_image
      : "transparent";

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
        src={
          props.image_url === "" || props.image_url === undefined
            ? path_empty_image
            : props.image_url
        }
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

  // const ratio_list = props.sizes.image_ratio.split("%");
  // const ratio = (100 - Number(ratio_list[0])).toString();

  let c_width: string;
  let c_rounding: any;
  let c_marginBottom: any;

  if (props.full === false) {
    c_width = "80%";
    c_rounding = 3;
    c_marginBottom = 4;
  } else {
    c_width = "100%";
    c_rounding = 0;
    c_marginBottom = 4;
  }

  const content: reactComponentT = (
    <Box
      display="flex"
      direction="row"
      // height={ratio + "%"}
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
      <Box paddingX={2} paddingY={1} width="60%">
        <Text size={title_card_size} align="start" weight="bold">
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
  );

  return (
    <Box
      height={props.sizes.height}
      borderStyle="shadow"
      // borderStyle="lg"
      rounding={rounding}
      display="flex"
      direction="column"
    >
      <Box height="100%" width="100%">
        <Mask rounding={rounding} height="100%" width="100%">
          {hasLink ? image_with_link(content) : image_only(content)}
        </Mask>
      </Box>
    </Box>
  );
};

export default observer(CardGeneric);
