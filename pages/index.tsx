import { observer } from "mobx-react";
import {
  onSaved,
  onEditKnowbooks,
  isItemSaved,
  isItemSavedActivated,
} from "../src/_handlers";
import AtomCardGridGeneric from "../src/components/AtomCardGridGeneric";
import { useStores } from "../src/states/_RootStore";
import { NextPage, GetServerSideProps } from "next";
import MobileIndexLayout from "../src/components/layout/MobileIndexLayout";

import { CONFIG_FETCHING } from "../src/config";
import { ISyncBackFrontProps, indexSyncServerClientBack } from "../src/api";
import ModalEditKnowbooks from "../src/components/ModalEditKnowbooks";
import { Box } from "gestalt";
import ModalArticle from "../src/components/ModalArticle";

const Home: React.FunctionComponent<ISyncBackFrontProps> = (props) => {
  const { dataStore, uiStore } = useStores();

  if (props.userData !== null) {
    dataStore.setUserData(props.userData);
  } else {
    dataStore.addAtomsInHistory(props.atomsListResult);
  }

  return (
    <Box>
      <AtomCardGridGeneric
        atoms={dataStore
          .getHistoryList()
          .slice(-CONFIG_FETCHING.amount_data_fetched)}
        isItemSaved_handler={isItemSaved(dataStore)}
        isItemSavedActivated_handler={isItemSavedActivated(dataStore)}
        saved_handler={onSaved(dataStore)}
        edit_handler={onEditKnowbooks(uiStore, dataStore)}
      />
      <ModalEditKnowbooks />
      {/* <ModalArticle id="id" title="mytest" /> */}
    </Box>
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
