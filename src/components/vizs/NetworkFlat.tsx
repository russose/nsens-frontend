import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { AtomID } from "../../config/globals";
import { IStores } from "../../stores/RootStore";
import { Text } from "gestalt";
import { capitalizeFirstLetter } from "../../libs/utils";
import {
  isItemSaved,
  isItemSavedActivated,
  onSaved,
} from "../../handlers/handlers_Saved";
import { onEditKnowbooks } from "../../handlers/handlers_Knowbooks";
import CardAtomGridCompact from "./../CardAtomGridCompact";

export type INetworkFlatProps = {
  rootItemId: AtomID;
  stores: IStores;
};

const NetworkFlat: React.FunctionComponent<INetworkFlatProps> = (props) => {
  const relatedMap = props.stores.graphStore.relatedMap;
  return (
    <Box>
      {Array.from(relatedMap).map((key_value) => {
        return (
          <Box key={`NetworkFlat-box0-${key_value[0]}`}>
            <Box key={`NetworkFlat-box1-${key_value[0]}`} padding={3}>
              <Text key={`NetworkFlat-text-${key_value[0]}`} weight="bold">
                {capitalizeFirstLetter(key_value[0]) + " :"}
              </Text>
            </Box>
            <CardAtomGridCompact
              id={`NetworkFlat-${key_value[0]}`}
              stores={props.stores}
              atoms={key_value[1]}
              isItemSaved_handler={isItemSaved(props.stores)}
              isItemSavedActionable_handler={isItemSavedActivated(props.stores)}
              saved_handler={onSaved(props.stores)}
              edit_handler={onEditKnowbooks(props.stores)}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default observer(NetworkFlat);
