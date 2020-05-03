import { Box } from "gestalt";

interface IColoredContourProps {
  color_contour: string;
  color_inside: string;
  rounding: number;
}

export const ColoredContour: React.FunctionComponent<IColoredContourProps> = (
  props
) => {
  return (
    <Box
      color={props.color_contour as any}
      rounding={props.rounding as any}
      padding={1}
    >
      <Box
        color={props.color_inside as any}
        rounding={props.rounding as any}
        padding={1}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default ColoredContour;
