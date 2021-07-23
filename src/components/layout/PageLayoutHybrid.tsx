import React from "react";
import { observer } from "mobx-react-lite";
import { Box } from "gestalt";
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
  const heightHeader =
    props.stores.baseStore.GUI_CONFIG.display.layout.heightHeader;
  // const heightHeader = 60;
  const heightBody =
    props.stores.baseStore.GUI_CONFIG.display.layout.heightBody;

  return (
    <>
      <Box
        padding={0}
        // display="flex"
        // display="inlineBlock"
        // alignItems="center"
        // justifyContent="between"
        // direction="column"
        height="100vh"
        width="100%"
        // flex="grow"
        color={color_background}
        // overflow="auto"
      >
        <Box
          padding={1}
          color={color_top}
          height={heightHeader}
          width="100%"
          // height="6vh"
          display="flex"
          direction="row"
          // flex="grow"
          // alignItems="center"
          // justifyContent="between"
        >
          {props.top}
        </Box>
        <Box
          padding={0}
          height={heightBody}
          width="100%"
          overflow="auto"
          // height="6vh"
          // display="flex"
          // direction="column"
          // flex="grow"

          // alignItems="center"
          // justifyContent="between"
        >
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
        <Box padding={0} position="fixed" bottom width="100%">
          {props.bottom}
        </Box>
      </Box>
    </>
  );
};

export default observer(PageLayoutHybrid);
