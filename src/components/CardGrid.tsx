import { observer } from "mobx-react";
import { Box } from "gestalt";
import Card from "./Card";
import { IAtom } from "../types";

interface ICardGridProps {
  atoms: IAtom[];
  listOfIdsSaved: number[];
  saved_handler: any;
  image_handler: any;
}

const CardGrid: React.FunctionComponent<ICardGridProps> = (props) => {
  return (
    <div>
      <Box
        color="white"
        wrap={true}
        display="flex"
        direction="row"
        padding={1}
        justifyContent="around"
      >
        {/* {props.atoms.slice(0, 2).map((item) => ( */}
        {props.atoms.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            image_url={item.image} //{"graph.jpg"}
            image_handler={props.image_handler}
            saved_enabled={props.listOfIdsSaved.includes(item.id)}
            saved_handler={props.saved_handler(item)}
            color="white"
          />
        ))}
      </Box>
    </div>
  );
};

export default observer(CardGrid);
