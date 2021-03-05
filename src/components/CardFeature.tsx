import { Box, Icon, Module, Text, TextField } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { ColorT, IconT, SizeT } from "../common/types";
import { IStores } from "../stores/_RootStore";

interface ICardFeatureProps {
  // id: AtomID;
  stores: IStores;
  title: string;
  description: string;
  icon: IconT;
  // image_url?: string;
  // color?: ColorT;
  // pathname?: string;
  // queryObject?: ParsedUrlQueryInput;
}

const CardFeature: React.FunctionComponent<ICardFeatureProps> = (props) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const feature_desciption_size: SizeT =
    GUI_CONFIG.display.landing.features.desciption_size;
  const feature_title_size: SizeT =
    GUI_CONFIG.display.landing.features.title_size;
  const features_color: ColorT = GUI_CONFIG.general.colors.features;

  return (
    <>
      {/* <Module
        id={props.title}
        title={props.title}
        icon={props.icon}
        // iconAccessibilityLabel="Module Locked - check permission settings"
      >
        <Text size={feature_desciption_size}>{props.description}</Text>
      </Module> */}

      <Box rounding={2} borderStyle="shadow" padding={2}>
        {/* <Box
          padding={0}
          display="flex"
          direction="column"
          // flex="grow"
          justifyContent="between"
        > */}
        <Box
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="start"
          padding={0}
          // color="darkGray"
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
      {/* </Box> */}
    </>
  );
};

export default observer(CardFeature);
