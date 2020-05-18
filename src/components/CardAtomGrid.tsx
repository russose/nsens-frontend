import { observer } from "mobx-react";
import { Box } from "gestalt";
import { IAtom } from "../types";
import AtomCardGeneric from "./unused/AtomCardGeneric";
import CardAtom from "./CardAtom";

interface ICardAtomGridProps {
  atoms: IAtom[];
  isItemSaved_handler: any;
  isItemSavedActivated_handler: any;
  saved_handler: any;
  edit_handler: any;
}

const CardAtomGrid: React.FunctionComponent<ICardAtomGridProps> = (props) => {
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
              <CardAtom
                key={item.id}
                id={item.id}
                title={item.title}
                image_url={item.image_url}
                pathname={"/index"}
                queryObject={{}}
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

export default observer(CardAtomGrid);
