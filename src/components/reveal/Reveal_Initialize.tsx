import React, { useEffect } from "react";

import Reveal from "reveal.js";
// import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/reset.css";
import "reveal.js/dist/theme/sky.css";

interface IProps {
  config: object;
}

function initialize(config: object): void {
  try {
    const deck = new Reveal({
      // plugins: [Markdown],
    });
    deck.initialize(config);
  } catch {
    // console.log("error in reveal initialize");
  }
}

const Reveal_Initialize: React.FunctionComponent<IProps> = (props) => {
  useEffect(() => {
    // Anything in here is fired on component mount.
    // console.log("Reveal_Initialize mounted");
    initialize(props.config);
    return () => {
      // Anything in here is fired on component unmount.
      // console.log("Reveal_Initialize unmounted");
    };
  }, []);

  return <></>;
};

export default Reveal_Initialize;
