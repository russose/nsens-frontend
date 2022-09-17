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
import ContentLoading from "../ContentLoading";
import DialogsLogged from "../DialogsLogged";
import dynamic from "next/dynamic";

const AppLayoutPageHybridSVGBody_D = dynamic(
  () => import("./AppLayoutPageHybridSVGBody"),
  {
    ssr: false,
  }
);

const Article_D = dynamic(() => import("./../Article"), {
  ssr: false,
});

interface IPageLayoutProps {
  children?: React.ReactNode;
  stores: IStores;
  // titleSEO: string;
  top: reactComponentT;
  svgBody: boolean;
  bottom?: reactComponentT;
}

const AppLayoutPageHybrid: React.FunctionComponent<IPageLayoutProps> = (
  props
) => {
  const color_top: ColorT = configGeneral.colors.top;
  const opacity_top: ColorT = configGeneral.colors.top_opacity;
  const bottom_bar: ColorT = configGeneral.colors.bottom_bar;
  const color_background: ColorT = configGeneral.colors.background;
  const heightHeader =
    props.stores.baseStore.GUI_CONFIG.display.layout.heightHeader;
  const heightBody =
    props.stores.baseStore.GUI_CONFIG.display.layout.heightBody;
  const heightBottom =
    props.stores.baseStore.GUI_CONFIG.display.layout.heightBottom;

  // console.log("rendered", "appLayoutHybrid");

  return (
    <>
      {/* <HeaderSEO stores={props.stores} title={props.titleSEO} /> */}
      <Box padding={0} height="100vh" width="100%" color={color_background}>
        <Box
          padding={0}
          color={color_top}
          opacity={opacity_top}
          height={heightHeader}
          width="100%"
          display="flex"
          direction="row"
        >
          {props.top}
        </Box>

        <Box padding={0} height={heightBody} width="100%" overflow="auto">
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
                >
                  {props.svgBody ? (
                    <>
                      <AppLayoutPageHybridSVGBody_D stores={props.stores}>
                        {props.children}
                      </AppLayoutPageHybridSVGBody_D>
                    </>
                  ) : (
                    <>{props.children}</>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        {props.svgBody ? (
          <>
            <Box
              color={bottom_bar}
              position="fixed"
              bottom
              height={heightBottom}
              width="100%"
            ></Box>
          </>
        ) : (
          <></>
        )}

        <Box padding={0} position="fixed" bottom width="100%">
          {props.bottom}
        </Box>
      </Box>

      {/* <Article stores={props.stores} /> */}
      {props.stores.uiStore.getUiBooleanStorage(
        TUiBooleanStorage.showArticle
      ) ? (
        <Article_D stores={props.stores} />
      ) : (
        <></>
      )}

      {props.stores.baseStore.isLogged ? (
        <DialogsLogged stores={props.stores} />
      ) : (
        <></>
      )}
    </>
  );
};

export default observer(AppLayoutPageHybrid);
