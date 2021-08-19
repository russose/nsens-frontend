import React from "react";
import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import { IStores } from "../stores/RootStore";
import { Waypoint } from "react-waypoint";
import { useRouter } from "next/router";
import { isHome } from "../libs/helpersBase";

interface IVisibilitySensorFeedProps {
  stores: IStores;
}

const VisibilitySensorFeed: React.FunctionComponent<IVisibilitySensorFeedProps> =
  (props) => {
    const router = useRouter();

    if (!isHome(router)) {
      return <></>;
    }

    const debug = false;
    let color = "transparent" as any;
    if (debug) {
      color = "red";
    }

    const OnEnter =
      (stores: IStores) =>
      (props: any): void => {
        // console.log("entered...");
        // if (
        //   // baseStore.increaseFeedDisplayed === false ||
        //   // baseStore.amountFeedDisplayed + increment > max_displayed_length
        //   !stores.baseStore.enableIncreaseFeedDisplay
        // ) {
        stores.baseStore.setIncreaseFeedDisplayed(true);
        // }
      };

    const OnLeave =
      (stores: IStores) =>
      (props: any): void => {
        // console.log("leaved...");
        // if (
        //   // baseStore.increaseFeedDisplayed === false ||
        //   // baseStore.amountFeedDisplayed + increment > max_displayed_length
        //   !stores.baseStore.enableIncreaseFeedDisplay
        // ) {
        stores.baseStore.setIncreaseFeedDisplayed(false);
        // }
      };

    return (
      <>
        {/* <Box color="blue" height="1vh"></Box> */}
        <Waypoint
          onEnter={OnEnter(props.stores)}
          onLeave={OnLeave(props.stores)}
          // bottomOffset={"0%"}
        />

        <Box color={color} height="20vh"></Box>
      </>
    );
  };

export default observer(VisibilitySensorFeed);
