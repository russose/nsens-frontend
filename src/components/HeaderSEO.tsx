import React from "react";
import { Tlanguage, CONFIG_ENV } from "../config/globals";
import { IStores } from "../stores/RootStore";
import Head from "next/head";
import { useRouter } from "next/router";

interface IHeaderTitleProps {
  stores: IStores;
  title: string;
}

const HeaderSEO: React.FunctionComponent<IHeaderTitleProps> = (props) => {
  const router = useRouter();
  const path_full = router.asPath;

  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  let title_page = GUI_CONFIG.language.SEO.title_page_base;
  if (props.title !== "") {
    title_page = props.title + " | " + title_page;
  }

  let description = GUI_CONFIG.language.SEO.description_page_base;
  // Object.values(GUI_CONFIG.language.about.features).forEach(
  //   (item: JSONDataT) => {
  //     description = description + " - " + item.description;
  //   }
  // );

  // console.log(description);

  function alternate_links(): any[] {
    const alternate = Object.values(Tlanguage).map(
      (language: Tlanguage, key) => {
        return (
          <link
            key={`link-alternate-${path_full}-${key}`}
            rel="alternate"
            hrefLang={language}
            href={
              CONFIG_ENV.FRONT_URL + "/" + language + path_full.substring(3)
            }
          />
        );
      }
    );

    alternate.push(
      <link
        key={`link-alternate-default-${path_full}`}
        rel="alternate"
        hrefLang="x-default"
        href={
          CONFIG_ENV.FRONT_URL + "/" + Tlanguage.en + path_full.substring(3)
        }
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

  return <>{head}</>;
};

export default HeaderSEO;
