import { observer } from "mobx-react";
import { Box } from "gestalt";
import Card from "./Card";
import { IAtom } from "../types";
import { DataStore } from "../states/DataStore";

interface ICardGridProps {
  store: DataStore;
  atoms: IAtom[];
  image_handler: any;
  saved_handler: any;
  // liked_handler: (args: { event: SyntheticEvent<any> }) => void;
}

const CardGrid: React.FunctionComponent<ICardGridProps> = (props) => {
  return (
    <div>
      <Box
        color="gray"
        wrap={true}
        display="flex"
        direction="row"
        padding={0}
        justifyContent="around"
      >
        {props.atoms.map((item) => (
          <Card
            key={item.pageid_wp}
            id={item.pageid_wp}
            title={item.title}
            image_url={"graph.jpg"} //{item.thumbnail_wp}
            image_handler={props.image_handler}
            saved_enabled={props.store.getSavedIds().includes(item.pageid_wp)}
            saved_handler={props.saved_handler(item.pageid_wp)}
            color="blue"
            // liked_enabled={true}
            // liked_handler={props.liked_handler}
          />
        ))}
      </Box>
    </div>
  );
};

export default observer(CardGrid);
