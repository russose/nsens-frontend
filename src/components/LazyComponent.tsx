import React from "react";
import { observer } from "mobx-react-lite";
import { useInView } from "react-intersection-observer";
import { ICardSizes } from "./CardGeneric";
import { Box } from "gestalt";

interface Props {
  children: React.ReactNode;
  sizes: ICardSizes;
  topMargin: string;
  onChangeHandler?: any;
}

const LazyComponent: React.FunctionComponent<Props> = (props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: `0px 0px ${props.topMargin}px 0px`, //top, right, bottom, left

    // onChange: (inView) => {
    //   if (inView) {
    //     console.log("display:", inView);
    //   }
    // },
    onChange: (inView) => {
      if (inView) {
        if (props.onChangeHandler === undefined) {
          return;
        } else {
          props.onChangeHandler();
        }
      }
    },
  });

  return (
    <>
      <div
        ref={ref}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {inView ? (
          props.children
        ) : (
          <Box
            height={props.sizes.height}
            width={props.sizes.width}
            // color="education"
          ></Box>
        )}
      </div>
    </>
  );
};

export default observer(LazyComponent);
