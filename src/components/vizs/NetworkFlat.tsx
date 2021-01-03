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
import { IStores } from "../../stores/_RootStore";
import CardAtomGrid from "../CardAtomGrid";
import { Text } from "gestalt";
import { capitalizeFirstLetter } from "../../libs/utils";

export type INetworkFlatProps = {
  rootItemId: AtomID;
  stores: IStores;
};

const NetworkFlat: React.FunctionComponent<INetworkFlatProps> = (props) => {
  const graphMap = props.stores.graphStore.graphMap;
  return (
    <Box>
      {Array.from(graphMap).map((key_value) => {
        return (
          <Box key={`NetworkFlat-box0-${key_value[0]}`}>
            <Box key={`NetworkFlat-box1-${key_value[0]}`} padding={3}>
              <Text key={`NetworkFlat-text-${key_value[0]}`} weight="bold">
                {capitalizeFirstLetter(key_value[0]) + " :"}
              </Text>
            </Box>
            <CardAtomGrid
              id={`NetworkFlat-${key_value[0]}`}
              atoms={key_value[1]}
              isItemSaved_handler={isItemSaved(props.stores.savedStore)}
              isItemSavedActionable_handler={isItemSavedActivated(
                props.stores.knowbookStore
              )}
              saved_handler={onSaved(props.stores)}
              edit_handler={onEditKnowbooks(
                props.stores.uiStore,
                props.stores.knowbookStore
              )}
              compact={true}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default observer(NetworkFlat);
