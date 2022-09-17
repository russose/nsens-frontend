import { observer } from "mobx-react-lite";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import {
  configPaths,
  SVG_T,
  TPageHeaderModes,
  TPages,
} from "../../config/globals";
import { IStores } from "../../stores/RootStore";
import SVGDropdown from "./SVGDropdown";
import SVGElementsInLine from "./SVGElementsInLine";

interface IProps {
  stores: IStores;
  deltaX: number;
}

enum THeaderElementIDs {
  FeaturedKnowbooks = "FeaturedKnowbooks",
  UserKnowbooks = "UserKnowbooks",
  Dropdown = "Dropdown",

  None = "None",
}

const SVGHeader: React.FunctionComponent<IProps> = (props) => {
  const router = useRouter();

  function isPage(page: TPages, router: NextRouter): boolean {
    if (configPaths.pages[page] === "/") {
      return router.pathname === configPaths.rootPath;
    } else {
      return router.pathname === configPaths.rootPath + configPaths.pages[page];
    }
  }

  function isPageMode(page: TPages, mode?: TPageHeaderModes): boolean {
    if (mode === undefined) {
      return isPage(page, router);
    } else {
      return (
        isPage(page, router) &&
        props.stores.uiStore.isPageHeaderMode(page, mode)
      );
    }
  }

  function headerElementFromID(id: THeaderElementIDs): SVG_T {
    // if (id === THeaderElementIDs.FeaturedKnowbooks) {
    //   return (
    //     <SVGKnowbooksFeatured
    //       stores={props.stores}
    //       R0_large={0}
    //       amountElementsLevel={0}
    //       closed={true}
    //     />
    //   );
    // } else if (id === THeaderElementIDs.UserKnowbooks) {
    //   return (
    //     <SVGKnowbooksUser
    //       stores={props.stores}
    //       R0_large={0}
    //       amountElementsLevel={0}
    //       closed={true}
    //     />
    //   );
    // } else
    if (id === THeaderElementIDs.Dropdown) {
      return <SVGDropdown stores={props.stores} />;
    } else if (id === THeaderElementIDs.None) {
      return <></>;
    }
  }

  let header: SVG_T[] = [<></>];

  // if (isPageMode(TPages.Home, TPageHeaderModes.homeFeaturedKnowbooks)) {
  //   header[0] = headerElementFromID(THeaderElementIDs.UserKnowbooks);
  // } else if (isPageMode(TPages.Home, TPageHeaderModes.homeUserKnowbooks)) {
  //   header[0] = headerElementFromID(THeaderElementIDs.FeaturedKnowbooks);
  // } else
  if (isPageMode(TPages.ItemCircle)) {
    header = [
      // headerElementFromID(THeaderElementIDs.FeaturedKnowbooks),
      // headerElementFromID(THeaderElementIDs.UserKnowbooks),
      headerElementFromID(THeaderElementIDs.Dropdown),
    ];
  } else {
    header = [
      // headerElementFromID(THeaderElementIDs.FeaturedKnowbooks),
      // headerElementFromID(THeaderElementIDs.UserKnowbooks),
    ];
  }

  const header_in_line = (
    <SVGElementsInLine
      elements={header}
      deltaX={props.deltaX}
      showOrbit={false}
    />
  );

  return <>{header_in_line}</>;
};

export default observer(SVGHeader);
