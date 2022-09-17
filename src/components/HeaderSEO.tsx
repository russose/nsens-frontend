import React from "react";
import { Tlanguage, CONFIG_ENV } from "../config/globals";
import { IStores } from "../stores/RootStore";
import Head from "next/head";
import { useRouter } from "next/router";
import HeaderTitle from "./HeaderTitle";

interface IHeaderTitleProps {
  stores: IStores;
  title: string;
  additional_description?: string;
}

const HeaderSEO: React.FunctionComponent<IHeaderTitleProps> = (props) => {
  const router = useRouter();
  const path_full = router.asPath;

  const GUI_CONFIG = props.stores.baseStore.GUI_CONFIG;
  let title_page = GUI_CONFIG.language.SEO.title_page_base;
  if (props.title !== "") {
    title_page = props.title + " | " + title_page;
  }

  let description =
    title_page + " - " + GUI_CONFIG.language.SEO.description_page_base;

  if (props.additional_description !== undefined) {
    description = description + " | " + props.additional_description;
  }
  // if (router.pathname.includes(configPaths.pages.StaticKnowbook)) {
  //   const staticKnowbookID = router.query.nameOrPeriod as string;
  //   getKnowbookStaticAtomsList(staticKnowbookID, props.stores).forEach(
  //     (item) => {
  //       description = description + " | " + item.title;
  //     }
  //   );
  // }

  // if (router.pathname.includes(configPaths.pages.Knowbooks)) {
  //   const staticKnowbookIDList: string[] = Array.from(
  //     props.stores.knowbookStore.staticKnowbooks.keys()
  //   );
  //   staticKnowbookIDList.forEach((staticKnowbookID) => {
  //     description = description + " | " + staticKnowbookID;
  //   });
  // }

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
    <>
      <Head>
        {/* <link rel="canonical" href={canonical} /> */}
        <title>{title_page}</title>
        <meta name="description" content={description} />
        {alternate_links()}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Salvatore Russo" />
      </Head>
      <HeaderTitle stores={props.stores} title={title_page} hidden={true} />
    </>
  );

  return <>{head}</>;
};

export default HeaderSEO;
