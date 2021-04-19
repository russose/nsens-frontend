import { IAtom, AtomID, IKnowbook, api_issue_text } from "../config/globals";
import { _api } from "./fetch";

/**
 * Saved
 */

export async function _save(atom: IAtom): Promise<IAtom | undefined> {
  try {
    const res = await _api("post", "/saved", atom);
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function _unsave(itemId: AtomID): Promise<IAtom | undefined> {
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
    return api_issue_text;
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
    return api_issue_text;
  }
}

export async function _removeKnowbook(name: string): Promise<string> {
  try {
    const res = await _api("delete", "/knowbooks/" + name, {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return api_issue_text;
  }
}

export async function _addItemInKnowbook(
  name: string,
  id: AtomID
): Promise<IKnowbook | undefined> {
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
): Promise<IKnowbook | undefined> {
  try {
    const res = await _api("delete", "/knowbooks/" + name + "/" + id, {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}
