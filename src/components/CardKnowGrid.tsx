import { observer } from "mobx-react";
import { Box } from "gestalt";
import { IKnowbook } from "../srcCommon/types";
import { DataStore } from "../stores/DataStore";
import CardKnow from "./CardKnow";
import { USER_DISPLAY } from "../srcCommon/config";

interface ICardKnowGridProps {
  knowbooks: IKnowbook[];
  datastore: DataStore;
}

const CardKnowGrid: React.FunctionComponent<ICardKnowGridProps> = (props) => {
  if (props.knowbooks === undefined) {
    return <Box></Box>;
  } else {
    return (
      <Box
        color="white"
        wrap={true}
        display="flex"
        direction="row"
        padding={1}
        justifyContent="center"
      >
        {props.knowbooks.map((item) => (
          <CardKnow
            key={item.name}
            id={item.name}
            title={item.name}
            image_url={USER_DISPLAY.paths.knowbook_image}
            pathname={"/Knowbook"}
            queryObject={{ k: item.name }}
            amount={item.items.length}
          />
        ))}
      </Box>
    );
  }
};

export default observer(CardKnowGrid);
