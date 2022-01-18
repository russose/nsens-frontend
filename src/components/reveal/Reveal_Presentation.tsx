import React from "react";
import dynamic from "next/dynamic";

const Reveal_Initialize = dynamic(() => import("./Reveal_Initialize"), {
  ssr: false,
});

interface IProps {
  height?: string;
}

const Reveal_Presentation: React.FunctionComponent<IProps> = (props) => {
  const height = props.height === undefined ? "100vh" : props.height;
  return (
    <>
      <div style={{ height: height }}>
        <Reveal_Initialize />
        {props.children}
      </div>
    </>
  );
};

export default Reveal_Presentation;
