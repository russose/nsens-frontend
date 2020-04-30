import { observer } from "mobx-react";

import { onSavedClick } from "../src/_handlers";
import CardGrid from "../src/components/CardGrid";
import { useStores } from "../src/states/_RootStore";
import { NextPage } from "next";
import MobileWithSearchLayout from "../src/components/layout/MobileWithSearchLayout";

const Home: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();

  return (
    <CardGrid
      //store={dataStore}
      atoms={dataStore.getAtomsList()}
      listOfIdsSaved={dataStore.getSavedIds()}
      saved_handler={onSavedClick(dataStore)}
      image_handler={(): void => {}}
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
