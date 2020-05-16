import { observer } from "mobx-react";
import { Box } from "gestalt";
import AtomCardSaved from "./AtomCardSaved";
import { IAtom } from "../../types";

interface IAtomCardGridSavedProps {
  atoms: IAtom[];
  edit_handler: any;
}

const AtomCardGridSaved: React.FunctionComponent<IAtomCardGridSavedProps> = (
  props
) => {
  if (props.atoms === undefined) {
    return <Box />;
  } else {
    return (
      <Box
        color="white"
        wrap={true}
        display="flex"
        direction="row"
        padding={1}
        justifyContent="around"
      >
        {props.atoms.map((item) => {
          return (
            <AtomCardSaved
              key={item.id}
              id={item.id}
              title={item.title}
              image_url={item.image_url}
              edit_handler={props.edit_handler(item.id)}
            />
          );
        })}
      </Box>
    );
  }
};

export default observer(AtomCardGridSaved);
