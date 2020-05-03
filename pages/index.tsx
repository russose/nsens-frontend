import { observer } from "mobx-react";

import { onSavedClick } from "../src/_handlers";
import CardGrid from "../src/components/CardGrid";
import { useStores } from "../src/states/_RootStore";
import { NextPage, GetServerSideProps } from "next";
import MobileWithSearchLayout from "../src/components/layout/MobileWithSearchLayout";
import {
  fetchAtomsFromWeb,
  enrichImagesFromWikipediaEN,
} from "../src/fetch_data";
import { CONFIG_FETCHING, CONFIG_GUI } from "../src/config";
import { IAtom, IUserData } from "../src/types";
import { printUserData } from "../src/utils";

interface IHomeProps {
  atomsList: IAtom[];
  userCache: IUserData;
}

let atomsList_to_display_cache: IAtom[];

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const { dataStore } = useStores();
  let atomsList_to_display: IAtom[];

  if (Object.keys(props.userCache).length !== 0) {
    // Load cache sent by server
    dataStore.setUserData(props.userCache);
    atomsList_to_display_cache = props.atomsList;
    atomsList_to_display = props.atomsList;
  } else if (
    dataStore.searchPattern.length <= CONFIG_GUI.all.SEARCH_MIN_LENGTH_SEARCH
  ) {
    //display cache
    atomsList_to_display = atomsList_to_display_cache;
  } else {
    // nominal situation
    atomsList_to_display = props.atomsList;
  }

  const print_UserData = false;
  if (print_UserData) {
    printUserData(dataStore);
  }

  return (
    <CardGrid
      atoms={atomsList_to_display}
      listOfIdsSaved={dataStore.getSavedIds()}
      saved_handler={onSavedClick(dataStore)}
      image_handler={(): void => {}}
    />
  );
};

(Home as any).getLayoutMobile = (page: NextPage) => (
  <MobileWithSearchLayout>{page}</MobileWithSearchLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  let searchPattern: any = context.query.q;
  let atomsListWithImages: IAtom[];

  if (context.query.q === undefined) {
    try {
      const cache = require("../src/data/cache_user1.json");
      const userCache = cache.user;
      return {
        props: { userCache: userCache, atomsList: userCache.atoms_cache },
      };
    } catch {
      console.log("impossible de lire le cache");
      return {
        props: { userCache: {}, atomsList: [] },
      };
    }
  }

  if (searchPattern.length === 0) {
    return {
      props: { userCache: {}, atomsList: [] },
    };
  }

  const atomsList = await fetchAtomsFromWeb(
    searchPattern,
    CONFIG_FETCHING.URLs.ROOT_URL_WIKIPEDIA,
    CONFIG_FETCHING.amount_data_fetched
  );
  atomsListWithImages = await enrichImagesFromWikipediaEN(atomsList);
  return {
    props: { userCache: {}, atomsList: atomsListWithImages },
  };
};

export default observer(Home);
