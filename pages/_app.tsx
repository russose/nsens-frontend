import { AppProps } from "next/app";
import "../styles.css";
import "gestalt/dist/gestalt.css";
import { configure } from "mobx";
import DefaultLayout from "../src/components/layout/DefaultLayout";
import { enableStaticRendering } from "mobx-react-lite";
import { ContextStores } from "../src/stores/_RootStoreHook";
import rootStore from "../src/stores/_RootStore";

// enable MobX strict mode
configure({ enforceActions: "observed" });

// export const rootStore: RootStore = new RootStore();

function MyApp({ Component, pageProps }: AppProps) {
  //MobX
  const isServer = typeof window === "undefined";
  enableStaticRendering(isServer);

  return (
    <ContextStores.Provider value={{ rootStore: rootStore }}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </ContextStores.Provider>
  );
}

export default MyApp;
