import { readFile, writeFile } from "fs/promises";

export async function readFileJson(path: string): Promise<object> {
  const rawdata = await readFile(path, "utf-8");
  const json = JSON.parse(rawdata);
  return json;
}

export async function writeFileJson(path: string, data: object) {
  // const jsondata = JSON.stringify(data);
  const jsondata = JSON.stringify(data, null, 2);
  writeFile(path, jsondata, "utf8");
}
