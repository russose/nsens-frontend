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
import { CONFIG_FETCHING } from "../src/config";
import { IAtom, IUserData } from "../src/types";
import { printUserData } from "../src/utils";

interface IHomeProps {
  atomsList: IAtom[];
  userCache: IUserData;
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const { dataStore } = useStores();

  if (Object.keys(props.userCache).length !== 0) {
    dataStore.setUserData(props.userCache);
  }

  const print_UserData = false;
  if (print_UserData) {
    printUserData(dataStore);
  }

  return (
    <CardGrid
      atoms={props.atomsList}
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

  if (searchPattern.lenght === 0 || searchPattern === undefined) {
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
