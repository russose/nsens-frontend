import "gestalt/dist/gestalt.css";
import "../styles.css";
import { configure } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { AppProps } from "next/app";
import React from "react";
import rootStore from "../src/stores/_RootStore";
import { ContextStores } from "../src/stores/_RootStoreHook";

// enable MobX strict mode
configure({ enforceActions: "observed" });

function MyApp({ Component, pageProps }: AppProps) {
  //MobX
  const isServer = typeof window === "undefined";
  enableStaticRendering(isServer);
  //MobX

  return (
    <>
      <ContextStores.Provider value={{ rootStore: rootStore }}>
        <Component {...pageProps} />
      </ContextStores.Provider>
    </>
  );
}

export default MyApp;
