import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { IFeature, PaddingT, SizeT } from "../common/types";
import { IStores } from "../stores/_RootStore";
import CardFeature from "./CardFeature";

interface ICardFeatureGridProps {
  stores: IStores;
  id: string;
  features: IFeature[];
}

const CardFeatureGrid: React.FunctionComponent<ICardFeatureGridProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const card_sizes = GUI_CONFIG.display.landing.sizes;
  const color = GUI_CONFIG.general.colors.item_color;
  // const card_sizes = props.config.display.landing.sizes;
  // const color = props.config.general.colors.item_color;

  if (props.features === undefined || props.features.length === 0) {
    return <></>;
  } else {
    return (
      <Box
        // color="white"
        wrap={true}
        display="flex"
        direction="row"
        justifyContent="around"
      >
        {props.features.map((feature) => {
          return (
            <Box
              lgColumn={card_sizes.lgColumn as SizeT}
              mdColumn={card_sizes.mdColumn as SizeT}
              smColumn={card_sizes.smColumn as SizeT}
              column={card_sizes.column as SizeT}
              lgPadding={card_sizes.lgPadding as PaddingT}
              mdPadding={card_sizes.mdPadding as PaddingT}
              smPadding={card_sizes.smPadding as PaddingT}
              padding={card_sizes.padding as PaddingT}
              key={`Box-cardFeatureGrid-${props.id}-${feature.title}`}
            >
              <CardFeature
                key={`cardFeature-${props.id}-${feature.title}`}
                stores={props.stores}
                title={feature.title}
                image_url={feature.image_url}
                color={color}
                icon={feature.icon}
              />
            </Box>
          );
        })}
      </Box>
    );
  }
};

export default observer(CardFeatureGrid);
