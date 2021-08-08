import { Box } from "gestalt";
import { observer } from "mobx-react";
import React from "react";
import { IFeature, PaddingT, SizeT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import CardFeature from "./CardFeature";

interface ICardFeatureGridProps {
  stores: IStores;
  id: string;
  features: IFeature[];
}

const CardFeatureGrid: React.FunctionComponent<ICardFeatureGridProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const features_props = GUI_CONFIG.display.About.features;

  if (props.features === undefined || props.features.length === 0) {
    return <></>;
  } else {
    return (
      <Box
        wrap={true}
        display="flex"
        direction="row"
        // alignItems="center"
        justifyContent="around"
      >
        {props.features.map((feature) => {
          return (
            <Box
              padding={features_props.padding as PaddingT}
              lgColumn={features_props.lgColumn as SizeT}
              mdColumn={features_props.mdColumn as SizeT}
              smColumn={features_props.smColumn as SizeT}
              column={features_props.column as SizeT}
              key={`Box-cardFeatureGrid-${props.id}-${feature.title}`}
            >
              <CardFeature
                key={`cardFeature-${props.id}-${feature.title}`}
                stores={props.stores}
                title={feature.title}
                description={feature.description}
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
