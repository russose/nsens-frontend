import React from "react";
import { observer } from "mobx-react-lite";
import { Box } from "gestalt";
import {
  ColorT,
  reactComponentT,
  TUiBooleanStorage,
} from "../../config/globals";
import { IStores } from "../../stores/RootStore";
import { configGeneral } from "../../config/globals";
import VisibilitySensorFeed from "../VisibilitySensorFeed";
import ContentLoading from "../ContentLoading";
import AppLayoutPageHybridSVGBody from "./AppLayoutPageHybridSVGBody";
import HeaderSEO from "../HeaderSEO";
import Article from "../Article";
import dynamic from "next/dynamic";

const DialogsLoggedDynamic = dynamic(() => import("../DialogsLogged"));

interface IPageLayoutProps {
  stores: IStores;
  titleSEO: string;
  top: reactComponentT;
  svgBody: boolean;
  bottom?: reactComponentT;
}

const AppLayoutPageHybrid: React.FunctionComponent<IPageLayoutProps> = (
  props
) => {
  const color_top: ColorT = configGeneral.colors.top;
  const color_background: ColorT = configGeneral.colors.background;
  const heightHeader =
    props.stores.baseStore.GUI_CONFIG.display.layout.heightHeader;
  const heightBody =
    props.stores.baseStore.GUI_CONFIG.display.layout.heightBody;

  return (
    <>
      <HeaderSEO stores={props.stores} title={props.titleSEO} />
      <Box padding={0} height="100vh" width="100%" color={color_background}>
        <Box
          padding={0}
          color={color_top}
          height={heightHeader}
          width="100%"
          display="flex"
          direction="row"
        >
          {props.top}
        </Box>
        <Box padding={0} height={heightBody} width="100%" overflow="auto">
          {/* <Box padding={0} height="50%" width="100%" overflow="auto"> */}
          <Box
            display="flex"
            flex="grow"
            direction="column"
            alignItems="center"
          >
            <Box column={12} smColumn={12} mdColumn={12} lgColumn={12}>
              {/* {props.stores.uiStore.showLoading ? ( */}
              {props.stores.uiStore.getUiBooleanStorage(
                TUiBooleanStorage.showLoading
              ) ? (
                <ContentLoading stores={props.stores} />
              ) : (
                <Box
                  color={color_background}
                  display="flex"
                  direction="column"
                  justifyContent="between"
                  // overflow="auto"
                >
                  {props.svgBody ? (
                    <AppLayoutPageHybridSVGBody
                      stores={props.stores}
                      // header={<SVGHeader stores={props.stores} />}
                    >
                      {props.children}
                    </AppLayoutPageHybridSVGBody>
                  ) : (
                    props.children
                  )}
                </Box>
              )}
            </Box>
          </Box>
          {/* Attention, déplacer le VisibilitySensorFeed et le mettre au mauvais endroit peut le faire bugger! */}
          <VisibilitySensorFeed stores={props.stores} />
        </Box>
        <Box padding={0} position="fixed" bottom width="100%">
          {props.bottom}
        </Box>
      </Box>

      <Article stores={props.stores} />
      {props.stores.baseStore.isLogged ? (
        <DialogsLoggedDynamic stores={props.stores} />
      ) : (
        <></>
      )}
    </>
  );
};

export default observer(AppLayoutPageHybrid);
