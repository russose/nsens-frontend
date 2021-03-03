import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Image, Heading } from "gestalt";
import CardFeatureGrid from "../CardFeatureGrid";
import {
  IFeature,
  reactComponentT,
  RoundingT,
  SizeT,
} from "../../common/types";
import { IStores } from "../../stores/_RootStore";
import Separator from "../Separator";

interface ILandingLayoutHybridProps {
  stores: IStores;
  slogan: string;
  features_title: string;
  path_background_image: string;
  path_logo_image: string;
  loginSignup: reactComponentT;
  features: IFeature[];
  ratio_page: string;
  ratio_main: string;
  ratio_image: string;
}

const LandingLayoutHybrid: React.FunctionComponent<ILandingLayoutHybridProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const header_size: SizeT = GUI_CONFIG.display.landing.header_size;
  const rounding: RoundingT = GUI_CONFIG.display.rounding_item;
  // const color_background: ColorT = GUI_CONFIG.general.colors.background;
  // const color_features: ColorT = GUI_CONFIG.general.colors.features;

  // const header_size: SizeT = props.config.display.landing.header_size;
  // const rounding: RoundingT = props.config.display.rounding_item;
  // const color_background: ColorT = props.config.general.colors.background;

  return (
    <>
      <Box padding={0} height={props.ratio_page}>
        <Image
          alt="image"
          color="transparent"
          fit="cover"
          naturalHeight={1}
          naturalWidth={1}
          loading="lazy"
          src={props.path_background_image}
        >
          <Box
            // color={color_background}
            // height="98vh"
            padding={2}
            column={12}
            display="flex"
            direction="column"
            alignItems="center"
            overflow="hidden"
          >
            <Box
              height={props.ratio_main}
              width="100%"
              display="flex"
              direction="column"
              justifyContent="evenly"
              alignItems="center"
              overflow="hidden"
            >
              <Box
                padding={5}
                rounding={rounding}
                height={props.ratio_image}
                width="100%"
              >
                <Image
                  alt="image"
                  color="transparent"
                  fit="contain"
                  naturalHeight={1}
                  naturalWidth={1}
                  loading="lazy"
                  src={props.path_logo_image}
                ></Image>
              </Box>

              <Box padding={0} column={12}>
                <Heading
                  color="white"
                  size={header_size}
                  align="center"
                  overflow="normal"
                >
                  {props.slogan}
                </Heading>
              </Box>

              <Box
                padding={0}
                column={10}
                smColumn={10}
                mdColumn={6}
                lgColumn={4}
              >
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
              // color={color_features}
            >
              {/* <Heading
                color="white"
                size={header_size}
                align="center"
                overflow="normal"
              >
                {props.features_title}
              </Heading>
              <Separator with_line={false} /> */}
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
        </Image>
      </Box>
    </>
  );
};

export default observer(LandingLayoutHybrid);
