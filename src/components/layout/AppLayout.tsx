import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { IparamsPage, TDisplay, initStateCat } from "../../config/globals";
import {
  getDisplayFromWindow,
  switchDisplayWhenResized,
} from "../../libs/helpersBase";
import { useStores } from "../../stores/RootStoreHook";

interface IProps {
  children?: React.ReactNode;
  paramsPage: IparamsPage;
}

const AppLayoutMobile_D = dynamic(() => import("./AppLayoutMobile"));
const AppLayoutDesktop_D = dynamic(() => import("./AppLayoutDesktop"));

const AppLayout: React.FunctionComponent<IProps> = (props) => {
  const stores = useStores();
  const router = useRouter();

  if (typeof window !== "undefined" && router.isReady) {
    //check that link is consistent with screen, otherwise redirect to the right mode
    if (
      stores.uiStore.getInitCompleted(initStateCat.alreadyRendered) ===
      undefined
    ) {
      stores.uiStore.setInitCompleted(initStateCat.alreadyRendered, true);

      if (!router.asPath.includes(getDisplayFromWindow())) {
        switchDisplayWhenResized(stores, router, true);
      }
    }

    window.onresize = () => {
      switchDisplayWhenResized(stores, router, false);
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
