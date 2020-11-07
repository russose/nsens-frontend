import { IAtom, AtomID, LogActionType, IKnowbook } from "./common/types";
import { _api } from "./common/fetch";
import {
  getItemsFromWikidata,
  ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia,
} from "./common/fetchAtom";
import { CONFIG_FETCHING } from "./common/config";

const max_amount_data_fetched_items = CONFIG_FETCHING.amount_data_fetched_items;

/**
 * From Web (Client side directly)
 */

export async function _randomFromWeb(): Promise<IAtom[]> {
  return ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia(
    "is empty",
    CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA,
    max_amount_data_fetched_items,
    "random"
  );
}

export async function _searchFromWeb(searchPattern: string): Promise<IAtom[]> {
  return ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia(
    searchPattern,
    CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA,
    max_amount_data_fetched_items,
    "search"
  );
}

export async function _getItemsFromTitlesFromWeb(
  titles_string: string
): Promise<IAtom[]> {
  // return ItemsFromIdsCleanImagesFromWikipedia(
  //   itemsId,
  //   CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA
  // );
  return ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia(
    titles_string,
    CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA,
    -1,
    "titles"
  );
}

export async function _getRelatedFromWeb(itemId: AtomID): Promise<IAtom[]> {
  return getItemsFromWikidata(itemId, CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA);
}

/**
 * Related
 */

export async function _getRelated(itemId: AtomID): Promise<IAtom[]> {
  const res = await _api("get", "/related/" + itemId, {});
  return res.data;
}

export async function _saveRelated(itemId: AtomID): Promise<string> {
  const res = await _api("post", "/related/" + itemId, {});
  return res.data;
}

/**
 * Users
 */

export async function _getUser(): Promise<string> {
  const res = await _api("get", "/auth/user", {});
  return res.data;
}

export async function _login(username: string, password: string) {
  const res = await _api("post", "/auth/login", {
    username: username,
    password: password,
  });
  return res;
}

export async function _signup(username: string, password: string) {
  const res = await _api("post", "/auth/signup", {
    username: username,
    password: password,
  });
  return res;
}

export async function _logout() {
  const res = await _api("post", "/auth/logout", {});
  return res;
}

/********************************************************************* */

// export async function _getAllFeed(): Promise<IAtom[]> {
//   const res = await _api("get", "/feed", {});
//   return res.data;
// }

// export async function _getRefreshFeed(): Promise<IAtom[]> {
//   const res = await _api("get", "/feed/refresh", {});
//   return res.data;
// }

/**
 * Saved
 */

export async function _save(atom: IAtom): Promise<IAtom> {
  const res = await _api("post", "/saved", atom);
  return res.data;
}

export async function _unsave(itemId: AtomID): Promise<IAtom> {
  const res = await _api("delete", "/saved" + "/" + itemId, {});
  return res.data;
}

export async function _getSavedList(): Promise<IAtom[]> {
  const res = await _api("get", "/saved", {});
  return res.data;
}

/**
 * Knowbooks
 */

export async function _getKnowbooksList(): Promise<IKnowbook[]> {
  const res = await _api("get", "/knowbooks/OnlyIds", {});
  return res.data;
}

export async function _addKnowbook(name: string): Promise<string> {
  const res = await _api("post", "/knowbooks", { name: name });
  return res.data;
}

export async function _renameKnowbook(
  name: string,
  new_name: string
): Promise<string> {
  const res = await _api(
    "post",
    "/knowbooks/rename/" + name + "/" + new_name,
    {}
  );
  return res.data;
}

export async function _removeKnowbook(name: string): Promise<string> {
  const res = await _api("delete", "/knowbooks/" + name, {});
  return res.data;
}

export async function _addItemInKnowbook(
  name: string,
  id: AtomID
): Promise<IKnowbook> {
  const res = await _api("post", "/knowbooks/" + name + "/" + id, {});
  return res.data;
}

export async function _removeItemFromKnowbook(
  name: string,
  id: AtomID
): Promise<IKnowbook> {
  const res = await _api("delete", "/knowbooks/" + name + "/" + id, {});
  return res.data;
}

/**
 * Logs
 */

export async function _log(action: LogActionType, details: string) {
  const res = await _api("post", "/logs", {
    action: action,
    details: details,
  });
  return res.data;
}
