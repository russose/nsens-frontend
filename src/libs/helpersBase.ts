import Router from "next/router";
import {
  AtomID,
  configPaths,
  CONFIG_ENV,
  eventT,
  EXCLUSION_PATTERNS,
  IAtom,
  IparamsPage,
  IUser,
  TDisplay,
  Tlanguage,
  TUiBooleanStorage,
  ILog,
  TLogAction,
  IKnowbook,
  TUiNumberStorage,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import { api_getItemsFeaturedFromWebWithoutImage } from "./apiItems";
import { api_getUser, api_login, api_updateUserProps } from "./apiUser";
import { DateToStringWithZero, shuffleArray } from "./utils";
import { api_log_logged, api_log_public } from "./apiLog";
import { api_getBestPublicKnowbooks } from "./apiPublicKnowbooks";

export function submitLog(
  stores: IStores,
  action: TLogAction,
  details: string,
  anonymous: boolean
): void {
  const log: ILog = {
    action: action,
    details: stores.baseStore.GUI_CONFIG.id + " ; " + details,
    anonymous: anonymous,
  };

  if (stores.baseStore.isLogged) {
    api_log_logged(log);
  } else {
    api_log_public(log);
  }
}

export function getDisplayFromWindow(): TDisplay {
  if (typeof window !== "undefined") {
    const width = Math.min(window.innerWidth, window.outerWidth);
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

    // const paramsPage_lang = Tlanguage.en;

    const paramsPage_display = getDisplayFromWindow();

    return { lang: paramsPage_lang, display: paramsPage_display };
  }
  return undefined;
}

export async function fetchMoreBestPublicKnowbooks(stores: IStores) {
  const lang = stores.baseStore.paramsPage.lang;
  const amount_bestPublic =
    stores.baseStore.GUI_CONFIG.display.amount_bestPublicKnowbooks;

  try {
    const indexLastBestKnowbooks = stores.uiStore.getUiNumberStorage(
      TUiNumberStorage.indexLastBestKnowbooks
    );

    const newBestPublicKnowbooks: IKnowbook[] =
      await api_getBestPublicKnowbooks(
        lang,
        amount_bestPublic,
        indexLastBestKnowbooks
      );

    stores.knowbookStore.setPublicKnowbooks(newBestPublicKnowbooks);

    stores.uiStore.setUiNumberStorage(
      TUiNumberStorage.indexLastBestKnowbooks,
      indexLastBestKnowbooks + amount_bestPublic
    );
  } catch (error) {
    // console.log(error);
    return;
  }
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
  const items: IAtom[] = await fetchNewMostviewed(stores);
  stores.baseStore.setMostviewed(items);
}

// export async function setFeedFromSearch(
//   stores: IStores,
//   searchPattern: string
// ): Promise<void> {
//   if (searchPattern === undefined) {
//     return;
//   }
//   const lang = stores.baseStore.paramsPage.lang;
//   const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

//   const wiki_items = await api_searchFromWebWithoutImage(
//     searchPattern,
//     lang,
//     exclusion_patterns_items
//   );
//   const arxiv_items = await searchAndStoreArxivAtoms(
//     stores,
//     searchPattern,
//     configFetching.amount_searchArxiv
//   );

//   const publicKnowbooks = await api_getSearchPublicKnowbooks(
//     lang,
//     searchPattern
//   );

//   const atoms = [...wiki_items.slice(0, 5), ...arxiv_items.slice(0, 5)];

//   stores.baseStore.clearSearchFeed();
//   stores.baseStore.setSearchFeed(atoms);

//   // api_searchFromWebWithoutImage(searchPattern, lang, exclusion_patterns_items)
//   //   .then((atoms) => {
//   //     // stores.baseStore.initAmountFeedDisplayed();
//   //     stores.baseStore.clearSearchFeed();
//   //     stores.baseStore.setSearchFeed(atoms);
//   //   })
//   //   .catch(() => {
//   //     // console.log("error in setFeedFromSearch");
//   //   });
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

export function closeAllDialogs(stores: IStores): void {
  stores.uiStore.setUiBooleanStorage(
    TUiBooleanStorage.showEditKnowbooks,
    false
  );

  stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showWikiArticle, false);

  stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showArxivCentent, false);

  stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showBookCentent, false);

  stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showHistory, false);

  stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showSharing, false);

  stores.uiStore.setUiBooleanStorage(
    TUiBooleanStorage.showEditKnowbookProps,
    false
  );

  stores.uiStore.setUiBooleanStorage(
    TUiBooleanStorage.showEditUserProps,
    false
  );
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

export async function switchDisplayWhenResized(
  stores: IStores,
  router: any,
  reload: boolean
): Promise<void> {
  const paramsPage_display = getDisplayFromWindow();
  if (paramsPage_display !== stores.baseStore.paramsPage.display) {
    const paramsPage: IparamsPage = {
      lang: stores.baseStore.paramsPage.lang,
      display: paramsPage_display,
    };
    stores.baseStore.setParamsPage(paramsPage);
    const query = router.query;
    query.display = paramsPage_display;
    await Router.push({
      pathname: router.pathname,
      query: query,
    });
    if (reload) {
      await Router.reload();
    }
  }
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
    // stores.uiStore.setUiStringStorage(TUiStringStorage.searchPattern, "");
    stores.uiStore.resetUiBooelean();

    await Router.push({
      pathname: configPaths.rootPath + page,
      query: { ...paramsPage, ...queryObject },
    });
    if (reload) {
      await Router.reload();
    }
  }
}

export function goNewPage(url: string) {
  if (typeof window !== "undefined") {
    window.open(
      url,
      "_blank" // <- This is what makes it open in a new window.
    );
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
    await api_login("demo@demo.org", "test");
    const user = await api_getUser();
    stores.baseStore.setUser(user);
  } catch (error) {
    // console.log(error);
  }
}

export async function updateUserProps(
  stores: IStores,
  username: string,
  email: string
) {
  if (username === undefined || email === undefined) {
    return;
  }

  if (
    username === stores.baseStore.user.username &&
    email === stores.baseStore.user.email
  ) {
    return;
  }

  let username_ = username;
  if (username === undefined) {
    username_ = stores.baseStore.user.username;
  }

  let email_ = email;
  if (email === undefined) {
    email_ = stores.baseStore.user.email;
  }

  const user: IUser = {
    email: email_,
    username: username_,
    userId: stores.baseStore.user.userId,
    publicKnowbooks: stores.baseStore.user.publicKnowbooks,
  };

  try {
    const result = await api_updateUserProps(email_, username_);
    if (result !== undefined) {
      stores.baseStore.setUser(user);
    }
  } catch (error) {
    // console.log(error);
  }
}
