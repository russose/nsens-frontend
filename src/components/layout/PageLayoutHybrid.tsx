import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Sticky } from "gestalt";
import { IPageLayoutProps } from "./PagesLayout";
import { GUI_CONFIG } from "../../common/config";

const color_background: any = GUI_CONFIG.display.colors.background;

const PageLayoutHybrid: React.FunctionComponent<IPageLayoutProps> = (props) => {
  return (
    <>
      <Box
        color={color_background}
        padding={0}
        display="flex"
        direction="column"
        height="98vh"
        alignItems="center"
        overflow="hidden"
      >
        <Box column={12} smColumn={12} mdColumn={12} lgColumn={10}>
          <Sticky top={0}>
            <Box display="flex" alignItems="center" wrap={true}>
              <Box
                padding={2}
                display="inlineBlock"
                column={7}
                smColumn={8}
                mdColumn={8}
                lgColumn={9}
              >
                <Box
                  padding={0}
                  display="flex"
                  flex="grow"
                  alignItems="center"
                  // justifyContent="start"
                >
                  {props.displayMenu}
                  {props.header}
                </Box>
              </Box>

              <Box
                padding={0}
                column={5}
                smColumn={4}
                mdColumn={4}
                lgColumn={3}
                display="inlineBlock"
                smDisplay="inlineBlock"
                mdDisplay="inlineBlock"
                lgDisplay="inlineBlock"
              >
                {props.navigationMenu}
              </Box>

              {/* <Box
              padding={1}
              display="inlineBlock"
              column={1}
              smColumn={1}
              mdColumn={1}
              lgColumn={1}
            >
              {avatar}
            </Box> */}
            </Box>
          </Sticky>

          <Box
            // color="white"
            padding={0}
            display="flex"
            direction="column"
            height="90vh"
            width="100"
            justifyContent="between"
            overflow="auto"
            //overflow="scrollY"
          >
            {props.children}
          </Box>

          {/* <Sticky bottom={0}>
          <Box
            display="block"
            smDisplay="block"
            mdDisplay="none"
            lgDisplay="none"
          >
            {navigationMenu}
          </Box>
        </Sticky> */}
        </Box>
      </Box>
    </>
  );
};

export default observer(PageLayoutHybrid);
