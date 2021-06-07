import { my_api } from "./fetch";

/**
 * Users
 */

export async function api_getUser(): Promise<string> {
  try {
    const res = await my_api("get", "/auth/user", {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return "";
  }
}

export async function api_login(
  username: string,
  password: string
): Promise<string> {
  // try {
  const res = await my_api("post", "/auth/login", {
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

export async function api_signup(
  username: string,
  username_: string,
  password: string
): Promise<string> {
  // try {
  const res = await my_api("post", "/auth/signup", {
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

export async function api_logout(): Promise<string> {
  // try {
  const res = await my_api("post", "/auth/logout", {});
  return res;
  // } catch (error) {
  //   // console.log(error);
  //   return issue_text;
  // }
}

export async function api_getValidationNewPassword(
  username: string
): Promise<string> {
  const res = await my_api("post", "/auth/reset_password/validationCode", {
    username: username,
  });
  return res;
}

export async function api_setNewPassword(
  username: string,
  password: string,
  checkNumber: string
): Promise<string> {
  const res = await my_api("post", "/auth/reset_password", {
    username: username,
    password: password,
    checkNumber: checkNumber,
  });
  return res;
}
