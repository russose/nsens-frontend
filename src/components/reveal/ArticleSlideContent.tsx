import React from "react";
import { observer } from "mobx-react-lite";
import { IStores } from "../../stores/RootStore";
import { ArticlesSlideSeparator, TUiStringStorage } from "../../config/globals";
import { prepareArticle } from "../../libs/utils";

interface IArticleProps {
  stores: IStores;
}

const ArticleSlideContent: React.FunctionComponent<IArticleProps> = (props) => {
  const articles_merged_ = props.stores.uiStore.getUiStringStorage(
    TUiStringStorage.articleContent
  );
  const articles_splitted = articles_merged_
    .split(ArticlesSlideSeparator)
    .slice(1);
  const space = "<br>".repeat(30);
  const content = articles_splitted.map((article: string, id) => {
    return (
      <section key={`ArticleSlideContent-section-${id}`}>
        <iframe
          key={`ArticleSlideContent-iframe-${id}`}
          srcDoc={prepareArticle(article) + space}
          sandbox="allow-scripts" //DANGEROUS BUT NECESSARY FOR SCRIPTS
          frameBorder={0}
          marginWidth={0}
          marginHeight={0}
          // height="98%"
          height={props.stores.baseStore.screen.height}
          width="100%"
        />
      </section>
    );
  });

  return (
    <div className="reveal">
      <div className="slides">{content}</div>
    </div>
  );
};

export default observer(ArticleSlideContent);
