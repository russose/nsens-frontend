import { observer } from "mobx-react";

import { onSavedClick } from "../src/_handlers";
import CardGrid from "../src/components/CardGrid";
import { useStores } from "../src/states/_RootStore";
import { NextPage, GetServerSideProps } from "next";
import MobileWithSearchLayout from "../src/components/layout/MobileWithSearchLayout";

import { CONFIG_FETCHING } from "../src/config";
import { ISyncBackFrontProps, indexSyncServerClientBack } from "../src/api";

const Home: React.FunctionComponent<ISyncBackFrontProps> = (props) => {
  const { dataStore } = useStores();

  if (props.userData !== null) {
    dataStore.setUserData(props.userData);
  } else {
    dataStore.addAtomsInHistory(props.atomsListResult);
  }

  return (
    <CardGrid
      atoms={dataStore
        .getHistoryList()
        .slice(-CONFIG_FETCHING.amount_data_fetched)}
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
  const query_search = context.query.q as string | undefined;
  const query_action = context.query.a as string | undefined;

  const output: ISyncBackFrontProps = await indexSyncServerClientBack(
    query_search,
    query_action
  );

  return {
    props: output,
  };
};

export default observer(Home);
