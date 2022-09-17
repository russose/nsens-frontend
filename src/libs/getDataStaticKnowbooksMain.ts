import {
  configFetching,
  configGeneral,
  CONFIG_ENV,
} from "./../config/configLocalAndEnv";
import { GetStaticProps } from "next";
import {
  Tlanguage,
  configPaths,
  IStaticKnowbookWithItemsDefinition,
  IStaticKnowbookDefinition,
} from "../config/globals";
import { getDataParamsPage, IPage } from "./getDataParamsPage";
import { readFileJson } from "./utilsServer";

import sharp from "sharp";
import axios from "axios";

export interface IPageStaticKnowbooks extends IPage {
  staticKnowbooks: IStaticKnowbookDefinition[];
}

async function exportImageInWebp(
  url_image_source: string,
  path_destination_with_name: string
): Promise<void> {
  const input_image = (
    await axios({ url: url_image_source, responseType: "arraybuffer" })
  ).data as Buffer;

  await sharp(input_image)
    .resize({ width: Math.trunc(configFetching.width_image_thumbnail * 0.8) })
    .webp({ quality: 30, lossless: false })
    .toFile(path_destination_with_name);

  return;
}

//https://stackabuse.com/reading-and-writing-json-files-with-node-js/
async function getConfigDataGuiStaticKnowbooksMain(
  params: any
): Promise<IPageStaticKnowbooks> {
  const lang: Tlanguage = params.lang;
  const display = params.display;
  // const nameOrPeriod = params.nameOrPeriod;

  const static_path_base = configPaths.static.knowbooks_directory + lang + "/";

  let allStaticKnowbooks: IStaticKnowbookDefinition[];
  const name_allStaticKnowbooks =
    configGeneral.staticKnowbooks.name_allStaticKnowbooks;
  const allStaticKnowbooks_path_base = configPaths.static.knowbooks_directory;

  const data_staticKnowbooks: IStaticKnowbookDefinition[] = [];

  try {
    allStaticKnowbooks = (await readFileJson(
      allStaticKnowbooks_path_base,
      name_allStaticKnowbooks
    )) as IStaticKnowbookDefinition[];

    for (const staticKnowbooks of allStaticKnowbooks.filter(
      (staticKnowbook) => {
        return staticKnowbook.lang === lang;
      }
    )) {
      try {
        const staticKnowbook_with_items: IStaticKnowbookWithItemsDefinition =
          (await readFileJson(
            static_path_base,
            staticKnowbooks.nameOrPeriod + ".txt"
          )) as IStaticKnowbookWithItemsDefinition;

        const path_image_webp =
          static_path_base +
          "images/" +
          staticKnowbook_with_items.nameOrPeriod +
          ".webp";

        const url_image_webp =
          CONFIG_ENV.FRONT_URL + "/" + path_image_webp.replace("public/", "");

        if (configFetching.staticKnowbooks.refreshAllStaticKnowbooksImages) {
          await exportImageInWebp(
            staticKnowbook_with_items.items[
              configFetching.staticKnowbooks.image_offset
            ].image_url,
            path_image_webp
          );
          console.log("generating:", path_image_webp);
        }

        const data_staticKnowbook: IStaticKnowbookDefinition = {
          type: staticKnowbook_with_items.type,
          nameOrPeriod: staticKnowbook_with_items.nameOrPeriod,
          name_display: staticKnowbook_with_items.name_display,
          image_url: url_image_webp,
        };

        data_staticKnowbooks.push(data_staticKnowbook);
      } catch {
        console.log(
          "disk files not found for Static Knowbooks, you need to generate them. Or there is an error in webP images generation..."
        );
      }
    }

    const datapage: IPage = await getDataParamsPage({
      lang: lang,
      display: display,
    });

    const data: IPageStaticKnowbooks = {
      paramsPage: datapage.paramsPage,
      GUI_CONFIG: datapage.GUI_CONFIG,
      staticKnowbooks: data_staticKnowbooks,
    };

    return data;
  } catch {
    console.log(
      " =>",
      allStaticKnowbooks_path_base + name_allStaticKnowbooks,
      "not found..., generate it..."
    );
  }
}

//I_getStaticPaths is the same as getDataStaticKnowbooks.ts

export const I_getStaticProps: GetStaticProps = async (context) => {
  const data: IPageStaticKnowbooks = await getConfigDataGuiStaticKnowbooksMain(
    context.params
  );

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: data,
  };
};
