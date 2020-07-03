import { AppProps } from "next/app";
import "../styles.css";
import "gestalt/dist/gestalt.css";
import { ContextStores, RootStore } from "../src/stores/_RootStore";
import { configure } from "mobx";
import "mobx-react-lite/batchingForReactDom";

import { NextPage } from "next";
import DefaultLayout from "../src/components/layout/DefaultLayout";

// enable MobX strict mode
configure({ enforceActions: "observed" });

const rootStore: RootStore = new RootStore();

function MyApp({ Component, pageProps }: AppProps) {
  const getLayoutMobile =
    (Component as any).getLayoutMobile || ((page: NextPage) => <>{page}</>);

  return (
    <ContextStores.Provider value={{ rootStore: rootStore }}>
      <DefaultLayout>
        {getLayoutMobile(<Component {...pageProps} />)}
      </DefaultLayout>
    </ContextStores.Provider>
  );
}

// MyApp.getInitialProps = async (appContext: any) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   const rootStore = initialyzeRootStore();

//   return { ...appProps };

// };

export default MyApp;
