import React from "react";
import { Box, Heading } from "gestalt";
import { handlerT, RoundingT, SizeT } from "../common/types";
import { IStores } from "../stores/_RootStore";

interface IHeaderTitleProps {
  stores: IStores;
  title: string;
}

const HeaderTitle: React.FunctionComponent<IHeaderTitleProps> = (props) => {
  const GUI_CONFIG = props.stores.userStore.GUI_CONFIG;
  const header_size: SizeT = GUI_CONFIG.display.header_size;
  const color_headers = GUI_CONFIG.general.colors.headers as handlerT;
  const rounding_menu: RoundingT = GUI_CONFIG.display.rounding_menu;
  return (
    <>
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
    </>
  );
};

export default HeaderTitle;
