import { IconButton, Box, Layer, Flyout } from "gestalt";
import React from "react";
import { JsText } from "../js_components";

const IconButtonFlyout: React.FunctionComponent<{}> = (props) => {
  const [selected, setSelected] = React.useState(false);
  const anchorRef: any = React.useRef();
  return (
    <Box padding={1}>
      <Box ref={anchorRef}>
        <IconButton
          accessibilityLabel="Open the options menu"
          accessibilityExpanded={selected}
          accessibilityHaspopup
          icon="menu"
          bgColor="white"
          onClick={() => setSelected(!selected)}
        />
      </Box>

      {selected && (
        <Layer>
          <Flyout
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setSelected(false)}
            positionRelativeToAnchor={false}
            size="md"
          >
            <Box direction="column" display="flex" padding={2}>
              <Box padding={2}>
                <JsText weight="bold">Option 1</JsText>
              </Box>
              <Box padding={2}>
                <JsText weight="bold">Option 2</JsText>
              </Box>
            </Box>
          </Flyout>
        </Layer>
      )}
    </Box>
  );
};

export default IconButtonFlyout;
