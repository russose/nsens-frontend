import { NextRouter } from "next/router";
import {
  AtomID,
  CONFIG_ENV,
  eventT,
  IKnowbookQuery,
  TUiBooleanStorage,
  TUiStringStorage,
} from "../config/globals";
import { goPage, goUserHandler } from "../libs/helpersBase";
import { IStores } from "../stores/RootStore";
import { configPaths } from "./../config/configLocalAndEnv";

/*******************Logo*************************** */
export const onTapLogo = (stores: IStores) => (): void => {
  goPage(stores, configPaths.pages.Home);
};

/*******************Go to *************************** */

export const onGoItemNetworkPage =
  (stores: IStores, desactivateGoNetwork = false) =>
  (item_title: string, item_id: string) =>
  (input: { event: eventT }): void => {
    // goPage(stores, path_link_main_item_page(item_id, stores), {
    if (desactivateGoNetwork === true) {
      input.event.stopPropagation();
      return;
    }
    goPage(stores, configPaths.pages.ItemNetwork, {
      title: item_title,
      id: item_id,
    });
    // input.event.preventDefault();
    input.event.stopPropagation();
  };

export const onGoKnowbookPage =
  (stores: IStores) =>
  (pathname: string, queryObject: IKnowbookQuery) =>
  (input: { event: eventT }): void => {
    goPage(stores, pathname, queryObject);
    // input.event.preventDefault();
    input.event.stopPropagation();
  };

export const goUserHandler_ =
  (stores: IStores) =>
  (itemID: AtomID) =>
  (input: { event: eventT }): void => {
    itemID === undefined ? true : true; // itemID is indispensible and should be kept
    goUserHandler(stores)()(input);
    // stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showArticle, false);
    return;
  };

export const copyLink =
  (stores: IStores) =>
  (router: NextRouter) =>
  (input: { event: eventT }): void => {
    const page_url = CONFIG_ENV.FRONT_URL + router.asPath;

    // copyToClipboard(page_url);
    // stores.uiStore.setUiStringStorage(
    //   TUiStringStorage.sharingInformation,
    //   stores.baseStore.GUI_CONFIG.language.sharingURL_Base + page_url
    // );

    stores.uiStore.setUiStringStorage(
      TUiStringStorage.sharingInformation,
      page_url
    );

    stores.uiStore.setUiBooleanStorage(TUiBooleanStorage.showSharing, true);

    // setTimeout(() => {
    //   stores.uiStore.setUiBooleanStorage(
    //     TUiBooleanStorage.informationOpened,
    //     false
    //   );
    // }, 800);

    // input.event.preventDefault();
    input.event.stopPropagation();
  };
