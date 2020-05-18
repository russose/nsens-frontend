import { Box, Spinner } from "gestalt";
import { observer } from "mobx-react";

interface ISpinnerProps {
  show: boolean;
}

const MySpinner: React.FunctionComponent<ISpinnerProps> = (props) => {
  return (
    <Box>
      <Spinner show={props.show} accessibilityLabel="Spinner" />
    </Box>
  );
};

export default observer(MySpinner);
