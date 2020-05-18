import { observer } from "mobx-react";
import { JsText } from "./js_components";
import { Box } from "gestalt";
import { AtomID } from "../types";
import CardGeneric from "./CardGeneric";
import { ParsedUrlQueryInput } from "querystring";

interface ICardKnowProps {
  id: AtomID;
  title: string;
  image_url: string;
  pathname: string;
  queryObject: ParsedUrlQueryInput;
  amount: number | string;
}

const CardKnow: React.FunctionComponent<ICardKnowProps> = (props) => {
  return (
    <CardGeneric
      id={props.id}
      title={props.title}
      image_url={props.image_url}
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
