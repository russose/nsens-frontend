import { Box, Heading, Image } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  ColorT,
  configGeneral,
  IFeature,
  reactComponentT,
  RoundingT,
  SizeT,
} from "../../config/globals";
import { IStores } from "../../stores/RootStore";
import CardFeatureGrid from "../CardFeatureGrid";

interface IAboutLayoutHybridProps {
  stores: IStores;
  slogan: string;
  // description: string;
  // path_background_image: string;
  path_logo: string;
  main_image: any;
  // path_image: string;
  // loginSignup?: reactComponentT;
  features: IFeature[];
  ratio_page: string | number;
  // ratio_main: string;
  ratio_logo: string;
  // ratio_image: string;
  contacts: reactComponentT;
  installation_instructions: reactComponentT;
}

const LayoutPageAbout: React.FunctionComponent<IAboutLayoutHybridProps> = (
  props
) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const header_size: SizeT = GUI_CONFIG.display.About.header_size;
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
        justifyContent="around"
        overflow="hidden"
      >
        <Box
          padding={2}
          rounding={rounding}
          height={props.ratio_logo}
          width="100%"
        >
          <Image
            alt={props.slogan}
            color="transparent"
            fit="contain"
            naturalHeight={1}
            naturalWidth={1}
            loading="lazy"
            src={props.path_logo}
          ></Image>
        </Box>

        {props.main_image}

        <Box padding={2} column={12}>
          <Heading
            accessibilityLevel={2}
            size={header_size}
            align="center"
            overflow="normal"
          >
            {props.slogan}
            {/* <Badge position="top" text="beta" /> */}
          </Heading>
        </Box>

        <Box
          display="flex"
          direction="column"
          alignItems="center"
          paddingY={3}
          column={12}
          smColumn={8}
          mdColumn={6}
          lgColumn={4}
        >
          {props.contacts}
        </Box>

        <Box
          padding={0}
          column={12}
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

        {props.installation_instructions}

        {/* <Box
          padding={0}
          rounding={rounding}
          height={props.ratio_image}
          width="100%"
          // color="green"
        >
          <Image
            alt={props.description}
            color="transparent"
            fit="contain"
            naturalHeight={1}
            naturalWidth={1}
            loading="lazy"
            src={props.path_image}
          ></Image>
        </Box> */}

        {/* <Box padding={0} column={12} smColumn={12} mdColumn={11} lgColumn={9}>
          <Heading size={header_size} align="center" overflow="normal">
            {props.description}
          </Heading>
        </Box> */}
      </Box>
    </>
  );
};

export default observer(LayoutPageAbout);
