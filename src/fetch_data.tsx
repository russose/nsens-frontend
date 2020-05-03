import fetch from "isomorphic-unfetch";
import { IAtom } from "./types";
import { prepare_url, newAtom } from "./utils";

export async function fetchAtomsFromWeb(
  pattern: string,
  ROOT_URL: string,
  nb_atoms: number
): Promise<IAtom[]> {
  const PARAMS = {
    action: "query",
    format: "json",
    list: "search",
    utf8: 1,
    srenablerewrites: 1,
    srsearch: pattern,
    srlimit: nb_atoms.toString(),
    //srprop: "",
    //srnamespace: "4",
  };
  const data = await fetch_data(ROOT_URL, PARAMS, false);

  if (data["query"] === undefined || data["query"]["search"] === undefined) {
    return [];
  }

  //Extract list of wp IDs and build api string
  let list_of_PageIds_string = "";
  Object.values(data["query"]["search"]).forEach((item: any) => {
    list_of_PageIds_string = list_of_PageIds_string + item["pageid"] + "|";
  });
  list_of_PageIds_string = list_of_PageIds_string.slice(0, -1);

  if (list_of_PageIds_string === "") {
    return [];
  }

  //Get wp information from list of IDs (wikibase_item, image, thumbnail). Use English version with more image
  const PARAMS_2 = {
    action: "query",
    format: "json",
    prop: "pageprops|langlinks|pageimages",
    pageids: list_of_PageIds_string,
    utf8: 1,
    lllang: "en",
    lllimit: nb_atoms.toString(),
    //imlimit: (3 * nb_atoms).toString(),
    piprop: "original",
  };
  const data2 = await fetch_data(ROOT_URL, PARAMS_2, false);

  //Extract relevant information to keep
  const list_information_atoms: IAtom[] = [];
  Object.values(data2["query"]["pages"]).forEach((item: any) => {
    const atom = newAtom(item["pageid"]);
    atom.wikibase_item = item["pageprops"]["wikibase_item"];
    atom.pageid_wp = item["pageid"];
    atom.title = item["title"];
    if (item["langlinks"] !== undefined) {
      atom.title_en = item["langlinks"][0]["*"];
    } else {
      //console.log("error in getting english title");
    }
    if (item["original"] !== undefined) {
      atom.image = item["original"]["source"];
    }
    list_information_atoms.push(atom);
  });

  return list_information_atoms;
}

export async function enrichImagesFromWikipediaEN(
  list_information_atoms: IAtom[]
): Promise<IAtom[]> {
  if (list_information_atoms.length === 0) {
    return list_information_atoms;
  }

  //Build que list of items without images (for querry)
  let list_of_title_en_string = "";
  list_information_atoms.forEach((item: IAtom) => {
    if (item["image"] === "none") {
      list_of_title_en_string =
        list_of_title_en_string + item["title_en"] + "|";
    }
  });
  list_of_title_en_string = list_of_title_en_string.slice(0, -1);

  if (list_of_title_en_string === "") {
    return list_information_atoms;
  }

  //Obtenir les images de Wikipedia EN
  const PARAMS_3 = {
    action: "query",
    format: "json",
    prop: "pageimages",
    utf8: 1,
    titles: list_of_title_en_string,
    piprop: "original",
  };
  const data3 = await fetch_data(
    "https://en.wikipedia.org/w/api.php",
    PARAMS_3,
    false
  );

  if (data3["query"]["pages"] === undefined) {
    return list_information_atoms;
  }

  Object.values(data3["query"]["pages"]).forEach((item: any) => {
    if (item["original"] !== undefined) {
      list_information_atoms.filter((atom) => {
        return atom.title_en === item["title"];
      })[0].image = item["original"]["source"];
    } else {
      //console.log("no image for:", item["title"]);
    }
  });

  const list_information_atoms_without_image: IAtom[] = [];
  const list_information_atoms_with_image: IAtom[] = [];
  list_information_atoms.forEach((item: IAtom) => {
    if (item["image"] !== "none") {
      list_information_atoms_with_image.push(item);
    } else {
      list_information_atoms_without_image.push(item);
    }
  });

  //return list_information_atoms;
  return list_information_atoms_with_image.concat(
    list_information_atoms_without_image
  );
}

export async function fetch_data(
  ROOT_URL: string,
  PARAMS: Object,
  output_URL: boolean
): Promise<any> {
  const header = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
    },
  };
  // Fetch data from external API
  let res = await fetch(prepare_url(ROOT_URL, PARAMS), header);
  const data = await res.json();

  if (output_URL) {
    console.log(prepare_url(ROOT_URL, PARAMS));
  }

  return data;
}

// A ne pas utiliser, Qwant nous bloque!
// async function enrichImagesFromQwant(
//   list_information_atoms: IAtom[]
// ): Promise<IAtom[]> {
//   if (list_information_atoms.length === 0) {
//     return list_information_atoms;
//   }

//   //Obtenir les images de Quant
//   const PARAMS = {
//     count: 1,
//     q: "to_be_defined",
//     t: "images",
//     licence: "public",
//     size: "medium",
//     safesearch: 1,
//     locale: "en_US",
//     uiv: 4,
//   };

//   list_information_atoms.forEach(async (item: IAtom) => {
//     PARAMS.q = item.title_en;
//     try {
//       const data = await fetch_data(
//         "https://api.qwant.com/api/search/images",
//         PARAMS,
//         false
//       );

//       item["image"] = data["data"]["result"]["items"][0]["media"];
//       console.log(item["image"]);
//     } catch (err) {
//       console.log("error in fetching image for:", PARAMS.q);
//       console.log(err);
//     }
//   });

//   return list_information_atoms;
// }
