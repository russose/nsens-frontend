import "gestalt/dist/gestalt.css";
import "../styles.css";
import { configure } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { AppProps } from "next/app";
import React from "react";
import { ContextStores } from "../src/stores/RootStoreHook";
import rootStore from "../src/stores/RootStore";
import Head from "next/head";
import { MediaContextProvider } from "../src/config/media";

// enable MobX strict mode
configure({ enforceActions: "observed" });

function MyApp({ Component, pageProps }: AppProps) {
  //MobX
  const isServer = typeof window === "undefined";
  enableStaticRendering(isServer);
  //MobX

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>
      <MediaContextProvider>
        <ContextStores.Provider value={{ rootStore: rootStore }}>
          <Component {...pageProps} />
        </ContextStores.Provider>
      </MediaContextProvider>
    </>
  );
}

export default MyApp;
