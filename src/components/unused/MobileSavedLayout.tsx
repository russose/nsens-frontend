import { observer } from "mobx-react";
import SearchBar from "../SearchBar";
import { onSearchHome } from "../../_handlers";

import { USER_GUI_CONFIG, USER_DISPLAY } from "../../config";
import MobilePagesLayout from "../layout/MobilePagesLayout";
import { Box, Heading } from "gestalt";
import { JsText, JsHeading } from "../js_components";
import { useRouter } from "next/router";

const header_size = USER_DISPLAY.header_size;

const MobileKnowbookLayout: React.FunctionComponent = (props) => {
  const header = (
    <Box color="lightGray" borderSize="lg" rounding={2} padding={1}>
      <JsHeading size={header_size} align="center">
        {USER_GUI_CONFIG.AllSaved_title}
      </JsHeading>
    </Box>
  );

  return (
    <MobilePagesLayout top_components={header}>
      {props.children}
    </MobilePagesLayout>
  );
};

export default observer(MobileKnowbookLayout);
