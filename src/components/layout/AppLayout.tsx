import { observer } from "mobx-react-lite";
import React from "react";
import { IStores } from "../../stores/RootStore";
import { TDisplay } from "../../config/globals";
import { Media } from "../../config/media";
import AppLayoutMobile from "./AppLayoutMobile";
import AppLayoutDesktop from "./AppLayoutDesktop";

interface IAppLayoutProps {
  children?: React.ReactNode;
  stores: IStores;
  titleSEO?: string;
  isBodySVG: boolean;
}

// const Media_ = observer(Media);
const Media_ = Media;

const AppLayout: React.FunctionComponent<IAppLayoutProps> = (props) => {
  const stores = props.stores;

  return (
    <>
      <Media_ at={TDisplay.mobile}>
        <AppLayoutMobile
          stores={stores}
          titleSEO={props.titleSEO}
          display={TDisplay.mobile}
          svgBody={props.isBodySVG}
        >
          {props.children}
        </AppLayoutMobile>
      </Media_>
      <Media_ at={TDisplay.desktop}>
        <AppLayoutDesktop
          stores={stores}
          titleSEO={props.titleSEO}
          display={TDisplay.desktop}
          svgBody={props.isBodySVG}
        >
          {props.children}
        </AppLayoutDesktop>
      </Media_>
      <Media_ at={TDisplay.large}>
        <AppLayoutDesktop
          stores={stores}
          titleSEO={props.titleSEO}
          display={TDisplay.large}
          svgBody={props.isBodySVG}
        >
          {props.children}
        </AppLayoutDesktop>
      </Media_>
      <Media_ greaterThanOrEqual={TDisplay.extra}>
        <AppLayoutDesktop
          stores={stores}
          titleSEO={props.titleSEO}
          display={TDisplay.extra}
          svgBody={props.isBodySVG}
        >
          {props.children}
        </AppLayoutDesktop>
      </Media_>
    </>
  );
};

export default observer(AppLayout);
