import React from "react";
import { Box, Heading } from "gestalt";
import { handlerT, RoundingT, SizeT } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { configGeneral } from "../config/globals";

interface IHeaderTitleProps {
  stores: IStores;
  title: string;
  hidden?: boolean;
}

const HeaderTitle: React.FunctionComponent<IHeaderTitleProps> = (props) => {
  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const header_size: SizeT = GUI_CONFIG.display.header_title_size;
  const color_headers = configGeneral.colors.headers as handlerT;
  const rounding_menu: RoundingT = GUI_CONFIG.display.rounding_menu;

  const display = props.hidden ? "none" : "block";

  return (
    <>
      <Box display={display}>
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
            <Heading
              accessibilityLevel={1}
              size={header_size}
              align="center"
              overflow="normal"
            >
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
