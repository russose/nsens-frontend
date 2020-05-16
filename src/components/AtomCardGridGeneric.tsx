import { observer } from "mobx-react";
import { Box } from "gestalt";
import AtomCardGeneric from "./AtomCardGeneric";
import { IAtom, AtomID } from "../types";
import { UIStore } from "../states/UIStore";
import { DataStore } from "../states/DataStore";

interface IAtomCardGridGenericProps {
  atoms: IAtom[];
  isItemSaved_handler: any;
  isItemSavedActivated_handler: any;
  saved_handler: any;
  edit_handler: any;
}

const AtomCardGridGeneric: React.FunctionComponent<IAtomCardGridGenericProps> = (
  props
) => {
  if (props.atoms === undefined) {
    return <Box></Box>;
  } else {
    return (
      <Box>
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
              <AtomCardGeneric
                key={item.id}
                id={item.id}
                title={item.title}
                image_url={item.image_url}
                saved_enabled={props.isItemSaved_handler(item.id)}
                saved_desactivated={props.isItemSavedActivated_handler(item.id)}
                saved_handler={props.saved_handler(item.id)}
                edit_handler={props.edit_handler(item.id)}
              />
            );
          })}
        </Box>
        <Box paddingY={10}></Box>
      </Box>
    );
  }
};

export default observer(AtomCardGridGeneric);
