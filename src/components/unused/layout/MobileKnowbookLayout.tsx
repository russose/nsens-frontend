import { observer } from "mobx-react";

import MobilePagesLayout from "./MobilePagesLayout";
import { Box } from "gestalt";
import { useRouter } from "next/router";
import { JsHeading } from "../../js_components";
import { USER_GUI_CONFIG, USER_DISPLAY } from "../../../config";

const header_size = USER_DISPLAY.header_size;

const MobileKnowbookLayout: React.FunctionComponent = (props) => {
  const router = useRouter();
  let headerText;
  if (router.pathname === "/Knowbooks") {
    headerText = USER_GUI_CONFIG.knowbooks_title;
  } else if (router.pathname === "/Knowbooks/Saved") {
    headerText = USER_GUI_CONFIG.AllSaved_title;
  } else if (router.pathname === "/Knowbooks/None") {
    headerText = USER_GUI_CONFIG.None_Title;
  } else {
    headerText = router.query.k;
  }

  const header = (
    <Box color="lightGray" borderSize="lg" rounding={2} padding={1}>
      <JsHeading size={header_size} align="center">
        {headerText}
      </JsHeading>
      {/* <JsText align="center" size={header_size} weight="bold">
        <div>{headerText}</div>
      </JsText> */}
    </Box>
  );

  return (
    <MobilePagesLayout top_components={header}>
      {props.children}
    </MobilePagesLayout>
  );
};

export default observer(MobileKnowbookLayout);
