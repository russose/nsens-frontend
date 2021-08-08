import { observer } from "mobx-react";
import React from "react";
import { IStores } from "../../stores/RootStore";
import { ConfigDisplay } from "../../config/globals";
import { Media } from "../../config/media";
import AppLayoutMobile from "./AppLayoutMobile";
import AppLayoutDesktop from "./AppLayoutDesktop";

interface IAppLayoutProps {
  stores: IStores;
}

const Media_ = observer(Media);

const AppLayout: React.FunctionComponent<IAppLayoutProps> = (props) => {
  const stores = props.stores;

  return (
    <>
      <Media_ at={ConfigDisplay.mobile}>
        <AppLayoutMobile stores={stores} display={ConfigDisplay.mobile}>
          {props.children}
        </AppLayoutMobile>
      </Media_>
      <Media_ at={ConfigDisplay.desktop}>
        <AppLayoutDesktop stores={stores} display={ConfigDisplay.desktop}>
          {props.children}
        </AppLayoutDesktop>
      </Media_>
      <Media_ at={ConfigDisplay.large}>
        <AppLayoutDesktop stores={stores} display={ConfigDisplay.large}>
          {props.children}
        </AppLayoutDesktop>
      </Media_>
      <Media_ greaterThanOrEqual={ConfigDisplay.extra}>
        <AppLayoutDesktop stores={stores} display={ConfigDisplay.extra}>
          {props.children}
        </AppLayoutDesktop>
      </Media_>
    </>
  );
};

export default observer(AppLayout);
