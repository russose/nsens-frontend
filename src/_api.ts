import {
  IAtom,
  AtomID,
  LogActionType,
  IKnowbook,
  IRelatedAtom,
} from "./common/types";
import { _api } from "./libs/fetch";
import {
  ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia,
  ItemsFromWikidata,
  ItemsRelatedFromWikipedia,
} from "./libs/fetchInterface";
import { CONFIG_FETCHING } from "./common/config";

const max_amount_data_fetched_items = CONFIG_FETCHING.amount_data_fetched_items;
const url_wikipedia_action = CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_ACTION;
const url_wikipedia_rest = CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA_REST;
const amount_related = CONFIG_FETCHING.amount_related;

/**
 * From Web (Client side directly)
 */

export async function _randomFromWeb(): Promise<IAtom[]> {
  try {
    return ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia(
      "is empty",
      url_wikipedia_action,
      max_amount_data_fetched_items,
      "random"
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function _searchFromWeb(searchPattern: string): Promise<IAtom[]> {
  try {
    return ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia(
      searchPattern,
      url_wikipedia_action,
      max_amount_data_fetched_items,
      "search"
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function _getItemsFromTitlesFromWeb(
  titles_string: string
): Promise<IAtom[]> {
  try {
    return ItemsFromSearchOrRandomOrTitlesCleanImagesFromWikipedia(
      titles_string,
      url_wikipedia_action,
      -1,
      "titles"
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}

// export async function _getRelatedFromWikipediaFromWeb(
//   itemId: AtomID,
//   title: string
// ): Promise<IAtom[]> {
//   try {
//     return ItemsRelatedFromWikipedia(
//       title,
//       itemId,
//       amount_related,
//       url_wikipedia_rest,
//       url_wikipedia_action
//     );
//   } catch (error) {
//     // console.log(error);
//     return [];
//   }
// }

// export async function _getRelatedFromWikidataFromWeb(
//   itemId: AtomID
// ): Promise<IAtom[]> {
//   try {
//     return ItemsFromWikidata(itemId, url_wikipedia_action);
//   } catch (error) {
//     // console.log(error);
//     return [];
//   }
// }

export async function _getRelatedFromWikipediaFromWeb(
  // itemId: AtomID,
  title: string
): Promise<IRelatedAtom[]> {
  try {
    return ItemsRelatedFromWikipedia(
      title,
      // itemId,
      amount_related,
      url_wikipedia_rest,
      url_wikipedia_action
    );
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function _getRelatedFromWikidataFromWeb(
  itemId: AtomID
): Promise<IRelatedAtom[]> {
  try {
    return ItemsFromWikidata(itemId, url_wikipedia_action);
  } catch (error) {
    // console.log(error);
    return [];
  }
}

/**
 * Related
 */

// export async function _getRelated(itemId: AtomID): Promise<IAtom[]> {
//   try {
//     const res = await _api("get", "/related/" + itemId, {});
//     return res.data;
//   } catch (error) {
//     // console.log(error);
//     return [];
//   }
// }

// export async function _saveRelated(
//   itemId: AtomID,
//   title: string
// ): Promise<string> {
//   try {
//     const res = await _api("post", "/related/" + itemId + "/" + title, {});
//     return res.data;
//   } catch (error) {
//     // console.log(error);
//     return error;
//   }
// }

/**
 * Users
 */

export async function _getUser(): Promise<string> {
  try {
    const res = await _api("get", "/auth/user", {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return "error";
  }
}

export async function _login(
  username: string,
  password: string
): Promise<string> {
  try {
    const res = await _api("post", "/auth/login", {
      username: username,
      password: password,
    });
    return res;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

export async function _signup(
  username: string,
  password: string
): Promise<string> {
  try {
    const res = await _api("post", "/auth/signup", {
      username: username,
      password: password,
    });
    return res;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

export async function _logout(): Promise<string> {
  try {
    const res = await _api("post", "/auth/logout", {});
    return res;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

/**
 * Saved
 */

export async function _save(atom: IAtom): Promise<IAtom> {
  try {
    const res = await _api("post", "/saved", atom);
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function _unsave(itemId: AtomID): Promise<IAtom> {
  try {
    const res = await _api("delete", "/saved" + "/" + itemId, {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function _getSavedList(): Promise<IAtom[]> {
  try {
    const res = await _api("get", "/saved", {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

/**
 * Knowbooks
 */

export async function _getKnowbooksList(): Promise<IKnowbook[]> {
  try {
    const res = await _api("get", "/knowbooks/OnlyIds", {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function _addKnowbook(name: string): Promise<string> {
  try {
    const res = await _api("post", "/knowbooks", { name: name });
    return res.data;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

export async function _renameKnowbook(
  name: string,
  new_name: string
): Promise<string> {
  try {
    const res = await _api(
      "post",
      "/knowbooks/rename/" + name + "/" + new_name,
      {}
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

export async function _removeKnowbook(name: string): Promise<string> {
  try {
    const res = await _api("delete", "/knowbooks/" + name, {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

export async function _addItemInKnowbook(
  name: string,
  id: AtomID
): Promise<IKnowbook> {
  try {
    const res = await _api("post", "/knowbooks/" + name + "/" + id, {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function _removeItemFromKnowbook(
  name: string,
  id: AtomID
): Promise<IKnowbook> {
  try {
    const res = await _api("delete", "/knowbooks/" + name + "/" + id, {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

/**
 * Logs
 */

export async function _log(
  action: LogActionType,
  details: string
): Promise<string> {
  try {
    const res = await _api("post", "/logs", {
      action: action,
      details: details,
    });
    return res.data;
  } catch (error) {
    // console.log(error);
    return error;
  }
}
