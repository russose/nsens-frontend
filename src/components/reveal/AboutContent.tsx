import React from "react";
import { configPaths } from "../../config/configLocalAndEnv";
import {
  IScenarioStep,
  TScenarioStepID,
  TSpecialPages,
} from "../../config/globals";
import { isMobile } from "../../libs/helpersBase";
import { isInstalled, pathScreenshots } from "../../libs/utils";
import { IStores } from "../../stores/RootStore";
import AboutTemplate from "./AboutTemplate";

interface IProps {
  stores: IStores;
}

export const scenarios: IScenarioStep[] = [
  {
    id: TScenarioStepID.search,
    url: configPaths.pages.Search + "?search=einstein",
    text: "",
  },
  {
    id: TScenarioStepID.knowbook,
    url: configPaths.pages.Knowbook + "?nameOrPeriod=Europe",
    text: "",
  },
  {
    id: TScenarioStepID.item,
    url: configPaths.pages.Item + "?title=Albert+Einstein&id=Q937",
    text: "",
  },
  {
    id: TScenarioStepID.itemArticle,
    url:
      configPaths.pages.Item +
      "?title=Albert+Einstein&id=Q937&articleOpen=toto",
    text: "",
  },
  {
    id: TScenarioStepID.mostviewed,
    url:
      configPaths.pages.KnowbookSpecial +
      "?pageType=" +
      TSpecialPages.Mostviewed,
    text: "",
  },
  {
    id: TScenarioStepID.language,
    url: configPaths.pages.User,
    text: "",
  },
  {
    id: TScenarioStepID.home,
    url: configPaths.pages.Home,
    text: "",
  },
];

const AboutContent: React.FunctionComponent<IProps> = (props) => {
  if (props.stores.baseStore.initCompleted.core !== true) {
    return <></>;
  }

  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const slogan = GUI_CONFIG.language.SEO.description_page_base;
  const path_image_main = configPaths.image_landing;

  const rootPath = configPaths.screenshots;

  const showInstall = !isInstalled() && isMobile(props.stores);

  const scenarios_with_text = scenarios.map((step) => {
    const step_ = step;
    step.text = GUI_CONFIG.language.about.scenario_texts[step.id];
    return step_;
  });

  const content = (
    <>
      <div className="reveal">
        <div className="slides">
          <section>
            <AboutTemplate
              stores={props.stores}
              image_path={path_image_main}
              text={slogan}
            />
          </section>
          {scenarios_with_text.map((step: IScenarioStep) => {
            return (
              <section key={"section" + step.id}>
                <AboutTemplate
                  key={"AboutTemplate" + step.id}
                  stores={props.stores}
                  image_path={pathScreenshots(
                    rootPath,
                    step,
                    isMobile(props.stores),
                    props.stores.baseStore.paramsPage.lang
                  )}
                  text={step.text}
                />
              </section>
            );
          })}
          {showInstall && (
            <section>
              <AboutTemplate
                stores={props.stores}
                image_path={configPaths.image_install}
                text={GUI_CONFIG.language.user.install_instructions}
              />
            </section>
          )}
        </div>
      </div>
    </>
  );

  return content;
};

export default AboutContent;
