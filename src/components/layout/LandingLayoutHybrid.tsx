import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Image, Heading, Badge } from "gestalt";
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
  // path_background_image: string;
  path_logo: string;
  path_image: string;
  loginSignup: reactComponentT;
  features: IFeature[];
  ratio_page: string;
  // ratio_main: string;
  ratio_logo: string;
  ratio_image: string;
}

const LandingLayoutHybrid: React.FunctionComponent<ILandingLayoutHybridProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const header_size: SizeT = GUI_CONFIG.display.landing.header_size;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;
  const color_background: ColorT = GUI_CONFIG.general.colors.background;

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
        justifyContent="evenly"
        overflow="hidden"
      >
        <Box
          padding={0}
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

        <Box padding={0} column={10} smColumn={10} mdColumn={6} lgColumn={3}>
          {props.loginSignup}
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
          {/* <Heading
            // color="white"
            size={header_size}
            align="center"
            overflow="normal"
          >
            {props.features_title}
          </Heading> */}
          <Box
            padding={0}
            display="flex"
            direction="column"
            column={12}
            smColumn={12}
            mdColumn={12}
            lgColumn={10}
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
