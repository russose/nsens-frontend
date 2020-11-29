import { LinkProvidedProps } from "@visx/network/lib/types";
import { LinkVerticalLine } from "@visx/shape";

const black = "#000000";

const NetworkLink: React.FunctionComponent<LinkProvidedProps<any>> = (
  props
) => {
  return (
    <svg>
      {/* <LinkVerticalCurve<Node, Node>
        data={props.link}
        stroke={black}
        strokeWidth="2"
        strokeOpacity={0.9}
        fill="none"
      /> */}
      <LinkVerticalLine<Node, Node>
        data={props.link}
        stroke={black}
        strokeWidth="2"
        strokeOpacity={0.9}
        fill="none"
      />
    </svg>
  );
};

export default NetworkLink;
