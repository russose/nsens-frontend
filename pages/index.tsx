import { observer } from "mobx-react";
import { onSaved } from "../src/_handlers";
import AtomCardGrid from "../src/components/AtomCardGrid";
import { useStores } from "../src/states/_RootStore";
import { NextPage, GetServerSideProps } from "next";
import MobileIndexLayout from "../src/components/layout/MobileIndexLayout";

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
    <AtomCardGrid
      atoms={dataStore
        .getHistoryList()
        .slice(-CONFIG_FETCHING.amount_data_fetched)}
      listOfIdsSaved={dataStore.getSavedIds()}
      saved_handler={onSaved(dataStore)}
      ids_saved_disabled={dataStore.getAtomsIdsSavedAndInKnowbooks()}
    />
  );
};

(Home as any).getLayoutMobile = (page: NextPage) => (
  <MobileIndexLayout>{page}</MobileIndexLayout>
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
