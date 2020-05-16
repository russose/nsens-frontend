import { observer } from "mobx-react";
import { useStores } from "../src/states/_RootStore";
import KnowCardGrid from "../src/components/KnowCardGrid";
import { NextPage } from "next";
import MobileKnowbookLayout from "../src/components/layout/MobileKnowbookLayout";
import { Box } from "gestalt";
import { USER_GUI_CONFIG } from "../src/config";
import KnowCard from "../src/components/KnowCard";

const Knowbooks: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();

  return (
    <Box>
      <KnowCardGrid
        knowbooks={Array.from(dataStore.knowbooks.values())}
        datastore={dataStore}
      />
      <Box
        //wrap={true}
        display="flex"
        direction="row"
        //padding={1}
        justifyContent="around"
      >
        <KnowCard
          id="saved"
          name={USER_GUI_CONFIG.AllSaved_title}
          images_url={[]}
          pathname="/Knowbooks/Saved"
          queryObject={{}}
          amount={dataStore.saved.size}
        />
        <KnowCard
          id="none"
          name={USER_GUI_CONFIG.None_Title}
          images_url={[]}
          pathname="/Knowbooks/None"
          queryObject={{}}
          amount="-"
        />
      </Box>
      <Box paddingY={10}></Box>
    </Box>
  );
};

(Knowbooks as any).getLayoutMobile = (page: NextPage) => (
  <MobileKnowbookLayout>{page}</MobileKnowbookLayout>
);

export default observer(Knowbooks);
