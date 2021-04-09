import "gestalt/dist/gestalt.css";
import "../styles.css";
import { configure } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import rootStore from "../src/stores/_RootStore";
import { ContextStores } from "../src/stores/_RootStoreHook";
import { GUI_CONFIG } from "../src/common/configGUI";

// enable MobX strict mode
configure({ enforceActions: "observed" });

const description = GUI_CONFIG.language.landing.description;

const head = (
  <Head>
    <title>n.Sens</title>
    <meta name="description" content={description} />
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
