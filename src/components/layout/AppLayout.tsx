import { observer } from "mobx-react-lite";
import React from "react";
import dynamic from "next/dynamic";
import { IparamsPage, TDisplay } from "../../config/globals";
import { useStores } from "../../stores/RootStoreHook";
import { switchDisplayWhenResized } from "../../libs/helpersBase";
import { useRouter } from "next/router";

interface IProps {
  children?: React.ReactNode;
  paramsPage: IparamsPage;
}

const AppLayoutMobile_D = dynamic(() => import("./AppLayoutMobile"));
const AppLayoutDesktop_D = dynamic(() => import("./AppLayoutDesktop"));

const AppLayout: React.FunctionComponent<IProps> = (props) => {
  const stores = useStores();
  const router = useRouter();

  if (typeof window !== "undefined") {
    window.onresize = () => {
      switchDisplayWhenResized(stores, router);
    };
  }

  let content;
  if (props.paramsPage.display === TDisplay.desktop) {
    content = (
      <AppLayoutDesktop_D
        key={props.paramsPage.display + "-" + props.paramsPage.lang}
      >
        {props.children}
      </AppLayoutDesktop_D>
    );
  } else {
    content = (
      <AppLayoutMobile_D
        key={props.paramsPage.display + "-" + props.paramsPage.lang}
      >
        {props.children}
      </AppLayoutMobile_D>
    );
  }

  return <>{content}</>;
};

export default observer(AppLayout);
