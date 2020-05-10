import { observer } from "mobx-react";
import { Box } from "gestalt";
import AtomCard from "./AtomCard";
import { IAtom, AtomID } from "../types";

interface IAtomCardGridProps {
  atoms: IAtom[];
  listOfIdsSaved: AtomID[];
  saved_handler: any;
  ids_saved_disabled: AtomID[];
}

const AtomCardGrid: React.FunctionComponent<IAtomCardGridProps> = (props) => {
  if (props.atoms === undefined) {
    return <div />;
  } else {
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
            <AtomCard
              key={item.id}
              id={item.id}
              title={item.title}
              image_url={item.image_url} //{"graph.jpg"}
              saved_enabled={props.listOfIdsSaved.includes(item.id)}
              saved_disabled={props.ids_saved_disabled.includes(item.id)}
              saved_handler={props.saved_handler(item)}
            />
          ))}
        </Box>
      </div>
    );
  }
};

export default observer(AtomCardGrid);
