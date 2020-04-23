import { GetServerSideProps } from "next";
import React from "react";
import { search_atoms } from "../src/fetch_data";
import { save_object_to_file } from "../src/utils";

interface Props {
  data?: Object;
}
const Test: React.FunctionComponent<Props> = (props) => {
  return <div>"ok"</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ROOT_URL = "https://fr.wikipedia.org/w/api.php";
  const atoms = await search_atoms("proton", ROOT_URL, 20);

  //console.log(JSON.stringify(atoms));
  const save_data_to_file = false;

  if (save_data_to_file) {
    const fs = require("fs");
    save_object_to_file(
      "src/data/atoms_cache.json",
      { atoms_cache: atoms },
      fs
    );
  }

  // Pass data to the page via props
  return { props: { atoms } };
};

export default Test;
