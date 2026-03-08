import { IKnowbook, IKnowbookFull, Tlanguage } from "../config/globals";
import { my_api } from "./fetch";

// const amount_bestPublic = configFetching.amount_bestPublicKnowbooks;

export async function api_getBestPublicKnowbooks(
  lang: Tlanguage,
  amount_bestPublic: number,
  start_index: number
): Promise<IKnowbook[]> {
  try {
    const res = await my_api(
      "get",
      "/public/knowbooksPublic/best/" +
        lang +
        "/" +
        amount_bestPublic +
        "/" +
        start_index,
      {}
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_getOnePublicKnowbookFull(
  publicKnowbookId: number
): Promise<IKnowbookFull> {
  try {
    const res = await my_api(
      "get",
      "/public/knowbooksPublic/" + publicKnowbookId,
      {}
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function api_addPublicKnowbook(
  publicKnowbookId: number
): Promise<string> {
  try {
    const res = await my_api(
      "post",
      "/knowbooksPublic/add/" + publicKnowbookId,
      {}
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function api_removePublicKnowbook(
  publicKnowbookId: number
): Promise<string> {
  try {
    const res = await my_api(
      "post",
      "/knowbooksPublic/remove/" + publicKnowbookId,
      {}
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function api_getMyPublicKnowbooksFull(
  lang: Tlanguage
): Promise<IKnowbookFull[]> {
  try {
    const res = await my_api("get", "/knowbooksPublic/" + lang, {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export async function api_getMyFollowedPublicKnowbooksNoItems(
  lang: Tlanguage
): Promise<IKnowbook[]> {
  try {
    const res = await my_api(
      "get",
      "/knowbooksPublic/FollowedNoItems/" + lang,
      {}
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
}
