import fetch from "isomorphic-unfetch";
import { ConfigDataCategoryType, ConfigDataLanguage, IAtom } from "./types";
import { prepare_url } from "./utils";

export async function search_atoms(
  pattern: string,
  ROOT_URL: string,
  nb_atoms: number
): Promise<IAtom[]> {
  //const ROOT_URL = "https://fr.wikipedia.org/w/api.php";
  const PARAMS = {
    action: "query",
    format: "json",
    list: "search",
    utf8: 0,
    srsearch: pattern,
    srlimit: nb_atoms.toString(),
    srprop: "",
  };
  // Fetch data from external API
  let res = await fetch(prepare_url(ROOT_URL, PARAMS));
  const data = await res.json();

  //Extract list of wp IDs and build api string
  let list_of_PageIds_string = "";
  data["query"]["search"].map((item: Object) => {
    Object.entries(item).forEach(([key, value]) => {
      if (key === "pageid") {
        list_of_PageIds_string = list_of_PageIds_string + value + "|";
      }
      return {
        list_of_PageIds_string,
      };
    });
  });

  //Get wp information from list of IDs
  const PARAMS_2 = {
    action: "query",
    format: "json",
    prop: "pageimages|pageprops",
    indexpageids: 1,
    pageids: list_of_PageIds_string.slice(0, -1),
    utf8: 1,
    piprop: "thumbnail",
  };
  // Fetch data from external API
  res = await fetch(prepare_url(ROOT_URL, PARAMS_2));
  const data2 = await res.json();

  //Extract relevant information to keep
  const list_information_atoms: IAtom[] = [];
  Object.values(data2["query"]["pages"]).forEach((item: any) => {
    let atom = {
      wikibase_item: item["pageprops"]["wikibase_item"],
      pageid_wp: item["pageid"],
      author_id: -1,
      language: ConfigDataLanguage.fr,
      title: item["title"],
      thumbnail_wp: "none",
      creation_date: 0,
      category: ConfigDataCategoryType.TBD,
    };
    if (item["thumbnail"] !== undefined) {
      atom.thumbnail_wp = item["thumbnail"]["source"];
    }
    list_information_atoms.push(atom);
  });

  return list_information_atoms;
}
