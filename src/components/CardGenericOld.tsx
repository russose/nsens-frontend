import { observer } from "mobx-react-lite";
import { Image, Box, Mask, Text } from "gestalt";
import { AtomID, ColorT, RoundingT, SizeT } from "../common/types";
import { ParsedUrlQueryInput } from "querystring";
import Link from "next/link";
import { IStores } from "../stores/_RootStore";

interface ICardSizes {
  height: number;
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
  queryObject?: ParsedUrlQueryInput;
}

const CardGenericOld: React.FunctionComponent<ICardGenericProps> = (props) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const path_empty_image = GUI_CONFIG.paths.item_empty_image;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;
  // const title_card_size: SizeT = props.config.display.title_card_size;
  // const path_empty_image = props.config.paths.item_empty_image;
  // const rounding: RoundingT = props.config.display.rounding_item;

  const max_title_size = props.sizes.max_title_size;
  // const title_card_size: SizeT = GUI_CONFIG.display.title_card_size;
  const title_card_size: SizeT = props.sizes.title_card_size;

  let title = props.title;
  if (title.length > max_title_size) {
    title = props.title.substring(0, max_title_size) + "...";
  }

  const color_image =
    props.color_image === undefined || props.image_url === ""
      ? "white"
      : props.color_image;

  const image_only = (
    <Image
      key={props.id}
      alt="image"
      color={color_image}
      fit="cover"
      naturalHeight={1}
      naturalWidth={1}
      loading="lazy"
      src={
        props.image_url === "" || props.image_url === undefined
          ? path_empty_image
          : props.image_url
      }
      // src=""
    ></Image>
  );

  const image_with_link = (
    <Link
      href={{
        // pathname: props.pathname, query: props.queryObject
        pathname: props.stores.userStore.rootPath + props.pathname,
        query: { ...props.stores.userStore.paramsPage, ...props.queryObject },
      }}
      passHref
    >
      <a>{image_only}</a>
    </Link>
  );

  const hasLink: boolean =
    props.pathname !== undefined && props.pathname !== "";

  return (
    <Box height={props.sizes.height}>
      <Box
        height="100%"
        borderStyle="shadow"
        // borderStyle="lg"
        rounding={rounding}
        display="flex"
        flex="grow"
        direction="column"
        color={props.color}
      >
        <Box padding={2} height={props.sizes.image_ratio} width="100%">
          <Mask rounding={rounding} height="100%" width="100%">
            {hasLink ? image_with_link : image_only}
          </Mask>
        </Box>

        {/* <Box display="flex" direction="row" height="1%"></Box> */}

        <Box
          display="flex"
          direction="column"
          flex="grow"
          justifyContent="center"
          padding={0}
        >
          <Box
            display="flex"
            direction="row"
            justifyContent="between"
            alignItems="center"
            padding={0}
          >
            <Box padding={2} width="80%">
              <Text size={title_card_size} align="left" weight="bold">
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
        </Box>
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default observer(CardGenericOld);
