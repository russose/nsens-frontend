import { LinkProvidedProps } from "@visx/network/lib/types";
import { LinkVerticalLine } from "@visx/shape";
import { Text } from "@visx/text";
import { observer } from "mobx-react-lite";
import { group_name } from "../../stores/GraphStore";

const black = "#000000";

const NetworkLinkWithLabel: React.FunctionComponent<LinkProvidedProps<any>> = (
  props
) => {
  const link_label = props.link.target.relation_name;
  const displayCondition =
    props.link.target.relation_name !== group_name &&
    props.link.target.relation_name !== "";
  let x = 0;
  let y = 0;

  if (
    isNaN(props.link.source.x) ||
    isNaN(props.link.source.y) ||
    isNaN(props.link.target.x) ||
    isNaN(props.link.target.y)
  ) {
    const a =
      (props.link.source.y - props.link.target.y) /
      (props.link.source.x - props.link.target.x);
    // const X = (props.link.source.x + props.link.target.x) * 0.5;
    // const Y = (props.link.source.y + props.link.target.y) * 0.5;
    const ecart_t = 0.65;
    x =
      (props.link.target.x - props.link.source.x) * ecart_t +
      props.link.source.x;
    y = a * (x - props.link.target.x) + props.link.target.y;
  }

  const X = (props.link.source.x + props.link.target.x) * 0.5;
  const Y = (props.link.source.y + props.link.target.y) * 0.5;
  // x = props.link.target.x;
  // y = props.link.target.y;

  const Label = displayCondition && (
    <Text textAnchor="middle" dy={Y} dx={X} fontSize={12}>
      {link_label}
    </Text>
  );

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
      {Label}
    </svg>
  );
};

export default observer(NetworkLinkWithLabel);
