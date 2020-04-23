import App, { AppProps } from "next/app";
import "../styles.css";
import "gestalt/dist/gestalt.css";
import { ContextStores, RootStore } from "../src/states/_RootStore";
import { configure } from "mobx";
import "mobx-react-lite/batchingForReactDom";

// enable MobX strict mode
configure({ enforceActions: "observed" });

function MyApp({ Component, pageProps }: AppProps) {
  const rootStore = new RootStore();
  return (
    <ContextStores.Provider value={{ rootStore: rootStore }}>
      <Component {...pageProps} />;
    </ContextStores.Provider>
  );
}

export default MyApp;
