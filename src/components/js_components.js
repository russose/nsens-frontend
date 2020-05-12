import { Text, Badge, Checkbox, Box } from "gestalt";

//Badge missing
export const JsBadge = (props) => {
  return <Badge {...props} />;
};

//Weight attribute missing
export const JsText = (props) => {
  return <Text {...props} />;
};

//Label attribute missing
export const JsCheckbox = (props) => {
  return <Checkbox {...props} />;
};

//Ref attribute missing
// export const JsBox = (props) => {
//   return <Box {...props} />;
// };
