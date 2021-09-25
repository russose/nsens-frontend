import { readFile, writeFile } from "fs/promises";

export async function readFileJson(
  pathBase: string,
  title: string
): Promise<object> {
  const title_ = title.replace(/\//g, "_");
  const rawdata = await readFile(pathBase + title_, "utf-8");
  const json = JSON.parse(rawdata);
  return json;
}

export async function writeFileJson(
  pathBase: string,
  title: string,
  data: object
) {
  const title_ = title.replace(/\//g, "_");
  // const jsondata = JSON.stringify(data);
  const jsondata = JSON.stringify(data, null, 2);
  writeFile(pathBase + title_, jsondata, "utf8");
}
