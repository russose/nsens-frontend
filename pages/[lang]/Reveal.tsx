import type { NextPage } from "next";
import React from "react";
import Reveal_Content_Test from "../../src/components/reveal/Reveal_Content_Test";
import Reveal_Presentation from "../../src/components/reveal/Reveal_Presentation";

const Reveal: NextPage = () => {
  return (
    <Reveal_Presentation>
      <Reveal_Content_Test />
    </Reveal_Presentation>
  );
};

export default Reveal;
