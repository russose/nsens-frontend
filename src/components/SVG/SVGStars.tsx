import { observer } from "mobx-react-lite";
import React from "react";
import { stars } from "../../libs/utilsSVG";
import { IStores } from "../../stores/RootStore";

interface IProps {
  stores: IStores;
}

const SVGStars: React.FunctionComponent<IProps> = (props) => {
  if (props.stores.baseStore.screen === undefined) {
    return <></>;
  }

  const stars_ = stars(props.stores);

  const elements = stars_.map((star, index) => {
    return (
      <g key={`SVGStars${index}`}>
        <circle
          cx={`${star.position.x}`}
          cy={`${star.position.y}`}
          r="1"
          fill="white"
          opacity={star.opacity}
        />
      </g>
    );
  });

  return <>{elements}</>;
};
export default observer(SVGStars);
