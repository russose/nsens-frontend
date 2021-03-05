import { Box, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import { RoundingT, SizeT } from "../../common/types";
import { IStores } from "../../stores/_RootStore";

export interface INodeGroupProps {
  stores: IStores;
  title: string;
}

const NodeGroup: React.FunctionComponent<INodeGroupProps> = (props) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  // const title_card_size: SizeT = GUI_CONFIG.display.title_card_size;
  const title_card_size: SizeT =
    GUI_CONFIG.display.atom_compact_vizs_sizes.title_card_size;
  const node_dx = GUI_CONFIG.display.atom_compact_vizs_sizes.width;
  const node_dy = GUI_CONFIG.display.atom_compact_vizs_sizes.height;
  const max_title_size =
    GUI_CONFIG.display.atom_compact_vizs_sizes.max_title_size;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;
  let title = props.title;
  if (title === undefined) {
    return <Box />;
  }
  if (title.length > max_title_size) {
    title = props.title.substring(0, max_title_size) + "...";
  }

  return (
    <Box
      borderStyle="lg"
      color="white"
      rounding={rounding}
      padding={1}
      width={node_dx}
      height={node_dy * 0.4}
    >
      <Box
        height="100%"
        display="flex"
        direction="column"
        justifyContent="center"
      >
        <Text size={title_card_size} align="center" weight="bold">
          {title}
        </Text>
      </Box>
    </Box>
  );
};

export default observer(NodeGroup);
