import { observer } from "mobx-react-lite";
import { Box, Text } from "gestalt";
import { AtomID, ColorT } from "../config/globals";
import Link from "next/link";
import { IStores } from "../stores/RootStore";
import { configPaths } from "../config/globals";

interface ICardSizes {
  height: number | string;
  width: number | string;
  // image_ratio: string;
  max_title_size: number;
  title_card_size: string;
}

interface ICardGenericCompactExtraProps {
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

const CardGenericCompactExtra: React.FunctionComponent<ICardGenericCompactExtraProps> =
  (props) => {
    const rounding = 3;
    // const rounding: RoundingT = GUI_CONFIG.display.rounding_item;
    const max_title_size = props.sizes.max_title_size;
    // const title_card_size: SizeT = props.sizes.title_card_size;

    let title = props.title;
    if (title.length > max_title_size) {
      title = props.title.substring(0, max_title_size) + "...";
    }
    return (
      <Box height={props.sizes.height} width={props.sizes.width}>
        <Box
          height="100%"
          borderStyle="lg"
          rounding={rounding}
          display="flex"
          direction="column"
          justifyContent="between"
          color={props.color}
        >
          <Box
            display="flex"
            direction="column"
            justifyContent="center"
            height="70%"
            padding={1}
          >
            <Link
              prefetch={false}
              href={{
                // pathname: props.pathname, query: props.queryObject
                pathname: configPaths.rootPath + props.pathname,
                query: {
                  ...props.stores.baseStore.paramsPage,
                  ...props.queryObject,
                },
              }}
              passHref
            >
              <a>
                <Text size="sm" align="start" weight="bold">
                  {title}
                </Text>
              </a>
            </Link>
          </Box>

          <Box display="flex" direction="row" justifyContent="end" width="100%">
            {props.children}
          </Box>
        </Box>
      </Box>
    );
  };

export default observer(CardGenericCompactExtra);
