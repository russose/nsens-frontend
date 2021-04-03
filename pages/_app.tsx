import "gestalt/dist/gestalt.css";
import "../styles.css";
import { configure } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import rootStore from "../src/stores/_RootStore";
import { ContextStores } from "../src/stores/_RootStoreHook";

// enable MobX strict mode
configure({ enforceActions: "observed" });

const head = (
  <Head>
    <title>n.Sens</title>
    <meta
      name="description"
      content="Trouver des cartes de connaissance de façon ludique et visuelle - Comprendre grâce à l'information libre de la Wikipédia - Rassembler ses cartes de connaissance dans des carnets personnalisés - Etendre ses découvertes grâce aux cartes suggérées"
    />

    <link
      rel="apple-touch-icon"
      sizes="57x57"
      href="/favicon/apple-icon-57x57.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="60x60"
      href="/favicon/apple-icon-60x60.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="72x72"
      href="/favicon/apple-icon-72x72.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="76x76"
      href="/favicon/apple-icon-76x76.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="114x114"
      href="/favicon/apple-icon-114x114.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="120x120"
      href="/favicon/apple-icon-120x120.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="144x144"
      href="/favicon/apple-icon-144x144.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/favicon/apple-icon-152x152.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicon/apple-icon-180x180.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/favicon/android-icon-192x192.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/favicon/favicon-96x96.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon/favicon-16x16.png"
    />
    <link rel="manifest" href="/manifest.json" />
    {/* <meta name="msapplication-TileColor" content="#ffffff" /> */}
    {/* <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" /> */}
    {/* <meta name="theme-color" content="#ffffff"></meta> */}
  </Head>
);

function MyApp({ Component, pageProps }: AppProps) {
  //MobX
  const isServer = typeof window === "undefined";
  enableStaticRendering(isServer);
  //MobX

  return (
    <>
      {head}
      <ContextStores.Provider value={{ rootStore: rootStore }}>
        <Component {...pageProps} />
      </ContextStores.Provider>
    </>
  );
}

export default MyApp;
