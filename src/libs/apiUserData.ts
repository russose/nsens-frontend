import { IAtom, AtomID, IKnowbook, ConfigLanguage } from "../config/globals";
import { my_api } from "./fetch";

/**
 * Saved
 */

export async function api_save(atom: IAtom): Promise<IAtom> {
  try {
    const res = await my_api("post", "/saved", atom);
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function api_unsave(
  itemId: AtomID,
  lang: ConfigLanguage
): Promise<IAtom> {
  try {
    const res = await my_api(
      "delete",
      "/saved" + "/" + lang + "/" + itemId,
      {}
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function api_getSavedList(lang: ConfigLanguage): Promise<IAtom[]> {
  try {
    const res = await my_api("get", "/saved" + "/" + lang, {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
}
/**
 * Knowbooks
 */

export async function api_getKnowbooksList(
  lang: ConfigLanguage
): Promise<IKnowbook[]> {
  try {
    const res = await my_api("get", "/knowbooks/OnlyIds" + "/" + lang, {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_addKnowbook(
  name: string,
  lang: ConfigLanguage
): Promise<string> {
  try {
    const knowbook = { name: name, language: lang };
    const res = await my_api("post", "/knowbooks", knowbook);
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function api_renameKnowbook(
  name: string,
  new_name: string,
  lang: ConfigLanguage
): Promise<string> {
  try {
    const res = await my_api(
      "post",
      "/knowbooks/rename/" + lang + "/" + name + "/" + new_name,
      {}
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function api_removeKnowbook(
  name: string,
  lang: ConfigLanguage
): Promise<string> {
  try {
    const res = await my_api("delete", "/knowbooks/" + lang + "/" + name, {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
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
  id: AtomID,
  lang: ConfigLanguage
): Promise<IKnowbook | undefined> {
  try {
    const res = await my_api(
      "post",
      "/knowbooks/" + lang + "/" + name + "/" + id,
      {}
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function api_removeItemFromKnowbook(
  name: string,
  id: AtomID,
  lang: ConfigLanguage
): Promise<IKnowbook> {
  try {
    const res = await my_api(
      "delete",
      "/knowbooks/" + lang + "/" + name + "/" + id,
      {}
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}
