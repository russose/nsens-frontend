import { observer } from "mobx-react";
import SearchBar from "../SearchBar";
import { onSearchHome } from "../../_handlers";

import { USER_GUI_CONFIG, header_size } from "../../config";
import MobilePagesLayout from "./MobilePagesLayout";
import { Box } from "gestalt";
import { JsText } from "../js_components";
import { useRouter } from "next/router";

const MobileKnowbookLayout: React.FunctionComponent = (props) => {
  const router = useRouter();
  let headerText;
  if (router.pathname === "/Knowbooks") {
    headerText = USER_GUI_CONFIG.knowbooks_title;
  } else {
    headerText = router.query.k;
  }

  const header = (
    <Box color="lightGray" borderSize="lg" rounding={2} padding={1}>
      <JsText align="center" size={header_size} weight="bold">
        <div>{headerText}</div>
      </JsText>
    </Box>
  );

  return (
    <MobilePagesLayout top_components={header}>
      {props.children}
    </MobilePagesLayout>
  );
};

export default observer(MobileKnowbookLayout);
