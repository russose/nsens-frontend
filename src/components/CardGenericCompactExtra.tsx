import { observer } from "mobx-react-lite";
import { Box, TapArea, Text } from "gestalt";
import { AtomID, ColorT, handlerT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { shortenString } from "../libs/utils";

interface ICardSizes {
  height: number | string;
  width: number | string;
  max_title_size: number;
  title_card_size: string;
}

interface ICardGenericCompactExtraProps {
  children?: React.ReactNode;
  id: AtomID;
  stores: IStores;
  title: string;
  image_url: string;
  color: ColorT;
  color_image?: string;
  sizes: ICardSizes;
  image_handler: handlerT;
}

const CardGenericCompactExtra: React.FunctionComponent<
  ICardGenericCompactExtraProps
> = (props) => {
  const rounding = 3;
  const max_title_size = props.sizes.max_title_size;
  let title = props.title;
  if (title.length > max_title_size) {
    title = shortenString(title, max_title_size);
  }
  return (
    <Box height={props.sizes.height} width={props.sizes.width}>
      <Box
        height="100%"
        width="100%"
        borderStyle="lg"
        rounding={rounding}
        display="flex"
        direction="row"
        justifyContent="between"
        color={props.color}
      >
        <Box
          display="flex"
          direction="column"
          justifyContent="center"
          height="100%"
          width="65%"
          paddingX={1}
        >
          <TapArea fullHeight={true} onTap={props.image_handler}>
            <Text size="100" align="start" weight="normal">
              {title}
            </Text>
          </TapArea>
        </Box>

        <Box
          display="flex"
          direction="column"
          justifyContent="start"
          height="100%"
          // width="100%"
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default observer(CardGenericCompactExtra);
