import { SyntheticEvent } from "react";
import { observer } from "mobx-react";
import { Box, IconButton } from "gestalt";
import { AtomID } from "../srcCommon/types";
import CardGeneric from "./CardGeneric";
import { ParsedUrlQueryInput } from "querystring";
import { USER_DISPLAY } from "../srcCommon/config";

interface ICardAtomProps {
  id: AtomID;
  title: string;
  image_url: string;
  pathname?: string;
  queryObject?: ParsedUrlQueryInput;
  saved_actionable: boolean;
  saved_enabled: boolean;
  saved_handler: (args: { event: SyntheticEvent<any> }) => void;
  edit_handler: any;
}

const card_sizes = USER_DISPLAY.atom_sizes;
const size_icon: any = USER_DISPLAY.size_icon;

const CardAtom: React.FunctionComponent<ICardAtomProps> = (props) => {
  return (
    <CardGeneric
      id={props.id}
      title={props.title}
      image_url={props.image_url}
      sizes={card_sizes}
      pathname={props.pathname}
      queryObject={props.queryObject}
    >
      <Box paddingX={0}>
        {props.saved_enabled && (
          <IconButton
            accessibilityLabel="edit"
            icon="edit"
            iconColor="darkGray"
            size={size_icon}
            onClick={props.edit_handler}
          />
        )}
      </Box>
      <Box paddingX={0}>
        <IconButton
          accessibilityLabel="save"
          icon="angled-pin"
          iconColor={props.saved_enabled ? "red" : "darkGray"}
          size={size_icon}
          onClick={props.saved_handler}
          disabled={!props.saved_actionable}
        />
      </Box>
    </CardGeneric>
  );
};

export default observer(CardAtom);
