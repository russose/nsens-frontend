import React from "react";
import { Box } from "gestalt";
import { observer } from "mobx-react-lite";
import { IStores } from "../stores/RootStore";
import { Waypoint } from "react-waypoint";
import { useRouter } from "next/router";
import { configPaths } from "../config/globals";

interface IVisibilitySensorFeedProps {
  stores: IStores;
}

const VisibilitySensorFeed: React.FunctionComponent<
  IVisibilitySensorFeedProps
> = (props) => {
  const router = useRouter();

  if (!router.route.includes(configPaths.pages.Search)) {
    return <></>;
  }

  const OnEnter =
    (stores: IStores) =>
    (props: any): void => {
      // console.log("entered...");
      stores.baseStore.setIncreaseFeedDisplayed(true);
    };

  const OnLeave =
    (stores: IStores) =>
    (props: any): void => {
      // console.log("leaved...");
      stores.baseStore.setIncreaseFeedDisplayed(false);
    };

  return (
    <>
      <Waypoint
        onEnter={OnEnter(props.stores)}
        onLeave={OnLeave(props.stores)}
      />
      <Box color="transparent" height="25vh"></Box>
      {/* <Box color="red" height="25vh"></Box> */}
    </>
  );
};

export default observer(VisibilitySensorFeed);
