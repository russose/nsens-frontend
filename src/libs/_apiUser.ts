import { api_issue_text } from "../config/globals";
import { _api } from "./fetch";

/**
 * Users
 */

export async function _getUser(): Promise<string> {
  try {
    const res = await _api("get", "/auth/user", {});
    return res.data;
  } catch (error) {
    // console.log(error);
    return api_issue_text;
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
