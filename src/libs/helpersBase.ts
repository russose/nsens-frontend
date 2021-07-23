import Router from "next/router";
import {
  ROOT_URL_WIKIPEDIA_ACTION,
  ROOT_URL_WIKIPEDIA_REST,
} from "../config/configURLs";
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
import {
  api_getItemsFeaturedFromWeb,
  api_getItemsRandomFromWeb,
  api_searchFromWeb,
} from "./apiItems";
import { getCleanImage } from "./fetchBase";
import { DateToStringWithZero, hasTouchScreen, shuffleSized } from "./utils";

export async function getParamsPageFromContext(
  stores: IStores
): Promise<IparamsPage> {
  if (process.browser) {
    stores.baseStore.setscreenNoSSR();
    const max_width_mobile = configGeneral.max_width_mobile;
    const isMobile: boolean =
      hasTouchScreen(window) || window.innerWidth < max_width_mobile;

    const language_navigator = navigator.language;
    let paramsPage_lang: ConfigLanguage;
    if (language_navigator.includes("fr")) {
      paramsPage_lang = ConfigLanguage.fr;
    } else if (language_navigator.includes("it")) {
      paramsPage_lang = ConfigLanguage.it;
    } else {
      paramsPage_lang = ConfigLanguage.en;
    }
    //paramsPage_lang = ConfigLanguage.fr;

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

function removeBigImage(atoms: IAtom[]): IAtom[] {
  const atoms_without_images = atoms.map((item) => {
    let atom_without_image = item;
    atom_without_image.image_url = "";
    return atom_without_image;
  });

  return atoms_without_images;
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

  if (atoms.length === 0) {
    atoms = await api_getItemsFeaturedFromWeb(
      DateToStringWithZero(year),
      DateToStringWithZero(month - 1),
      DateToStringWithZero(30),
      lang,
      exclusion_patterns_items
    );
  }

  //**************************************************************** */
  // Remove images very big
  // const atoms_without_images = atoms.map((item) => {
  //   let atom_without_image = item;
  //   atom_without_image.image_url = "";
  //   return atom_without_image;
  // });
  const atoms_without_images = removeBigImage(atoms);

  stores.baseStore.setMostviewed(atoms_without_images);

  atoms.forEach((item) => {
    getCleanImage(
      item,
      ROOT_URL_WIKIPEDIA_REST(lang),
      ROOT_URL_WIKIPEDIA_ACTION(lang),
      lang
    )
      .then((item) => {
        stores.baseStore.setMostviewedSingle(item);
        if (stores.baseStore.feed.has(item.id)) {
          stores.baseStore.setFeedSingle(item);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  });
  //**************************************************************** */
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

  api_searchFromWeb(searchPattern, lang, exclusion_patterns_items)
    .then((atoms) => {
      const atoms_without_images = removeBigImage(atoms);
      stores.baseStore.setFeed(atoms_without_images);

      atoms.forEach((item) => {
        getCleanImage(
          item,
          ROOT_URL_WIKIPEDIA_REST(lang),
          ROOT_URL_WIKIPEDIA_ACTION(lang),
          lang
        )
          .then((item) => {
            // if (stores.baseStore.feed.has(item.id)) {
            stores.baseStore.setFeedSingle(item);
            // }
          })
          .catch((error) => {
            // console.log(error);
          });
      });
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

  const ratio_related: number = configGeneral.feed.ratio_related;
  const related_size = related.length;
  const amount_related = Math.min(
    Math.round(amount_item_displayed * ratio_related),
    related_size
  );
  const amount_random_and_mostviewed = amount_item_displayed - amount_related;
  // const amount_mostviewed = amount_item_displayed - amount_related;
  const ratio_mostviewed_over_randow: number =
    configGeneral.feed.ratio_mostviewed_over_randow;
  const amount_mostviewed =
    amount_random_and_mostviewed * ratio_mostviewed_over_randow;
  const amount_random =
    amount_random_and_mostviewed * (1 - ratio_mostviewed_over_randow);

  const related_items = shuffleSized(related, amount_related);
  const mostviewed_items = shuffleSized(mostviewed, amount_mostviewed);

  let feed_items: IAtom[] = related_items.concat(mostviewed_items);

  if (ratio_mostviewed_over_randow !== 1) {
    const lang = stores.baseStore.paramsPage.lang;
    const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

    api_getItemsRandomFromWeb(lang, exclusion_patterns_items, amount_random)
      .then((atoms) => {
        // const random_items: IAtom[] = atoms;
        // feed_items = feed_items.concat(random_items);
        // stores.baseStore.setFeed(
        //   shuffleSized(feed_items, amount_item_displayed)
        // );

        const atoms_without_images = removeBigImage(atoms);

        const random_items: IAtom[] = atoms_without_images;
        feed_items = feed_items.concat(random_items);
        stores.baseStore.setFeed(
          shuffleSized(feed_items, amount_item_displayed)
        );

        atoms.forEach((item) => {
          getCleanImage(
            item,
            ROOT_URL_WIKIPEDIA_REST(lang),
            ROOT_URL_WIKIPEDIA_ACTION(lang),
            lang
          )
            .then((item) => {
              // if (stores.baseStore.feed.has(item.id)) {
              stores.baseStore.setFeedSingle(item);
              // }
            })
            .catch((error) => {
              // console.log(error);
            });
        });
      })
      .catch((error) => {
        // console.log("error in seach from pattern");
      });
  } else {
    stores.baseStore.setFeed(shuffleSized(feed_items, amount_item_displayed));
  }
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
        display: stores.baseStore.paramsPage.display,
      },
      configPaths.pages.User
    );
    input.event.preventDefault();
  };
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
