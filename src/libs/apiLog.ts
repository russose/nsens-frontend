import { ILog } from "../config/globals";
import { my_api } from "./fetch";

export async function api_log_public(log: ILog): Promise<void> {
  try {
    const res = await my_api("post", "/public/log", log);
  } catch (error) {
    // console.log(error);
  }
}

export async function api_log_logged(log: ILog): Promise<void> {
  try {
    const res = await my_api("post", "/log", log);
  } catch (error) {
    // console.log(error);
  }
}
