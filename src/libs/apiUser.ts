import { IUser, UserID } from "../config/globals";
import { my_api } from "./fetch";

/**
 * Users
 */

export async function api_getUserId(): Promise<UserID> {
  try {
    const res = await my_api("get", "/public/user", {});
    const result = res.data;
    if (result === "") {
      return -1;
    } else {
      return Number(result);
    }
  } catch (error) {
    // console.log(error);
    return -1;
  }
}

export async function api_getUser(): Promise<IUser> {
  let res;
  try {
    res = await my_api("get", "/userFull", {});
    return res.data;
  } catch (error) {
    return undefined;
  }
}

export async function api_login(
  email: string,
  password: string
): Promise<string> {
  // try {
  const res = await my_api("post", "/public/login", {
    email: email,
    password: password,
  });
  return res.data;
}

export async function api_signup(
  email: string,
  username_: string,
  password: string
): Promise<string> {
  const res = await my_api("post", "/public/signup", {
    email: email,
    username_: username_,
    password: password,
  });
  return res;
}

export async function api_logout(): Promise<string> {
  const res = await my_api("post", "/public/logout", {});
  return res;
}

export async function api_getValidationNewPassword(
  email: string
): Promise<string> {
  const res = await my_api("post", "/reset_password/validationCode", {
    email: email,
  });
  return res;
}

export async function api_setNewPassword(
  email: string,
  password: string,
  checkNumber: string
): Promise<string> {
  const res = await my_api("post", "/reset_password", {
    email: email,
    password: password,
    checkNumber: checkNumber,
  });
  return res;
}

export async function api_updateUserProps(
  email: string,
  username: string
): Promise<string> {
  try {
    const res = await my_api("put", "/user/update", {
      email: email,
      username: username,
    });
    return res;
  } catch (error) {
    return undefined;
  }
}
