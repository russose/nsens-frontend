import { readFile, writeFile } from "fs/promises";
import puppeteer from "puppeteer";
import {
  configGeneral,
  configPaths,
  CONFIG_ENV,
} from "../config/configLocalAndEnv";
import {
  IScenarioStep,
  IScreen,
  SCREENSHOTS_LIST,
  TDisplay,
  Tlanguage,
  TScenarioStepID,
} from "../config/globals";
import { pathScreenshots } from "./utils";

export async function readFileJson(
  pathBase: string,
  title: string
): Promise<object> {
  const title_ = title.replace(/\//g, "_");
  const rawdata = await readFile(pathBase + title_, "utf-8");
  const json = JSON.parse(rawdata);
  return json;
}

export async function writeFileJson(
  pathBase: string,
  title: string,
  data: object
) {
  const title_ = title.replace(/\//g, "_");
  const jsondata = JSON.stringify(data, null, 2);
  writeFile(pathBase + title_, jsondata, "utf8");
}

/*************** Screenshoots with Puppeteer ************************/

const scenarios: IScenarioStep[] = [
  {
    id: TScenarioStepID.home,
    url: configPaths.pages.Home,
    text: "",
  },
  {
    id: TScenarioStepID.knowbooks,
    url: configPaths.pages.Knowbooks,
    text: "",
    // additionnal_element: knowbookIcons,
  },
  {
    id: TScenarioStepID.knowbook,
    url: configPaths.pages.Knowbook + "?nameOrPeriod=Europe",
    text: "",
    // additionnal_element: knowbookIcons,
  },
  {
    id: TScenarioStepID.itemArticle,
    url:
      configPaths.pages.ItemCircle +
      "?title=Albert+Einstein&id=Q937&articleOpen=toto",
    text: "",
    // additionnal_element: topIcon,
  },
  {
    id: TScenarioStepID.search,
    url: configPaths.pages.Search + "?search=einstein",
    text: "",
  },
  {
    id: TScenarioStepID.itemCircle,
    url: configPaths.pages.ItemCircle + "?title=Albert+Einstein&id=Q937",
    text: "",
  },
  {
    id: TScenarioStepID.itemNetwork,
    url: configPaths.pages.ItemNetwork + "?title=Albert+Einstein&id=Q937",
    text: "",
  },
  // {
  //   id: TScenarioStepID.mostviewed,
  //   url:
  //     configPaths.pages.KnowbookSpecial +
  //     "?pageType=" +
  //     TSpecialPages.Mostviewed,
  //   text: "",
  // },
  // {
  //   id: TScenarioStepID.language,
  //   url: configPaths.pages.User,
  //   text: "",
  // },
];

async function makeOneScreenshoot(
  browser: any,
  screen: IScreen,
  url: string,
  pathFilename: string
): Promise<void> {
  const page = await browser.newPage();
  await page.setViewport({
    width: screen.width,
    height: screen.height,
  });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.screenshot({ path: pathFilename, omitBackground: true });
  console.log(pathFilename, "saved...");
}

export async function makeScreenshoots(): Promise<void> {
  if (!configGeneral.demoModeForScreenshoots) {
    return;
  }

  const rootPath = "public" + configPaths.screenshots;
  const rootUrl = CONFIG_ENV.FRONT_URL;
  const languages_list = Object.values(Tlanguage); //.slice(0, 1);
  const screen_l = [SCREENSHOTS_LIST.mobile, SCREENSHOTS_LIST.desktop];

  async function makeOneScreenshootIfNotPresent(
    screen: IScreen,
    language: Tlanguage,
    scenarioStep: IScenarioStep
  ): Promise<void> {
    const isMobile = screen.name === TDisplay.mobile;

    try {
      const rawdata = await readFile(
        pathScreenshots(rootPath, scenarioStep, isMobile, language),
        "utf-8"
      );
      console.log(
        "Screenshoot present: ",
        language,
        scenarioStep.id,
        screen.name
      );
      return;
    } catch (e) {
      console.log(
        "Generating screenshoot: ",
        language,
        scenarioStep.id,
        screen.name
      );

      //Write a placeholder to avoid simultanous generation
      await writeFile(
        pathScreenshots(rootPath, scenarioStep, isMobile, language),
        "work in progress",
        "utf8"
      );

      await makeOneScreenshoot(
        browser,
        screen,
        rootUrl + "/" + language + "/" + scenarioStep.url,
        pathScreenshots(rootPath, scenarioStep, isMobile, language)
      );
    }
  }

  const browser = await puppeteer.launch({
    headless: true,
  });

  for (const screen of screen_l) {
    for (const language of languages_list) {
      for (const scenarioStep of scenarios) {
        await makeOneScreenshootIfNotPresent(screen, language, scenarioStep);
      }
    }
  }

  console.log("All screenshoots saved!");
  await browser.close();
}
