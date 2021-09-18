import Router from "next/router";
import {
  AtomID,
  ConfigDisplay,
  configGeneral,
  ConfigLanguage,
  configPaths,
  eventT,
  EXCLUSION_PATTERNS,
  IAtom,
  IparamsPage,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import {
  api_getItemsFeaturedFromWebWithoutImage,
  api_searchFromWebWithoutImage,
} from "./apiItems";
import { DateToStringWithZero, shuffleArray } from "./utils";

export function isMobile(stores: IStores): boolean {
  const result: boolean =
    stores.baseStore.GUI_CONFIG.currentDisplay === ConfigDisplay.mobile;
  return result;
}

export async function getParamsPageFromContext(): Promise<IparamsPage> {
  if (process.browser) {
    // stores.baseStore.setscreenNoSSR();

    const language_navigator = navigator.language;
    let paramsPage_lang: ConfigLanguage;
    if (language_navigator.includes("fr")) {
      paramsPage_lang = ConfigLanguage.fr;
    } else if (language_navigator.includes("it")) {
      paramsPage_lang = ConfigLanguage.it;
    } else {
      paramsPage_lang = ConfigLanguage.en;
    }

    return { lang: paramsPage_lang };
  }
  return undefined;
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
      stores.baseStore.setModeFeedDisplayedIsSearch(true);
      stores.baseStore.initAmountFeedDisplayed();
      stores.baseStore.clearFeed();
      stores.baseStore.setFeed(atoms);
    })
    .catch(() => {
      // console.log("error in seach from pattern");
    });
}
export function setFeedFromMostviewedAndRelated(stores: IStores): void {
  stores.baseStore.setModeFeedDisplayedIsSearch(false);

  stores.baseStore.initAmountFeedDisplayed();
  stores.baseStore.clearFeed();

  const mixedIds: AtomID[] = Mix2Array(
    stores.baseStore.mostviewedIds,
    stores.baseStore.allRelatedIdsForHome,
    configGeneral.display.amount_mostview_for_each_related
  );

  const mixedItems: IAtom[] = stores.baseStore.getHistoryItems(mixedIds);

  stores.baseStore.setFeed(mixedItems);
}

export function Mix2Array(
  main: AtomID[],
  second: AtomID[],
  increment: number
): AtomID[] {
  let mixed: AtomID[] = [];
  let ix_1 = 0;
  let ix_2 = 0;

  while (ix_1 + increment <= main.length) {
    let newSecond: AtomID[];
    if (ix_2 < second.length) {
      newSecond = [second[ix_2]];
    } else {
      newSecond = [];
    }

    const newElements: AtomID[] = shuffleArray(
      main.slice(ix_1, ix_1 + increment).concat(newSecond)
    );

    mixed = mixed.concat(newElements);
    ix_1 = ix_1 + increment;
    ix_2 = ix_2 + 1;
  }
  return mixed;
}

export function isHome(router: any): boolean {
  return router.route === configPaths.rootPath;
}

export function goPage(
  stores: IStores,
  paramsPage: IparamsPage,
  page: string,
  reload: boolean = false
) {
  if (process.browser) {
    stores.uiStore.setSearchPattern("");
    Router.replace({
      pathname: configPaths.rootPath + page,
      query: paramsPage as any,
    });
    if (reload) {
      Router.reload();
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
