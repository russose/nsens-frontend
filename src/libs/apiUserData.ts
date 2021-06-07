import { IAtom, AtomID, IKnowbook } from "../config/globals";
import { my_api } from "./fetch";

/**
 * Saved
 */

export async function api_save(atom: IAtom): Promise<IAtom> {
  // try {
  const res = await my_api("post", "/saved", atom);
  return res.data;
  // } catch (error) {
  //   // console.log(error);
  //   return undefined;
  // }
}

export async function api_unsave(itemId: AtomID): Promise<IAtom> {
  // try {
  const res = await my_api("delete", "/saved" + "/" + itemId, {});
  return res.data;
  // } catch (error) {
  //   // console.log(error);
  //   return undefined;
  // }
}

export async function api_getSavedList(): Promise<IAtom[]> {
  try {
    const res = await my_api("get", "/saved", {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
}
/**
 * Knowbooks
 */

export async function api_getKnowbooksList(): Promise<IKnowbook[]> {
  try {
    const res = await my_api("get", "/knowbooks/OnlyIds", {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_addKnowbook(name: string): Promise<string> {
  // try {
  const res = await my_api("post", "/knowbooks", { name: name });
  return res.data;
  // } catch (error) {
  //   // console.log(error);
  //   return api_issue_text;
  // }
}

export async function api_renameKnowbook(
  name: string,
  new_name: string
): Promise<string> {
  // try {
  const res = await my_api(
    "post",
    "/knowbooks/rename/" + name + "/" + new_name,
    {}
  );
  return res.data;
  // } catch (error) {
  //   // console.log(error);
  //   return api_issue_text;
  // }
}

export async function api_removeKnowbook(name: string): Promise<string> {
  // try {
  const res = await my_api("delete", "/knowbooks/" + name, {});
  return res.data;
  // } catch (error) {
  //   // console.log(error);
  //   return api_issue_text;
  // }
}

// export async function _addItemInKnowbook(
//   name: string,
//   item: IAtom
// ): Promise<IKnowbook> {
//   // try {
//   const res = await _api("post", "/knowbooks/" + name, item);
//   return res.data;
//   // } catch (error) {
//   //   console.log(error);
//   //   return undefined;
//   // }
// }

export async function api_addItemInKnowbook(
  name: string,
  id: AtomID
): Promise<IKnowbook | undefined> {
  // try {
  const res = await my_api("post", "/knowbooks/" + name + "/" + id, {});
  return res.data;
  // } catch (error) {
  //   console.log(error);
  //   return undefined;
  // }
}

export async function api_removeItemFromKnowbook(
  name: string,
  id: AtomID
): Promise<IKnowbook> {
  // try {
  const res = await my_api("delete", "/knowbooks/" + name + "/" + id, {});
  return res.data;
  // } catch (error) {
  //   // console.log(error);
  //   return undefined;
  // }
}
