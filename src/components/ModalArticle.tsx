import { observer } from "mobx-react";
import { Box, Modal } from "gestalt";
import { AtomID } from "../types";
import { USER_DISPLAY, CONFIG_FETCHING } from "../config";
import { JsText } from "./js_components";
import { fetchArticle } from "../fetch_data";

interface IModalArticleProps {
  id: AtomID;
  title: string;
  handler_close?: any;
}

// const dim = 2 * USER_DISPLAY.card_dim;
const title_card_size = USER_DISPLAY.title_card_size;
const modal_dim = 1.5 * USER_DISPLAY.card_dim;

const text = fetchArticle(
  "proton",
  CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA
).then((value) => {
  return value;
});

const ModalArticle: React.FunctionComponent<IModalArticleProps> = (props) => {
  return (
    <Modal
      accessibilityModalLabel={props.title}
      onDismiss={() => {}}
      //size=
    >
      <Box>
        <JsText>{text}</JsText>
      </Box>
    </Modal>
  );
};

export default observer(ModalArticle);
