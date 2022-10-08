import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { AtomID, configGeneral, RoundingT } from "../../config/globals";
import { IStores } from "../../stores/RootStore";
import { Text } from "gestalt";
import { capitalizeFirstLetter } from "../../libs/utils";
import CardAtomGridDynamic from "../CardAtomGridDynamic";

export type INetworkFlatProps = {
  rootItemId: AtomID;
  stores: IStores;
};

const NetworkFlat: React.FunctionComponent<INetworkFlatProps> = (props) => {
  const relatedMap = props.stores.graphStore.relatedMap;
  const rounding: RoundingT =
    props.stores.baseStore.GUI_CONFIG.display.rounding_item;

  return (
    <Box>
      {Array.from(relatedMap).map((key_value) => {
        return (
          <Box key={`NetworkFlat-box0-${key_value[0]}`}>
            <Box
              key={`NetworkFlat-box1-${key_value[0]}`}
              display="flex"
              flex="grow"
              direction="row"
              paddingX={2}
            >
              <Box
                key={`NetworkFlat-box2-${key_value[0]}`}
                padding={3}
                // color={configGeneral.colors.network_node_color_css as any}
                borderStyle="lg"
                rounding={rounding}
                dangerouslySetInlineStyle={{
                  __style: {
                    backgroundColor:
                      configGeneral.colors.network_node_color_css,
                  },
                }}
              >
                <Text key={`NetworkFlat-text-${key_value[0]}`} weight="bold">
                  {capitalizeFirstLetter(key_value[0]) + " :"}
                </Text>
              </Box>
            </Box>
            <CardAtomGridDynamic
              id={`NetworkFlat-${key_value[0]}`}
              stores={props.stores}
              atoms={props.stores.baseStore.getHistoryItems(key_value[1])}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default observer(NetworkFlat);
