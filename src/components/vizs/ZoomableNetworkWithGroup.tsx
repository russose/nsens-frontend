import { observer } from "mobx-react-lite";
// import { JsText } from "../src/components/js_components";
// import { CONFIG_FETCHING } from "../src/common/config";
// import { fetchArticle } from "../src/common/fetch";
import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import NetworkWithPropGroup from "./NetworkWithGroup";
import MyZoom from "./MyZoom";

export type IZoomableNetworkWithGroupProps = {
  itemId: string;
  title: string;
};

const margin = 5;
const size_factor = 4;

const ZoomableNetworkWithGroup: React.FunctionComponent<IZoomableNetworkWithGroupProps> = (
  props
) => {
  return (
    <ParentSize>
      {(parent) => (
        // <Box>
        <>
          <MyZoom width={parent.width - margin} height={parent.height - margin}>
            <Group
              left={(-parent.width * (size_factor - 1)) / 2}
              top={(-parent.height * (size_factor - 1)) / 2}
            >
              <NetworkWithPropGroup
                width={size_factor * parent.width}
                height={size_factor * parent.height}
                itemId={props.itemId}
                title={props.title}
              />
            </Group>
          </MyZoom>
        </>
        // </Box>
      )}
    </ParentSize>
  );
};

export default observer(ZoomableNetworkWithGroup);
