import { observer } from "mobx-react-lite";
import { Box } from "gestalt";
import { GUI_CONFIG } from "../common/config";

interface IGridKnowProps {
  items: any[];
}

const card_sizes = GUI_CONFIG.display.knowbook_sizes;

const GridKnow: React.FunctionComponent<IGridKnowProps> = (props) => {
  return (
    <Box
      // color="white"
      wrap={true}
      display="flex"
      direction="row"
      padding={1}
      justifyContent="center"
    >
      {props.items.map((item) => {
        return (
          <Box
            lgColumn={card_sizes.lgColumn as any}
            mdColumn={card_sizes.mdColumn as any}
            smColumn={card_sizes.smColumn as any}
            column={card_sizes.column as any}
            lgPadding={card_sizes.lgPadding as any}
            mdPadding={card_sizes.mdPadding as any}
            smPadding={card_sizes.smPadding as any}
            padding={card_sizes.padding as any}
          >
            {item}
          </Box>
        );
      })}
    </Box>
  );
};

export default observer(GridKnow);
