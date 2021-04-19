import { Box, Icon, Text } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { configGeneral } from "../config/globals";
import { ColorT, IconT, SizeT } from "../config/globals";
import { IStores } from "../stores/_RootStore";

interface ICardFeatureProps {
  stores: IStores;
  title: string;
  description: string;
  icon: IconT;
}

const CardFeature: React.FunctionComponent<ICardFeatureProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const feature_desciption_size: SizeT =
    GUI_CONFIG.display.landing.features.desciption_size;
  const feature_title_size: SizeT =
    GUI_CONFIG.display.landing.features.title_size;
  const features_color: ColorT = configGeneral.colors.features;

  return (
    <>
      <Box rounding={2} borderStyle="shadow" padding={2}>
        <Box
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="start"
          padding={0}
        >
          <Box padding={2}>
            <Icon
              icon={props.icon}
              accessibilityLabel={props.icon}
              color={features_color}
            />
          </Box>
          <Text size={feature_title_size} weight="bold">
            {props.title}
          </Text>
        </Box>
        <Box padding={5}>
          <Text size={feature_desciption_size}>{props.description}</Text>
        </Box>
      </Box>
    </>
  );
};

export default observer(CardFeature);
