import { SyntheticEvent } from "react";
import { observer } from "mobx-react";
import { JsText } from "./js_components";
import { Image, Box, IconButton, Mask } from "gestalt";
import { AtomID } from "../types";
import { USER_DISPLAY } from "../config";
import CardGeneric from "./CardGeneric";
import { ParsedUrlQueryInput } from "querystring";

interface ICardAtomProps {
  id: AtomID;
  title: string;
  image_url: string;
  pathname?: string;
  queryObject?: ParsedUrlQueryInput;
  saved_enabled: boolean;
  saved_desactivated: boolean;
  saved_handler: (args: { event: SyntheticEvent<any> }) => void;
  edit_handler: any;
}

const card_height = USER_DISPLAY.card_height;
const title_card_size = USER_DISPLAY.title_card_size;
const padding_grid: any = USER_DISPLAY.padding_grid;
const size_icon: any = USER_DISPLAY.size_icon;

const CardAtom: React.FunctionComponent<ICardAtomProps> = (props) => {
  return (
    <CardGeneric
      id={props.id}
      title={props.title}
      image_url={props.image_url}
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
          disabled={props.saved_desactivated}
        />
      </Box>
    </CardGeneric>
  );
};

export default observer(CardAtom);
