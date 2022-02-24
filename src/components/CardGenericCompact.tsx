import { observer } from "mobx-react-lite";
import { Image, Box, Mask, Text } from "gestalt";
import { AtomID, ColorT, RoundingT, SizeT } from "../config/globals";
import Link from "next/link";
import { IStores } from "../stores/RootStore";
import { configPaths } from "../config/globals";

interface ICardSizes {
  height: number | string;
  width: number | string;
  max_title_size: number;
  title_card_size: string;
}

interface ICardGenericCompactProps {
  id: AtomID;
  stores: IStores;
  title: string;
  image_url: string;
  color: ColorT;
  color_image?: string;
  sizes: ICardSizes;
  pathname?: string;
  queryObject?: any;
}

const CardGenericCompact: React.FunctionComponent<ICardGenericCompactProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;
  const max_title_size = props.sizes.max_title_size;

  const title_card_size: SizeT = props.sizes.title_card_size;

  let title = props.title;
  if (title.length > max_title_size) {
    title = props.title.substring(0, max_title_size) + "...";
  }
  return (
    <Box height={props.sizes.height} width={props.sizes.width}>
      <Box
        height="100%"
        // borderStyle="shadow"
        borderStyle="lg"
        rounding={rounding}
        display="flex"
        direction="column"
        color={props.color}
      >
        <Box
          display="flex"
          direction="row"
          justifyContent="between"
          alignItems="start"
          padding={0}
          height="100%"
        >
          <Box padding={1} height="100%" width="100%">
            <Mask rounding={rounding} height="100%" width="100%">
              <Link
                prefetch={false}
                href={{
                  pathname: configPaths.rootPath + props.pathname,
                  query: {
                    ...props.stores.baseStore.paramsPage,
                    ...props.queryObject,
                  },
                }}
                passHref
              >
                <a>
                  <Image
                    alt={props.title}
                    color={
                      props.color_image !== undefined
                        ? props.color_image
                        : "white"
                    }
                    fit="cover"
                    naturalHeight={1}
                    naturalWidth={1}
                    loading="lazy"
                    src={props.image_url !== undefined ? props.image_url : ""}
                  ></Image>
                </a>
              </Link>
            </Mask>
          </Box>

          <Box display="flex" direction="column" padding={0}>
            {props.children}
          </Box>
        </Box>

        <Box padding={2}>
          <Text size={title_card_size} align="start" weight="bold">
            {title}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default observer(CardGenericCompact);
