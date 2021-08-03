import React from "react";
import { Box, Heading } from "gestalt";
import {
  ConfigLanguage,
  handlerT,
  JSONDataT,
  RoundingT,
  SizeT,
} from "../config/globals";
import { IStores } from "../stores/RootStore";
import Head from "next/head";
import { configGeneral } from "../config/globals";
import { useRouter } from "next/router";

interface IHeaderTitleProps {
  stores: IStores;
  title: string;
  hidden?: boolean;
}

const SEOHeaderTitle: React.FunctionComponent<IHeaderTitleProps> = (props) => {
  const router = useRouter();
  const path_full = router.asPath;

  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  const header_size: SizeT = GUI_CONFIG.display.header_size;
  const color_headers = configGeneral.colors.headers as handlerT;
  const rounding_menu: RoundingT = GUI_CONFIG.display.rounding_menu;
  let title_page = GUI_CONFIG.language.SEO.title_page_base;
  if (props.title !== undefined) {
    title_page = title_page + " - " + props.title;
  }

  // const description = GUI_CONFIG.language.landing.description;

  let description = "";
  Object.values(GUI_CONFIG.language.about.features).forEach(
    (item: JSONDataT) => {
      description = description + " " + item.description;
    }
  );

  function alternate_links(): any[] {
    const alternate = Object.values(ConfigLanguage).map(
      (language: ConfigLanguage, key) => {
        return (
          <link
            key={`link-alternate-${path_full}-${key}`}
            rel="alternate"
            hrefLang={language}
            href={"/" + language + path_full.substring(3)}
          />
        );
      }
    );

    alternate.push(
      <link
        key={`link-alternate-default-${path_full}`}
        rel="alternate"
        hrefLang="x-default"
        href={"/" + ConfigLanguage.en + path_full.substring(3)}
      />
    );

    return alternate;
  }

  const head = (
    <Head>
      {/* <link rel="canonical" href={canonical} /> */}
      <title>{title_page}</title>
      <meta name="description" content={description} />
      {alternate_links()}
      <meta name="robots" content="index, follow" />
    </Head>
  );

  const display_ =
    props.hidden === undefined || props.hidden === false ? "block" : "none";

  return (
    <>
      {head}
      <Box display={display_} width="100%">
        <Box padding={2}></Box>
        <Box
          display="flex"
          direction="column"
          flex="grow"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            column={10}
            smColumn={10}
            mdColumn={6}
            lgColumn={4}
            padding={2}
            // paddingX={5}
            // paddingY={2}
            color={color_headers}
            borderStyle="lg"
            alignItems="center"
            rounding={rounding_menu}
          >
            <Heading
              accessibilityLevel={1}
              size={header_size}
              align="center"
              overflow="normal"
            >
              {props.title}
            </Heading>
          </Box>
        </Box>
        <Box padding={1}></Box>
      </Box>
    </>
  );
};

export default SEOHeaderTitle;
