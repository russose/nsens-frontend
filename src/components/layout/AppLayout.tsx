import { observer } from "mobx-react-lite";
import React from "react";
import { IStores } from "../../stores/RootStore";
import { TDisplay } from "../../config/globals";
import { Media } from "../../config/media";
import AppLayoutMobile from "./AppLayoutMobile";
import AppLayoutDesktop from "./AppLayoutDesktop";

interface IAppLayoutProps {
  stores: IStores;
}

// const Media_ = observer(Media);
const Media_ = Media;

const AppLayout: React.FunctionComponent<IAppLayoutProps> = (props) => {
  const stores = props.stores;

  return (
    <>
      <Media_ at={TDisplay.mobile}>
        <AppLayoutMobile stores={stores} display={TDisplay.mobile}>
          {props.children}
        </AppLayoutMobile>
      </Media_>
      <Media_ at={TDisplay.desktop}>
        <AppLayoutDesktop stores={stores} display={TDisplay.desktop}>
          {props.children}
        </AppLayoutDesktop>
      </Media_>
      <Media_ at={TDisplay.large}>
        <AppLayoutDesktop stores={stores} display={TDisplay.large}>
          {props.children}
        </AppLayoutDesktop>
      </Media_>
      <Media_ greaterThanOrEqual={TDisplay.extra}>
        <AppLayoutDesktop stores={stores} display={TDisplay.extra}>
          {props.children}
        </AppLayoutDesktop>
      </Media_>
    </>
  );
};

export default observer(AppLayout);
