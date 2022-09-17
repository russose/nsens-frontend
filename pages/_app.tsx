import "gestalt/dist/gestalt.css";
import "../styles.css";
import { enableStaticRendering, observer } from "mobx-react-lite";
import { AppProps } from "next/app";
import React from "react";
import { ContextStores } from "../src/stores/RootStoreHook";
import rootStore from "../src/stores/RootStore";
import { configure } from "mobx";
import Head from "next/head";

// enable MobX strict mode
// configure({ enforceActions: "observed" });
// to be activated and debugged, important for performances
configure({
  enforceActions: "always",
  // computedRequiresReaction: true,
  // reactionRequiresObservable: true,
  // observableRequiresReaction: true,
  // disableErrorBoundaries: true,
});

if (
  !new (class {
    x: any;
  })().hasOwnProperty("x")
)
  throw new Error("Transpiler is not configured correctly");

function MyApp({ Component, pageProps }: AppProps) {
  //MobX
  const isServer = typeof window === "undefined";
  enableStaticRendering(isServer);
  //MobX

  return (
    <>
      <Head>
        {/* <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        /> */}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
      </Head>
      <ContextStores.Provider value={{ rootStore: rootStore }}>
        <Component {...pageProps} />
      </ContextStores.Provider>
    </>
  );
}

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   // console.log(metric.name, metric.value);
//   if (metric.label === "web-vital") {
//     console.log(metric.name, metric.value); // The metric object ({ id, name, startTime, value, label }) is logged to the console
//   }
//   if (metric.label === "custom") {
//     console.log(metric.name, metric.value); // The metric object ({ id, name, startTime, value, label }) is logged to the console
//   }
// }

export default observer(MyApp);
