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
import { DateToStringWithZero, shuffleSized } from "./utils";

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

  const atoms_without_images = removeBigImage(atoms);
  stores.baseStore.setMostviewed(atoms_without_images);
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
      stores.baseStore.clearFeed();
      const atoms_without_images = removeBigImage(atoms);
      stores.baseStore.setFeed(atoms_without_images);
    })
    .catch(() => {
      // console.log("error in seach from pattern");
    });
}

export function setFeedFromMostviewedAndRelated(
  stores: IStores,
  amount_item_displayed: number
): void {
  const related: IAtom[] = stores.savedStore.relatedAllItemsFromSaved;
  const mostviewed: IAtom[] = stores.baseStore.mostviewedItems;

  const ratio_related: number = configGeneral.feed.ratio_related;
  const related_size = related.length;
  const amount_related = Math.min(
    Math.round(amount_item_displayed * ratio_related),
    related_size
  );
  const amount_random_and_mostviewed = amount_item_displayed - amount_related;
  // const amount_mostviewed = amount_item_displayed - amount_related;
  // const ratio_mostviewed_over_randow: number =
  //   configGeneral.feed.ratio_mostviewed_over_randow;
  // const amount_mostviewed =
  //   amount_random_and_mostviewed * ratio_mostviewed_over_randow;
  // const amount_random =
  //   amount_random_and_mostviewed * (1 - ratio_mostviewed_over_randow);

  const amount_mostviewed = amount_random_and_mostviewed;

  const related_items = shuffleSized(related, amount_related);
  const mostviewed_items = shuffleSized(mostviewed, amount_mostviewed);

  let feed_items: IAtom[] = related_items.concat(mostviewed_items);

  stores.baseStore.clearFeed();
  stores.baseStore.setFeed(shuffleSized(feed_items, amount_item_displayed));

  //Randow ITems desactivated right now
  // if (ratio_mostviewed_over_randow !== 1) {
  //   const lang = stores.baseStore.paramsPage.lang;
  //   const exclusion_patterns_items = EXCLUSION_PATTERNS(lang);

  //   api_getItemsRandomFromWeb(lang, exclusion_patterns_items, amount_random)
  //     .then((random_atoms) => {
  //       // const random_atoms_without_images = addImageToItems(
  //       //   stores,
  //       //   random_atoms,
  //       //   lang
  //       // );
  //       const random_atoms_without_images: IAtom[] =
  //         removeBigImage(random_atoms);

  //       feed_items = feed_items.concat(random_atoms_without_images);
  //       stores.baseStore.setFeed(
  //         shuffleSized(feed_items, amount_item_displayed)
  //       );
  //     })
  //     .catch(() => {
  //       // console.log("error in seach from pattern");
  //     });
  // } else {
  //   stores.baseStore.setFeed(shuffleSized(feed_items, amount_item_displayed));
  // }
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
