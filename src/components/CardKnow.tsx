import { observer } from "mobx-react";
import { JsText } from "./js_components";
import { Box } from "gestalt";
import { AtomID } from "../common/types";
import CardGeneric from "./CardGeneric";
import { ParsedUrlQueryInput } from "querystring";
import { USER_DISPLAY } from "../common/config";

interface ICardKnowProps {
  id: AtomID;
  title: string;
  image_url: string;
  pathname: string;
  queryObject: ParsedUrlQueryInput;
  amount: number | string;
}

const card_sizes = USER_DISPLAY.knowbook_sizes;
const color_image = USER_DISPLAY.colors.knowbook_color_image;

const CardKnow: React.FunctionComponent<ICardKnowProps> = (props) => {
  return (
    <CardGeneric
      id={props.id}
      title={props.title}
      color_image={color_image}
      image_url={props.image_url}
      sizes={card_sizes}
      pathname={props.pathname}
      queryObject={props.queryObject}
    >
      <Box paddingX={2}>
        <JsText align="center" size="sm" weight="bold">
          {props.amount}
        </JsText>
      </Box>
    </CardGeneric>
  );
};

export default observer(CardKnow);
