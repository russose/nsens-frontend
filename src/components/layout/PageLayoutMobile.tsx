import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Sticky } from "gestalt";
import { IPageLayoutProps } from "./AppLayout";
import { GUI_CONFIG } from "../../common/config";

const PageLayoutMobile: React.FunctionComponent<IPageLayoutProps> = (props) => {
  const color_background: any = GUI_CONFIG.display.colors.background;
  return (
    <>
      <Box
        color={color_background}
        padding={0}
        display="flex"
        direction="column"
        height="92vh"
        alignItems="center"
        overflow="hidden"
      >
        <Box column={12} smColumn={12} mdColumn={12} lgColumn={10}>
          <Sticky top={0}>
            <Box display="flex" alignItems="center" wrap={true}>
              <Box
                padding={0}
                display="inlineBlock"
                column={12}
                // smColumn={8}
                // mdColumn={8}
                // lgColumn={9}
              >
                <Box
                  padding={0}
                  display="flex"
                  flex="grow"
                  alignItems="center"
                  // justifyContent="start"
                >
                  {props.header}
                </Box>
              </Box>
            </Box>
          </Sticky>

          <Box
            padding={0}
            display="flex"
            direction="column"
            height="98vh"
            justifyContent="between"
            overflow="auto"
          >
            {props.children}
          </Box>
          <Sticky bottom={60}>
            <Box
              padding={0}
              column={12}
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Box padding={0} column={6} display="flex" direction="column">
                {props.navigationMenu}
              </Box>
            </Box>
          </Sticky>
          <Sticky bottom={60}>
            <Box display="flex">{props.displayMenu}</Box>
          </Sticky>
        </Box>
      </Box>
    </>
  );
};

export default observer(PageLayoutMobile);
