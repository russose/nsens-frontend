import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Sticky } from "gestalt";
import { ColorT, reactComponentT } from "../../config/globals";
import { IStores } from "../../stores/RootStore";
import { configGeneral } from "../../config/globals";

interface IPageLayoutProps {
  stores: IStores;
  top: reactComponentT;
  bottom?: reactComponentT;
}

const PageLayoutHybrid: React.FunctionComponent<IPageLayoutProps> = (props) => {
  const color_top: ColorT = configGeneral.colors.top;
  const color_background: ColorT = configGeneral.colors.background;

  return (
    <>
      <Box
        padding={0}
        display="flex"
        alignItems="center"
        justifyContent="between"
        direction="column"
        height="100vh"
        // width="100%"
        color={color_background}
        overflow="auto"
      >
        <Box
          // column={12}
          // smColumn={12}
          // mdColumn={12}
          // lgColumn={12}
          width="100%"
        >
          <Sticky top={0}>
            <Box
              padding={1}
              color={color_top}
              height={55}
              // height="6vh"
              display="flex"
              flex="grow"
              alignItems="center"
              justifyContent="between"
            >
              {props.top}
            </Box>
          </Sticky>

          <Box
            display="flex"
            flex="grow"
            direction="column"
            alignItems="center"
          >
            <Box column={12} smColumn={12} mdColumn={12} lgColumn={12}>
              <Box
                color={color_background}
                display="flex"
                direction="column"
                justifyContent="between"
                overflow="auto"
              >
                {props.children}
              </Box>
            </Box>
          </Box>
        </Box>
        {props.bottom !== undefined ? (
          <Sticky bottom={70}>
            <Box>{props.bottom}</Box>
          </Sticky>
        ) : (
          <></>
        )}
      </Box>
      {/* {props.left !== undefined ? (
        <Sticky bottom={120}>
          <Box padding={0} width="15%">
            {props.left}
          </Box>
        </Sticky>
      ) : (
        <></>
      )} */}
    </>
  );
};

export default observer(PageLayoutHybrid);
