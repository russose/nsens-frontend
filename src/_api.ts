import { IAtom, AtomID, LogActionType, IKnowbook } from "./srcCommon/types";
import { _api } from "./srcCommon/fetch";

/********************************************************************* */
export async function _getUser(): Promise<string> {
  const res = await _api("get", "auth/user", {});
  return res.data;
}

export async function _getRefreshFeed(): Promise<IAtom[]> {
  const res = await _api("get", "feed/refresh", {});
  return res.data;
}

export async function _login(username: string, password: string) {
  const res = await _api("post", "auth/login", {
    username: username,
    password: password,
  });
  return res;
}

export async function _signup(username: string, password: string) {
  const res = await _api("post", "auth/signup", {
    username: username,
    password: password,
  });
  return res;
}

export async function _logout() {
  const res = await _api("post", "auth/logout", {});
  return res;
}

/********************************************************************* */

export async function _save(atom: IAtom): Promise<IAtom> {
  const res = await _api("post", "saved", atom);
  return res.data;
}

export async function _unsave(itemId: AtomID): Promise<IAtom> {
  const res = await _api("delete", "saved" + "/" + itemId, {});
  return res.data;
}

export async function _getSavedList(): Promise<IAtom[]> {
  const res = await _api("get", "saved", {});
  return res.data;
}

/********************************************************************* */

export async function _getKnowbooksList(): Promise<IKnowbook[]> {
  const res = await _api("get", "knowbooks/OnlyIds", {});
  return res.data;
}

export async function _addKnowbook(name: string): Promise<IKnowbook> {
  const res = await _api("post", "knowbooks", { name: name });
  return res.data;
}

export async function _removeKnowbook(name: string): Promise<IKnowbook> {
  const res = await _api("delete", "knowbooks/" + name, {});
  return res.data;
}

export async function _addItemInKnowbook(
  name: string,
  id: AtomID
): Promise<IKnowbook> {
  const res = await _api("post", "knowbooks/" + name + "/" + id, {});
  return res.data;
}

export async function _removeItemFromKnowbook(
  name: string,
  id: AtomID
): Promise<IKnowbook> {
  const res = await _api("delete", "knowbooks/" + name + "/" + id, {});
  return res.data;
}

/********************************************************************* */
export async function _log(action: LogActionType, details: string) {
  const res = await _api("post", "logs", {
    action: action,
    details: details,
  });
  return res.data;
}
