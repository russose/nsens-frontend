import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Mask, Image, Heading } from "gestalt";
import CardFeatureGrid from "../CardFeatureGrid";
import {
  ColorT,
  IFeature,
  reactComponentT,
  RoundingT,
  SizeT,
} from "../../common/types";
import { IStores } from "../../stores/_RootStore";

interface ILandingLayoutHybridProps {
  stores: IStores;
  slogan: string;
  features_title: string;
  path_main_image: string;
  loginSignup: reactComponentT;
  features: IFeature[];
  ratio_main: string;
  ratio_image: string;
}

const LandingLayoutHybrid: React.FunctionComponent<ILandingLayoutHybridProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const header_size: SizeT = GUI_CONFIG.display.landing.header_size;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;
  const color_background: ColorT = GUI_CONFIG.general.colors.background;
  // const header_size: SizeT = props.config.display.landing.header_size;
  // const rounding: RoundingT = props.config.display.rounding_item;
  // const color_background: ColorT = props.config.general.colors.background;

  return (
    <>
      <Box
        color={color_background}
        // height="98vh"
        padding={2}
        display="flex"
        direction="column"
        alignItems="center"
        overflow="hidden"
      >
        <Box
          height={props.ratio_main}
          display="flex"
          direction="column"
          justifyContent="evenly"
          overflow="hidden"
          // color="green"
        >
          <Box
            padding={0}
            rounding={rounding}
            height={props.ratio_image}
            column={12}
            borderStyle="shadow"
          >
            <Mask rounding={rounding} height="100%" width="100%">
              <Image
                alt="image"
                color="white"
                fit="cover"
                naturalHeight={1}
                naturalWidth={1}
                loading="auto"
                src={props.path_main_image}
              ></Image>
            </Mask>
          </Box>

          <Box padding={0} column={12}>
            <Heading size={header_size} align="center" overflow="normal">
              {props.slogan}
            </Heading>
          </Box>

          <Box padding={2} column={12}>
            {props.loginSignup}
          </Box>
        </Box>
        <Box
          padding={2}
          column={12}
          display="flex"
          direction="column"
          alignItems="center"
          rounding={rounding}
          borderStyle="lg"
          color="lightGray"
        >
          <Heading size="sm" align="center" overflow="normal">
            {props.features_title}
          </Heading>

          <Box
            padding={0}
            display="flex"
            direction="column"
            column={12}
            overflow="auto"
          >
            <CardFeatureGrid
              stores={props.stores}
              id="CardFeatureGridDesktop"
              features={props.features}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default observer(LandingLayoutHybrid);
