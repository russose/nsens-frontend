import { observer } from "mobx-react";
import { Box } from "gestalt";
import AtomCardSaved from "./AtomCardSaved";
import { IAtom, AtomID } from "../types";

interface IAtomCardGridSavedProps {
  atoms: IAtom[];
  listOfIdsSaved: AtomID[];
  saved_handler: any;
  saved_disabled?: boolean;
}

const AtomCardGridSaved: React.FunctionComponent<IAtomCardGridSavedProps> = (
  props
) => {
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
            <AtomCardSaved
              key={item.id}
              id={item.id}
              title={item.title}
              image_url={item.image_url} //{"graph.jpg"}
            />
          ))}
        </Box>
      </div>
    );
  }
};

export default observer(AtomCardGridSaved);
