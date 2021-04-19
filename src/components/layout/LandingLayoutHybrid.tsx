import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Image, Heading, Text, Badge } from "gestalt";
import CardFeatureGrid from "../CardFeatureGrid";
import {
  ColorT,
  IFeature,
  reactComponentT,
  RoundingT,
  SizeT,
} from "../../config/globals";
import { IStores } from "../../stores/_RootStore";
import { configGeneral } from "../../config/globals";

interface ILandingLayoutHybridProps {
  stores: IStores;
  slogan: string;
  description: string;
  // path_background_image: string;
  path_logo: string;
  path_image: string;
  loginSignup?: reactComponentT;
  features: IFeature[];
  ratio_page: string;
  // ratio_main: string;
  ratio_logo: string;
  ratio_image: string;
}

const LandingLayoutHybrid: React.FunctionComponent<ILandingLayoutHybridProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const header_size: SizeT = GUI_CONFIG.display.landing.header_size;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;
  const color_background: ColorT = configGeneral.colors.background;

  return (
    <>
      <Box
        color={color_background}
        height={props.ratio_page}
        padding={1}
        column={12}
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent="between"
        overflow="hidden"
      >
        <Box
          padding={2}
          rounding={rounding}
          height={props.ratio_logo}
          width="100%"
        >
          <Image
            alt="image"
            color="transparent"
            fit="contain"
            naturalHeight={1}
            naturalWidth={1}
            loading="lazy"
            src={props.path_logo}
          ></Image>
        </Box>

        <Box
          padding={0}
          rounding={rounding}
          height={props.ratio_image}
          width="100%"
          // color="green"
        >
          <Image
            alt="image"
            color="transparent"
            fit="contain"
            naturalHeight={1}
            naturalWidth={1}
            loading="lazy"
            src={props.path_image}
          ></Image>
        </Box>

        <Box padding={0} column={12}>
          <Heading
            // color="white"
            size={header_size}
            align="center"
            overflow="normal"
          >
            {props.slogan} <Badge position="top" text="beta" />
          </Heading>
        </Box>

        {props.loginSignup !== undefined && (
          <Box padding={0} column={11} smColumn={11} mdColumn={5} lgColumn={3}>
            {props.loginSignup}
          </Box>
        )}

        <Box padding={0} column={12} smColumn={12} mdColumn={11} lgColumn={9}>
          <Heading size={header_size} align="center" overflow="normal">
            {props.description}
          </Heading>
        </Box>

        <Box
          padding={0}
          column={12}
          // smColumn={12}
          // mdColumn={12}
          // lgColumn={10}
          display="flex"
          direction="column"
          alignItems="center"
          rounding={rounding}
        >
          <Box
            padding={0}
            display="flex"
            direction="column"
            column={12}
            smColumn={12}
            mdColumn={12}
            lgColumn={11}
            overflow="auto"
          >
            <CardFeatureGrid
              stores={props.stores}
              id="CardFeatureGrid"
              features={props.features}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default observer(LandingLayoutHybrid);
