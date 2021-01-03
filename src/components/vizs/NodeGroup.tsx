import { Box, Text } from "gestalt";
import { GUI_CONFIG } from "../../common/config";
import { observer } from "mobx-react-lite";

export interface INodeGroupProps {
  title: string;
}

// const node_size = USER_DISPLAY.network.node_size;
const title_card_size: any = GUI_CONFIG.display.title_card_size;
const node_dx = GUI_CONFIG.display.atom_compact_sizes.width;
const node_dy = GUI_CONFIG.display.atom_compact_sizes.height;
const max_title_size = GUI_CONFIG.display.atom_compact_sizes.max_title_size;

const NodeGroup: React.FunctionComponent<INodeGroupProps> = (props) => {
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
      rounding={3}
      padding={1}
      width={node_dx}
      height={node_dy * 0.5}
    >
      <Text size={title_card_size} align="center" weight="bold">
        {title}
      </Text>
    </Box>
  );
};

export default observer(NodeGroup);
