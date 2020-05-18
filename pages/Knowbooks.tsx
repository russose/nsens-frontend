import { observer } from "mobx-react";
import { useStores } from "../src/states/_RootStore";
import { Box } from "gestalt";
import { USER_GUI_CONFIG } from "../src/config";
import CardKnowGrid from "../src/components/CardKnowGrid";
import CardKnow from "../src/components/CardKnow";

const Knowbooks: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();

  return (
    <Box>
      <CardKnowGrid
        knowbooks={Array.from(dataStore.knowbooks.values())}
        datastore={dataStore}
      />
      <Box
        //wrap={true}
        display="flex"
        direction="row"
        //padding={1}
        justifyContent="center"
      >
        <CardKnow
          id="saved"
          title={USER_GUI_CONFIG.AllSaved_title}
          image_url={""}
          pathname="/Knowbooks/Saved"
          queryObject={{}}
          amount={dataStore.saved.size}
        />
        <CardKnow
          id="none"
          title={USER_GUI_CONFIG.None_Title}
          image_url={""}
          pathname="/Knowbooks/None"
          queryObject={{}}
          amount="-"
        />
      </Box>
      <Box paddingY={10}></Box>
    </Box>
  );
};

// (Knowbooks as any).getLayoutMobile = (page: NextPage) => (
//   <MobileKnowbookLayout>{page}</MobileKnowbookLayout>
// );

export default observer(Knowbooks);
