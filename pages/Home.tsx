import { observer } from "mobx-react";

import { usersLoaded } from "../src/data/dataLoader";
import { onSavedClick } from "../src/_handlers";
import CardGrid from "../src/components/CardGrid";
import { useStores } from "../src/states/_RootStore";
import { NextPage } from "next";
import MobileWithSearchLayout from "../src/components/layout/MobileWithSearchLayout";

const Home: React.FunctionComponent = (props) => {
  const { pageLayoutStore, dataStore } = useStores();

  return (
    <CardGrid
      store={dataStore}
      atoms={dataStore.getAtomsFromSearchPattern(pageLayoutStore.searchPattern)}
      image_handler={(): void => {}}
      saved_handler={onSavedClick(dataStore)}
      // liked_handler={(): void => {}}
    />
  );
};

(Home as any).getLayoutMobile = (page: NextPage) => (
  <MobileWithSearchLayout>{page}</MobileWithSearchLayout>
);

// export const getStaticProps: GetStaticProps = async (context) => {
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// };

export default observer(Home);
