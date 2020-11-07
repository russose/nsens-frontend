import { JsText } from "../js_components";
import { Box } from "gestalt";
import { USER_DISPLAY } from "../../common/config";

export interface INodeGroupProps {
  title: string;
}

const title_card_size = USER_DISPLAY.title_card_size;
const max_title_size = USER_DISPLAY.network.max_title_size;
const node_size = USER_DISPLAY.network.node_size;

const NodeGroup: React.FunctionComponent<INodeGroupProps> = (props) => {
  let title = props.title;
  if (title.length > max_title_size) {
    title = props.title.substring(0, max_title_size) + "...";
  }

  return (
    <Box
      borderSize="lg"
      color="white"
      rounding={3}
      padding={1}
      width={node_size}
      height={node_size * 0.5}
    >
      <JsText size={title_card_size} align="center" weight="normal">
        {title}
      </JsText>
    </Box>
  );
};

export default NodeGroup;
