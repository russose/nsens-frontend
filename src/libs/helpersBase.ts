import Router from "next/router";
import {
  TDisplay,
  Tlanguage,
  configPaths,
  eventT,
  EXCLUSION_PATTERNS,
  IAtom,
  IparamsPage,
  TUiStringStorage,
  configGeneral,
  initStateCat,
  AtomID,
  CONFIG_ENV,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import {
  api_getItemsFeaturedFromWebWithoutImage,
  api_searchFromWebWithoutImage,
} from "./apiItems";
import { api_login } from "./apiUser";
import { DateToStringWithZero, hasTouchScreen, shuffleArray } from "./utils";

export function isMobile(stores: IStores): boolean {
  const result: boolean = stores.baseStore.currentDisplay === TDisplay.mobile;
  return result;
}

export async function getParamsPageFromContext(): Promise<IparamsPage> {
  // if (process.browser) {
  if (typeof window !== "undefined") {
    const language_navigator = navigator.language;
    let paramsPage_lang: Tlanguage;
    if (language_navigator.includes("fr")) {
      paramsPage_lang = Tlanguage.fr;
    } else if (language_navigator.includes("it")) {
      paramsPage_lang = Tlanguage.it;
    } else {
      paramsPage_lang = Tlanguage.en;
    }

    return { lang: paramsPage_lang };
  }
  return undefined;
}

export async function initWhenResized(
  stores: IStores,
  window: Window
): Promise<void> {
  const condition =
    !isMobile(stores) &&
    !hasTouchScreen(window) &&
    (window.innerHeight !== stores.baseStore.screen.height ||
      window.innerWidth !== stores.baseStore.screen.width);
  // console.log(window.innerHeight, window.innerWidth);
  if (condition) {
    stores.baseStore.setInitCompleted(initStateCat.core, undefined);
    await goPage(
      stores,
      stores.baseStore.paramsPage,
      configPaths.pages.Home,
      {},
      true
    );
  }
}

export function removeSavedFromItems(stores: IStores, items: IAtom[]): IAtom[] {
  if (!stores.baseStore.isLogged || items === undefined || items.length === 0) {
    return items;
  }

  const items_filtered: IAtom[] = items.filter((item) => {
    if (item === undefined) {
      return false;
    } else {
      return !stores.savedStore.saved.has(item.id);
    }
  });
  return items_filtered;
}

export async function fetchNewMostviewed(stores: IStores): Promise<IAtom[]> {
  const lang = stores.baseStore.paramsPage.lang;
  const exclusion_patterns_items: string[] = EXCLUSION_PATTERNS(lang);

  let items: IAtom[] = [];
  while (items.length === 0) {
    items = await api_getItemsFeaturedFromWebWithoutImage(
      DateToStringWithZero(stores.baseStore.dateLastMostviewed.year),
      DateToStringWithZero(stores.baseStore.dateLastMostviewed.month),
      DateToStringWithZero(stores.baseStore.dateLastMostviewed.day),
      lang,
      exclusion_patterns_items
    );
    stores.baseStore.decreaseDateLastMostviewed();
  }

  return items;
}

export async function initializeMostviewed(stores: IStores): Promise<void> {
  fetchNewMostviewed(stores)
    .then((items: IAtom[]) => {
      stores.baseStore.setMostviewed(items);
      //Force feed update when fetchNewMostviewed completed (otherwise first init fails)
      setFeedForHome(stores);

      // for (const item of items.slice(0, 1)) {
      //   stores.baseStore.setGoodImageInHistoryItem(item.id);
      //   console.log("ok_most3");
      // }
    })
    .catch(() => {
      // console.log("error in initializeMostviewed");
    });
}

export function setFeedFromSearch(
  stores: IStores,
  searchPattern: string
): void {
  if (searchPattern === undefined) {
    return;
  }
  const lang = stores.baseStore.paramsPage.lang;
  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  api_searchFromWebWithoutImage(searchPattern, lang, exclusion_patterns_items)
    .then((atoms) => {
      stores.baseStore.initAmountFeedDisplayed();
      stores.baseStore.clearFeed();
      stores.baseStore.setFeed(atoms);
    })
    .catch(() => {
      // console.log("error in setFeedFromSearch");
    });
}

export function updateHome(stores: IStores): void {
  stores.baseStore.initAmountFeedDisplayed();
  stores.baseStore.clearFeed();

  setFeedForHome(stores);
}

export function setFeedForHome(stores: IStores): void {
  const mixedIds: AtomID[] = Mix2Array_main_minoritaire(
    shuffleArray(stores.baseStore.mostviewedIds),
    shuffleArray(
      Array.from(stores.knowbookStore.itemsInStaticKnowbooksForHome)
    ),
    configGeneral.display.amount_vitalKnowbook_for_each_mostview
  );

  // if (mixedIds.length === stores.baseStore.feedItemsToDisplay.length) {
  //   stores.baseStore.setIncreaseFeedDisplayed(false);
  // }

  const mixedItems: IAtom[] = stores.baseStore.getHistoryItems(mixedIds);

  stores.baseStore.setFeed(mixedItems);
}

export function Mix2Array_main_minoritaire(
  main: AtomID[],
  second: AtomID[],
  increment: number
): AtomID[] {
  if (main.length === 0) {
    return [];
  }

  let mixed: AtomID[] = [];
  let ix_1 = 0;
  let ix_2 = 0;

  while (ix_2 + increment <= second.length) {
    let newMain: AtomID[];
    if (ix_1 < main.length) {
      newMain = [main[ix_1]];
    } else {
      newMain = [];
    }

    const newElements: AtomID[] = shuffleArray(
      second.slice(ix_2, ix_2 + increment).concat(newMain)
    );

    mixed = mixed.concat(newElements);
    ix_1 = ix_1 + 1;
    ix_2 = ix_2 + increment;
  }

  if (main.slice(ix_1).length !== 0) {
    mixed = mixed.concat(main.slice(ix_1));
  }

  return mixed;
}

// export function Mix2Array_main_majoritaire(
//   main: AtomID[],
//   second: AtomID[],
//   increment: number
// ): AtomID[] {
//   if (main.length === 0) {
//     return [];
//   }
//   let mixed: AtomID[] = [];
//   let ix_1 = 0;
//   let ix_2 = 0;

//   while (ix_1 + increment <= main.length) {
//     let newSecond: AtomID[];
//     if (ix_2 < second.length) {
//       newSecond = [second[ix_2]];
//     } else {
//       newSecond = [];
//     }

//     const newElements: AtomID[] = shuffleArray(
//       main.slice(ix_1, ix_1 + increment).concat(newSecond)
//     );

//     mixed = mixed.concat(newElements);
//     ix_1 = ix_1 + increment;
//     ix_2 = ix_2 + 1;
//   }
//   return mixed;
// }

export function isHome(router: any): boolean {
  return router.route === configPaths.rootPath;
}

export async function goPage(
  stores: IStores,
  paramsPage: IparamsPage,
  page: string,
  queryObject: object = {},
  reload: boolean = false
) {
  // if (process.browser) {
  if (typeof window !== "undefined") {
    // stores.uiStore.setSearchPattern("");
    stores.uiStore.setUiStringStorage(TUiStringStorage.searchPattern, "");
    await Router.push({
      pathname: configPaths.rootPath + page,
      // query: paramsPage as any,
      query: { ...paramsPage, ...queryObject },
    });
    if (reload) {
      await Router.reload();
    }
  }
}

export function goUserHandler(stores: IStores) {
  return () => (input: { event: eventT }) => {
    goPage(
      stores,
      {
        lang: stores.baseStore.paramsPage.lang,
        // display: stores.baseStore.paramsPage.display,
      },
      configPaths.pages.User
    );
    input.event.preventDefault();
  };
}

export function goLanding(stores: IStores) {
  if (typeof window !== "undefined") {
    const url_landing_en = CONFIG_ENV.LANDING_URL_EN;
    const url_landing = url_landing_en.replace(
      ".en.",
      "." + stores.baseStore.paramsPage.lang + "."
    );
    window.open(
      url_landing,
      "_blank" // <- This is what makes it open in a new window.
    );
  }
}

// export function goRandomStaticKnowbook(stores: IStores) {
//   const staticKnowbooksName: string[] = [
//     ...Array.from(stores.knowbookStore.staticKnowbooks.keys()),
//   ];
//   const name =
//     staticKnowbooksName[entierAleatoire(0, staticKnowbooksName.length - 1)];

//   goPage(
//     stores,
//     stores.baseStore.paramsPage,
//     configPaths.pages.StaticKnowbook,
//     { nameOrPeriod: name },
//     false
//   );
// }

// export function goRandomStaticKnowbookWhenHome(
//   stores: IStores,
//   isHome: boolean
// ) {
//   if (!isHome || configGeneral.demoModeForScreenshoots) {
//     return;
//   }

//   const staticKnowbooksName: string[] = [
//     ...Array.from(stores.knowbookStore.staticKnowbooks.keys()),
//   ];
//   const name =
//     staticKnowbooksName[entierAleatoire(0, staticKnowbooksName.length - 1)];

//   goPage(
//     stores,
//     stores.baseStore.paramsPage,
//     configPaths.pages.StaticKnowbook,
//     { nameOrPeriod: name },
//     false
//   );
// }

const SLIDER_MOVE_TOLERANCE_RATE = 0.8;
export function updateSliderCircular(
  stores: IStores,
  id: string,
  value: number
): void {
  const slider = stores.uiStore.sliders.get(id);

  if (slider === undefined) {
    return;
  }

  const tolerance = slider.maxOneStep * SLIDER_MOVE_TOLERANCE_RATE;
  const current_PositionOneStep = slider.positionOneStep;
  const current_Position = slider.position;
  const delta = value - current_PositionOneStep;

  let new_Position: number;
  if (Math.abs(delta) < tolerance) {
    new_Position = current_Position + delta;
  } else {
    if (delta < 0) {
      new_Position = current_Position + value;
    } else {
      new_Position = current_Position - slider.maxOneStep + value;
    }
  }

  if (new_Position >= 0 && new_Position <= slider.max) {
    slider.positionOneStep = value;
    slider.position = new_Position;
  } else if (new_Position < 0) {
    slider.positionOneStep = value;
    slider.position = 0;
  } else if (new_Position > slider.max) {
    slider.positionOneStep = value;
    slider.position = slider.max;
  }
  stores.uiStore.setSliders(slider);
  // this.$sliders.set(slider.id, slider);
}

export async function initDemo(stores: IStores): Promise<void> {
  // if (!configGeneral.demoModeForScreenshoots) {
  //   return;
  // }
  console.log(
    "RUNNING IN DEMO MODE, activated with configGeneral.demoModeForScreenshoots"
  );
  try {
    await api_login("demo@demo.org", "demo");
    stores.baseStore.setUser({
      username: "demo@demo.org",
    });
  } catch (error) {
    // console.log(error);
  }
}
