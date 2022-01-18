import React from "react";

interface IProps {}

const Reveal_Content_Test: React.FunctionComponent<IProps> = (props) => {
  return (
    <div className="reveal">
      <div className="slides">
        <section>Horizontal Slide</section>
        <section>
          <section>Vertical Slide 1</section>
          <section>Vertical Slide 2</section>
        </section>
      </div>
    </div>
  );
};

export default Reveal_Content_Test;
