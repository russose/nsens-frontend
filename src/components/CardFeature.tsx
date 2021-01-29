import { Box, IconButton } from "gestalt";
import { observer } from "mobx-react-lite";
import { ParsedUrlQueryInput } from "querystring";
import { ColorT, IconT } from "../common/types";
import { IStores } from "../stores/_RootStore";
import CardGeneric from "./CardGeneric";
import { iconColorDefault } from "./_Button";

interface ICardFeatureProps {
  // id: AtomID;
  stores: IStores;
  title: string;
  image_url: string;
  color: ColorT;
  icon: IconT;
  pathname?: string;
  queryObject?: ParsedUrlQueryInput;
}

const CardFeature: React.FunctionComponent<ICardFeatureProps> = (props) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.landing.sizes;
  const size_icon: IconT = GUI_CONFIG.display.landing.size_icon_card;
  // const card_sizes = props.config.display.landing.sizes;
  // const size_icon: IconT = props.config.display.size_icon_card;
  const color_item = props.color;
  return (
    <CardGeneric
      stores={props.stores}
      id={props.title}
      title={props.title}
      image_url={props.image_url}
      color={color_item}
      sizes={card_sizes}
      pathname={undefined}
    >
      <Box paddingX={0}>
        <IconButton
          accessibilityLabel={props.title}
          icon={props.icon}
          iconColor={iconColorDefault}
          size={size_icon}
          onClick={() => {}}
        />
      </Box>
    </CardGeneric>
  );
};

export default observer(CardFeature);
