import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { AtomID } from "../../common/types";
import {
  isItemSaved,
  isItemSavedActivated,
  onEditKnowbooks,
  onSaved,
} from "../../handlers";
import { FeedStore } from "../../stores/FeedStore";
import { GraphStore } from "../../stores/GraphStore";
import { KnowkookStore } from "../../stores/KnowkookStore";
import { SavedStore } from "../../stores/SavedStore";
import { UIStore } from "../../stores/UIStore";
import { UserStore } from "../../stores/UserStore";
import CardAtomGrid from "../CardAtomGrid";
import { JsText } from "../js_components";

export type INetworkFlatProps = {
  rootItemId: AtomID;
  graphStore: GraphStore;
  savedStore: SavedStore;
  userStore: UserStore;
  knowbookStore: KnowkookStore;
  feedStore: FeedStore;
  uiStore: UIStore;
};

const NetworkFlat: React.FunctionComponent<INetworkFlatProps> = (props) => {
  const graphMap = props.graphStore.graphMap;
  return (
    <Box>
      {Array.from(graphMap).map((key_value) => {
        return (
          <>
            <Box padding={3}>
              <JsText weight="bold">{key_value[0]}</JsText>
            </Box>
            <CardAtomGrid
              id="NetworkFlat"
              atoms={key_value[1]}
              isItemSaved_handler={isItemSaved(props.savedStore)}
              isItemSavedActionable_handler={isItemSavedActivated(
                props.knowbookStore
              )}
              saved_handler={onSaved(
                props.savedStore,
                props.userStore,
                props.knowbookStore,
                props.feedStore
              )}
              edit_handler={onEditKnowbooks(props.uiStore, props.knowbookStore)}
              compact={false}
            />
          </>
        );
      })}
    </Box>
  );
};

export default observer(NetworkFlat);
