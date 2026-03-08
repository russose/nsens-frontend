import {
  AtomID,
  IAtom,
  IKnowbook,
  IKnowbookFull,
  IKnowbookProps,
  KnowbookID,
  KnowbookName,
  Tlanguage,
} from "../config/globals";
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
  lang: Tlanguage
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

export async function api_getSavedList(lang: Tlanguage): Promise<IAtom[]> {
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
  lang: Tlanguage
): Promise<IKnowbook[]> {
  try {
    const res = await my_api("get", "/knowbooks/OnlyIds" + "/" + lang, {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_getKnowbookFull(
  // name: KnowbookName,
  knowbookId: KnowbookID,
  lang: Tlanguage
): Promise<IKnowbookFull> {
  try {
    const res = await my_api(
      "get",
      "/knowbooks" + "/" + lang + "/" + knowbookId,
      {}
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function api_addKnowbook(
  name: KnowbookName,
  lang: Tlanguage
): Promise<number> {
  try {
    const knowbook = { name: name, language: lang };
    const res = await my_api("post", "/knowbooks", knowbook);
    return Number(res.data);
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function api_removeKnowbook(
  name: KnowbookName,
  lang: Tlanguage
): Promise<string> {
  try {
    const res = await my_api("delete", "/knowbooks/" + lang + "/" + name, {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function api_addItemInKnowbook(
  name: KnowbookName,
  id: AtomID,
  lang: Tlanguage
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
  name: KnowbookName,
  id: AtomID,
  lang: Tlanguage
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

export async function api_updateKnowbook(
  name: KnowbookName,
  lang: Tlanguage,
  // input_object: {
  //   name?: string;
  //   image_url?: string;
  //   public?: boolean;
  // }
  input_object: IKnowbookProps
): Promise<string> {
  try {
    const res = await my_api(
      "put",
      "/knowbooks/update/" + lang + "/" + name,
      input_object
    );

    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}
