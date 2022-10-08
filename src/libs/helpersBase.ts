import {
  TDisplay,
  Tlanguage,
  configPaths,
  eventT,
  EXCLUSION_PATTERNS,
  IAtom,
  IparamsPage,
  TUiStringStorage,
  AtomID,
  CONFIG_ENV,
  TUiBooleanStorage,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import {
  api_getItemsFeaturedFromWebWithoutImage,
  api_searchFromWebWithoutImage,
} from "./apiItems";
import { api_login } from "./apiUser";
import { DateToStringWithZero, shuffleArray } from "./utils";
import Router from "next/router";

function getDisplayFromWindow(): TDisplay {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    // console.log(width);
    if (width < 640) {
      return TDisplay.mobile;
    } else {
      return TDisplay.desktop;
    }
  } else {
    return TDisplay.mobile;
  }
}

export async function getParamsPageFromContext(): Promise<IparamsPage> {
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

    const paramsPage_display = getDisplayFromWindow();

    return { lang: paramsPage_lang, display: paramsPage_display };
  }
  return undefined;
}

export function switchDisplayWhenResized(stores: IStores, router: any): void {
  const paramsPage_display = getDisplayFromWindow();
  if (paramsPage_display !== stores.baseStore.paramsPage.display) {
    const paramsPage: IparamsPage = {
      lang: stores.baseStore.paramsPage.lang,
      display: paramsPage_display,
    };
    stores.baseStore.setParamsPage(paramsPage);
    const query = router.query;
    query.display = paramsPage_display;
    Router.push({
      pathname: router.pathname,
      query: query,
    });
  }
}

// export function removeSavedFromItems(stores: IStores, items: IAtom[]): IAtom[] {
//   if (!stores.baseStore.isLogged || items === undefined || items.length === 0) {
//     return items;
//   }

//   const items_filtered: IAtom[] = items.filter((item) => {
//     if (item === undefined) {
//       return false;
//     } else {
//       return !stores.savedStore.saved.has(item.id);
//     }
//   });
//   return items_filtered;
// }

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
      // setFeedForHome(stores);

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
      // stores.baseStore.initAmountFeedDisplayed();
      stores.baseStore.clearFeed();
      stores.baseStore.setFeed(atoms);
    })
    .catch(() => {
      // console.log("error in setFeedFromSearch");
    });
}

// export function updateHome(stores: IStores): void {
//   // stores.baseStore.initAmountFeedDisplayed();
//   // stores.baseStore.clearFeed();

//   setFeedForHome(stores);
// }

// export function setFeedForHome(stores: IStores): void {
//   const mixedIds: AtomID[] = Mix2Array_main_minoritaire(
//     shuffleArray(stores.baseStore.mostviewedIds),
//     shuffleArray(
//       Array.from(stores.knowbookStore.itemsInStaticKnowbooksForHome)
//     ),
//     configGeneral.display.amount_vitalKnowbook_for_each_mostview
//   );

//   const mixedItems: IAtom[] = stores.baseStore.getHistoryItems(mixedIds);

//   stores.baseStore.setFeed(mixedItems);
// }

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

export function isMobile(stores: IStores): boolean {
  // const result: boolean = stores.baseStore.currentDisplay === TDisplay.mobile;
  const result: boolean =
    stores.baseStore.paramsPage.display === TDisplay.mobile;
  return result;
}

export function isHome(router: any): boolean {
  return router.route === configPaths.rootPath;
}

export async function goPage(
  stores: IStores,
  // paramsPage: IparamsPage,
  page: string,
  queryObject: object = {},
  reload: boolean = false
) {
  if (typeof window !== "undefined") {
    const paramsPage = stores.baseStore.paramsPage;
    stores.uiStore.setUiStringStorage(TUiStringStorage.searchPattern, "");

    stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showArticle, false);
    stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showHistory, false);
    stores.uiStore.setUiBooleanStorage(
      TUiBooleanStorage.editKnowbookOpened,
      false
    );

    await Router.push({
      pathname: configPaths.rootPath + page,
      query: { ...paramsPage, ...queryObject },
    });
    if (reload) {
      await Router.reload();
    }
  }
}

export function goUserHandler(stores: IStores) {
  return () => (input: { event: eventT }) => {
    goPage(stores, configPaths.pages.User);
    // input.event.preventDefault();
    input.event.stopPropagation();
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
