import React from "react";

import Reveal from "reveal.js";
// import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/reset.css";
import "reveal.js/dist/theme/sky.css";

interface IProps {
  // content: any;
}

const Reveal_Initialize: React.FunctionComponent<IProps> = (props) => {
  const deck = new Reveal({
    // plugins: [Markdown],
  });
  deck.initialize({});

  console.log(deck.getComputedSlideSize());

  return <></>;
};

export default Reveal_Initialize;
