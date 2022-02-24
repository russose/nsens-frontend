import React, { useEffect } from "react";

import Reveal from "reveal.js";
// import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/reset.css";
import "reveal.js/dist/theme/sky.css";

interface IProps {}

function initialize(): void {
  try {
    const deck = new Reveal({
      // plugins: [Markdown],
    });
    deck.initialize({
      embedded: true,
      disableLayout: true,
      overview: false,
      loop: true,
      autoSlide: 10000,
    });
  } catch {
    // console.log("error in reveal initialize");
  }
}

const Reveal_Initialize: React.FunctionComponent<IProps> = (props) => {
  useEffect(() => {
    // Anything in here is fired on component mount.
    // console.log("Reveal_Initialize mounted");
    initialize();
    return () => {
      // Anything in here is fired on component unmount.
      // console.log("Reveal_Initialize unmounted");
    };
  }, []);

  return <></>;
};

export default Reveal_Initialize;
