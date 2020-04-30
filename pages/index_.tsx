import { GetServerSideProps, GetStaticProps } from "next";
import React from "react";
import { fetchAtomsFromWeb, fetch_data } from "../src/fetch_data";
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

  // searchAtomsFromWeb("https://fr.wikipedia.org/w/api.php", PARAMS, true).then((data) => {
  //   console.log("****************");
  //   console.log(JSON.stringify(data));
  // });

  return <div>"ok"</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ROOT_URL = "https://fr.wikipedia.org/w/api.php";
  const data = await fetchAtomsFromWeb("proton", ROOT_URL, 20);

  //console.log(JSON.stringify(data));
  const save_data_to_file = false;

  if (save_data_to_file) {
    const fs = require("fs");
    save_object_to_file("src/data/atoms_cache.json", { atoms_cache: data }, fs);
  }

  // Pass data to the page via props
  return { props: { data } };
};

export default Test;
