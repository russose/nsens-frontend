import { GetServerSideProps, GetStaticProps } from "next";
import React from "react";
import {
  fetchAtomsFromWeb,
  enrichImagesFromWikipediaEN,
} from "../src/fetch_data";
import { save_object_to_file, prepare_url } from "../src/utils";

interface Props {
  data: Object;
}
const Test: React.FunctionComponent<Props> = (props) => {
  // const PARAMS = {
  //   action: "query",
  //   format: "json",
  //   list: "search",
  //   utf8: 0,
  //   srsearch: "proton",
  //   srlimit: 20,
  //   srprop: "",
  // };

  enrichImagesFromWikipediaEN([]).then((data: any) => {
    if (typeof window === "undefined") {
      console.log("****************");
      console.log(JSON.stringify(data["data"]["result"]["items"][0]["media"]));
    }
  });

  return <div>"ok"</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ROOT_URL = "https://fr.wikipedia.org/w/api.php";
  const data = await fetchAtomsFromWeb("proton", ROOT_URL, 20);

  // const data2: any = await enrichImagesFromQwant([]);
  // console.log(JSON.stringify(data2["data"]["result"]["items"][0]["media"]));
  // console.log(data[0]);
  // console.log(data2);

  const save_data_to_file = false;

  if (save_data_to_file) {
    const fs = require("fs");
    save_object_to_file("src/data/atoms_cache.json", { atoms_cache: data }, fs);
  }

  // Pass data to the page via props
  return { props: { data } };
};

export default Test;
