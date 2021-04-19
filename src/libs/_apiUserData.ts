import { IAtom, AtomID, IKnowbook } from "../common/globals";
import { _api } from "./fetch";

export const issue_text: string = "issue in loging or network";

/**
 * Users
 */

export async function _getUser(): Promise<string> {
  try {
    const res = await _api("get", "/auth/user", {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return issue_text;
  }
}

export async function _login(
  username: string,
  password: string
): Promise<string> {
  // try {
  const res = await _api("post", "/auth/login", {
    username: username,
    password: password,
  });
  return res;
  // } catch (error) {
  //   console.log("err");
  //   // console.log(error);
  //   return issue_text;
  // }
}

export async function _signup(
  username: string,
  username_: string,
  password: string
): Promise<string> {
  // try {
  const res = await _api("post", "/auth/signup", {
    username: username,
    username_: username_,
    password: password,
  });
  return res;
  // } catch (error) {
  //   // console.log(error);
  //   return issue_text;
  // }
}

export async function _logout(): Promise<string> {
  // try {
  const res = await _api("post", "/auth/logout", {});
  return res;
  // } catch (error) {
  //   // console.log(error);
  //   return issue_text;
  // }
}

export async function _getValidationNewPassword(
  username: string
): Promise<string> {
  const res = await _api("post", "/auth/reset_password/validationCode", {
    username: username,
  });
  return res;
}

export async function _setNewPassword(
  username: string,
  password: string,
  checkNumber: string
): Promise<string> {
  const res = await _api("post", "/auth/reset_password", {
    username: username,
    password: password,
    checkNumber: checkNumber,
  });
  return res;
}

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
    return issue_text;
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
    return issue_text;
  }
}

export async function _removeKnowbook(name: string): Promise<string> {
  try {
    const res = await _api("delete", "/knowbooks/" + name, {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return issue_text;
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

/**
 * Logs
 */

// export async function _log(
//   action: LogActionType,
//   details: string
// ): Promise<string> {
//   try {
//     const res = await _api("post", "/logs", {
//       action: action,
//       details: details,
//     });
//     return res.data;
//   } catch (error) {
//     // console.log(error);
//     return error;
//   }
// }
