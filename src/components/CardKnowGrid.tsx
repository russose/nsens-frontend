import { observer } from "mobx-react";
import { Box } from "gestalt";
import { IKnowbook } from "../types";
import { DataStore } from "../states/DataStore";
import CardKnow from "./CardKnow";
import { CONFIG_FETCHING } from "../config";

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
            key={item.id}
            id={item.id}
            title={item.name}
            image_url={CONFIG_FETCHING.path_empty_image}
            pathname={"/Knowbooks/Knowbook"}
            queryObject={{ k: item.id }}
            amount={item.content_atoms.length}
          />
        ))}
      </Box>
    );
  }
};

export default observer(CardKnowGrid);
