import { observer } from "mobx-react-lite";
import React from "react";
import { IStores } from "../../stores/RootStore";
import { TDisplay } from "../../config/globals";
import { Media } from "../../config/media";
import dynamic from "next/dynamic";

interface IAppLayoutProps {
  children?: React.ReactNode;
  stores: IStores;
  titleSEO?: string;
  isBodySVG: boolean;
}

const AppLayoutMobile_D = dynamic(() => import("./AppLayoutMobile"));
const AppLayoutDesktop_D = dynamic(() => import("./AppLayoutDesktop"));

// const Media_ = observer(Media);
const Media_ = Media;

const AppLayout: React.FunctionComponent<IAppLayoutProps> = (props) => {
  const stores = props.stores;

  return (
    <>
      <Media_ at={TDisplay.mobile}>
        <AppLayoutMobile_D
          stores={stores}
          titleSEO={props.titleSEO}
          display={TDisplay.mobile}
          svgBody={props.isBodySVG}
        >
          {props.children}
        </AppLayoutMobile_D>
      </Media_>
      <Media_ at={TDisplay.desktop}>
        <AppLayoutDesktop_D
          stores={stores}
          titleSEO={props.titleSEO}
          display={TDisplay.desktop}
          svgBody={props.isBodySVG}
        >
          {props.children}
        </AppLayoutDesktop_D>
      </Media_>
      <Media_ at={TDisplay.large}>
        <AppLayoutDesktop_D
          stores={stores}
          titleSEO={props.titleSEO}
          display={TDisplay.large}
          svgBody={props.isBodySVG}
        >
          {props.children}
        </AppLayoutDesktop_D>
      </Media_>
      <Media_ greaterThanOrEqual={TDisplay.extra}>
        <AppLayoutDesktop_D
          stores={stores}
          titleSEO={props.titleSEO}
          display={TDisplay.extra}
          svgBody={props.isBodySVG}
        >
          {props.children}
        </AppLayoutDesktop_D>
      </Media_>
    </>
  );
};

export default observer(AppLayout);
