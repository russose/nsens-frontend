import { observer } from "mobx-react-lite";
import { Box } from "gestalt";
import { IAtom } from "../common/types";
import CardAtom from "./CardAtom";

interface ICardAtomGridProps {
  atoms: IAtom[];
  isItemSaved_handler: any;
  isItemSavedActionable_handler: any;
  saved_handler: any;
  edit_handler: any;
}

const CardAtomGrid: React.FunctionComponent<ICardAtomGridProps> = (props) => {
  if (
    props.atoms === undefined ||
    props.atoms === null ||
    props.atoms.length === 0
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
        justifyContent="around"
      >
        {props.atoms.map((item) => {
          return (
            <CardAtom
              //key={item.id}
              key={`cardAtom-${item.id}`}
              id={item.id}
              title={item.title}
              image_url={item.image_url}
              // pathname={"/Article"}
              pathname={"/ItemView"}
              queryObject={{ title: item.title, id: item.id }}
              saved_enabled={props.isItemSaved_handler(item.id)}
              saved_actionable={props.isItemSavedActionable_handler(item.id)}
              saved_handler={props.saved_handler(item.id)}
              edit_handler={props.edit_handler(item.id)}
            />
          );
        })}
      </Box>
      //<Box paddingY={10}></Box>
    );
  }
};

export default observer(CardAtomGrid);
