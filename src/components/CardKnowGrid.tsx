import { observer } from "mobx-react";
import { Box } from "gestalt";
import { IKnowbook } from "../common/types";
import { DataStore } from "../stores/DataStore";
import CardKnow from "./CardKnow";
import { USER_DISPLAY } from "../common/config";

interface ICardKnowGridProps {
  knowbooks: IKnowbook[];
  datastore: DataStore;
}

const image_path = USER_DISPLAY.paths.knowbook_image;

const CardKnowGrid: React.FunctionComponent<ICardKnowGridProps> = (props) => {
  if (
    props.knowbooks === undefined ||
    props.knowbooks === null ||
    props.knowbooks.length === 0
  ) {
    return null;
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
            // key={item.name}
            key={`cardKnowbook-${item.name}`}
            id={item.name}
            title={item.name}
            image_url={image_path}
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
