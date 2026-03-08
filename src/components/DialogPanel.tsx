import { OverlayPanel, SheetMobile } from "gestalt";
import { observer } from "mobx-react-lite";
import React from "react";
import { isMobile } from "../libs/helpersBase";
import { IStores } from "../stores/RootStore";

// const MenuBarArticle_Logged_D = dynamic(() => import("./MenuBarItem_Logged"));

interface IProps {
  children: React.ReactNode;
  stores: IStores;
  heading: any;
  subHeading?: any;
  onDismiss: any;
  size?: string;
}

const DialogPanel: React.FunctionComponent<IProps> = (props) => {
  const isMobile_ = isMobile(props.stores);

  //To avoid the type error impossible to solve :(
  const SheetMobile_ = SheetMobile as any;

  return (
    <>
      {isMobile_ ? (
        <SheetMobile_
          heading={props.heading}
          subHeading={props.subHeading}
          onDismiss={props.onDismiss}
          showDismissButton={true}
          size="auto"
        >
          {props.children}
        </SheetMobile_>
      ) : (
        <OverlayPanel
          accessibilityDismissButtonLabel={"Close " + props.heading}
          accessibilityLabel={props.heading}
          heading={props.heading}
          subHeading={props.subHeading}
          onDismiss={props.onDismiss}
          size={props.size === undefined ? "lg" : (props.size as any)} //"md"
        >
          {props.children}
        </OverlayPanel>
      )}
    </>
  );
};

export default observer(DialogPanel);
