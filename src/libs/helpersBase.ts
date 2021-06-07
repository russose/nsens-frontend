import Router from "next/router";
import {
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
import { api_getItemsFeaturedFromWeb, api_searchFromWeb } from "./apiItems";
import { DateToStringWithZero, hasTouchScreen, shuffleSized } from "./utils";

export function getParamsPageFromContext(stores: IStores): IparamsPage {
  if (process.browser) {
    const max_width_mobile = configGeneral.max_width_mobile;
    const isMobile: boolean =
      hasTouchScreen(window) || window.innerWidth < max_width_mobile;

    let paramsPage_lang = ConfigLanguage.fr;

    let paramsPage_display: ConfigDisplay;
    if (isMobile) {
      paramsPage_display = ConfigDisplay.mobile;
    } else {
      if (
        stores.baseStore.screen.width >
        configGeneral.extra_large_screen_breakpoint
      ) {
        paramsPage_display = ConfigDisplay.extra;
      } else if (
        stores.baseStore.screen.width > configGeneral.large_screen_breakpoint
      ) {
        paramsPage_display = ConfigDisplay.large;
      } else {
        paramsPage_display = ConfigDisplay.desktop;
      }
    }
    return { lang: paramsPage_lang, display: paramsPage_display };
  }
  return undefined;
}

export async function initialyzeMostviewed(stores: IStores) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate(); //Current day may not work around 0h

  const lang = stores.baseStore.paramsPage.lang;
  const exclusion_patterns_items: string[] = EXCLUSION_PATTERNS(lang);

  let atoms = await api_getItemsFeaturedFromWeb(
    DateToStringWithZero(year),
    DateToStringWithZero(month),
    DateToStringWithZero(day),
    lang,
    exclusion_patterns_items
  );

  if (atoms.length === 0) {
    atoms = await api_getItemsFeaturedFromWeb(
      DateToStringWithZero(year),
      DateToStringWithZero(month),
      DateToStringWithZero(day - 1),
      lang,
      exclusion_patterns_items
    );
  }

  stores.baseStore.setMostviewed(atoms);
}

// Used if Icon Tap goes in random article
// export function getRandomItemIdFromAnywhere(stores: IStores): AtomID {
//   const history_ids = Array.from(stores.baseStore.history.keys());
//   const relatedAll_ids = Array.from(stores.baseStore.relatedAll.keys());
//   const saved_ids = Array.from(stores.savedStore.saved.keys());
//   const all_ids: AtomID[] = history_ids
//     .concat(relatedAll_ids)
//     .concat(saved_ids);

//   return shuffleSized(all_ids, 1)[0];
// }

export function setFeedFromSearch(
  stores: IStores,
  searchPattern: string
): void {
  if (searchPattern === undefined) {
    return;
  }
  const lang = stores.baseStore.paramsPage.lang;
  const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  api_searchFromWeb(searchPattern, lang, exclusion_patterns_items)
    .then((atoms) => {
      stores.baseStore.setFeed(atoms);
    })
    // .then(() => {
    //   //LOG SEARCHED ITEM, DISABLED
    //   _log(LogActionType.search, searchPattern);
    // })
    .catch((error) => {
      // console.log("error in seach from pattern");
    });
}

export function setFeedFromMostviewedAndRelated(
  stores: IStores,
  amount_item_displayed: number
): void {
  const related: IAtom[] = stores.baseStore.getAllRelatedItems();
  const mostviewed: IAtom[] = Array.from(stores.baseStore.mostviewed.values());

  const ratio_related: number = configGeneral.ratio_related_feed;

  const related_size = related.length;

  const amount_related = Math.min(
    Math.round(amount_item_displayed * ratio_related),
    related_size
  );
  const amount_mostviewed = amount_item_displayed - amount_related;

  const related_items = shuffleSized(related, amount_related);
  const mostviewed_items = shuffleSized(mostviewed, amount_mostviewed);

  const feed_items: IAtom[] = related_items.concat(mostviewed_items);

  stores.baseStore.setFeed(shuffleSized(feed_items, amount_item_displayed));
}

// export function ItemFromHistory(stores: IStores, title: string): IAtom {
//   const items_filtered: IAtom[] = Array.from(
//     stores.baseStore.history.values()
//   ).filter((item: IAtom) => {
//     return item.title === title;
//   });

//   if (items_filtered.length !== undefined && items_filtered.length > 0) {
//     return items_filtered[0];
//   } else {
//     return undefined;
//   }
// }

export function goPage(
  paramsPage: IparamsPage,
  page: string,
  reload: boolean = false
) {
  if (process.browser) {
    Router.push({
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
      {
        lang: stores.baseStore.paramsPage.lang,
        display: stores.baseStore.paramsPage.display,
      },
      configPaths.pages.User
    );
    input.event.preventDefault();
  };
}

// export function goPageArticle(
//   stores: IStores,
//   paramsPage: IparamsPage,
//   itemId: AtomID,
//   itemTitle: string
//   // GUI_CONFIG: GUI_CONFIG_T
// ) {
//   if (process.browser) {
//     Router.push({
//       pathname: stores.baseStore.rootPath + configPaths.pages.ItemArticle,
//       query: { ...paramsPage, ...{ title: itemTitle, id: itemId } },
//     });
//   }
// }

/* TO BE DELETED */

// export function setFeedFromRelated(
//   stores: IStores,
//   amount_item_displayed: number
// ): void {
//   const related: IAtom[] = stores.baseStore.getAllRelatedItems();

//   if (related.length === 0) {
//     setFeedFromMostviewed(stores);
//   } else {
//     stores.baseStore.setFeed(shuffleSized(related, amount_item_displayed));
//   }
// }

// export function setFeedFromRandom(stores: IStores): void {
//   _randomFromWeb(stores.baseStore.paramsPage.lang)
//     .then((atoms) => {
//       stores.baseStore.setFeed(atoms);
//     })
//     .catch((error) => {});
// }

// export function setFeedFromMostviewed(stores: IStores): void {
//   stores.baseStore.setFeed(
//     shuffleSized(
//       Array.from(stores.baseStore.mostviewed.values()),
//       stores.baseStore.GUI_CONFIG.display.amount_item_displayed
//     )
//   );
// }
//
