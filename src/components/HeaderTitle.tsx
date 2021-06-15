import React from "react";
import { Box, Heading } from "gestalt";
import { handlerT, JSONDataT, RoundingT, SizeT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import Head from "next/head";
import { configGeneral } from "../config/globals";

interface IHeaderTitleProps {
  stores: IStores;
  title: string;
  hidden?: boolean;
}

const HeaderTitle: React.FunctionComponent<IHeaderTitleProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const header_size: SizeT = GUI_CONFIG.display.header_size;
  const color_headers = configGeneral.colors.headers as handlerT;
  const rounding_menu: RoundingT = GUI_CONFIG.display.rounding_menu;
  const title_page = "n.Sens" + " - " + props.title;

  // const description = GUI_CONFIG.language.landing.description;

  let description = "";
  Object.values(GUI_CONFIG.language.about.features).forEach(
    (item: JSONDataT) => {
      description = description + " " + item.description;
    }
  );

  const head = (
    <Head>
      <title>{title_page}</title>
      <meta name="description" content={description} />
    </Head>
  );

  const display_ =
    props.hidden === undefined || props.hidden === false ? "block" : "none";
  return (
    <>
      {head}
      <Box display={display_} width="100%">
        <Box padding={2}></Box>
        <Box
          display="flex"
          direction="column"
          flex="grow"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            column={10}
            smColumn={10}
            mdColumn={6}
            lgColumn={4}
            padding={2}
            // paddingX={5}
            // paddingY={2}
            color={color_headers}
            borderStyle="lg"
            alignItems="center"
            rounding={rounding_menu}
          >
            <Heading size={header_size} align="center" overflow="normal">
              {props.title}
            </Heading>
          </Box>
        </Box>
        <Box padding={1}></Box>
      </Box>
    </>
  );
};

export default HeaderTitle;
