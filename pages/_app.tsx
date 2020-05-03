import { AppProps } from "next/app";
import "../styles.css";
import "gestalt/dist/gestalt.css";
import { ContextStores, RootStore } from "../src/states/_RootStore";
import { configure } from "mobx";
import "mobx-react-lite/batchingForReactDom";

import MobileDefaultLayout from "../src/components/layout/MobileDefaultLayout";
import MobileWithSearchLayout from "../src/components/layout/MobileWithSearchLayout";
import { NextPage } from "next";

// enable MobX strict mode
configure({ enforceActions: "observed" });

const rootStore: RootStore = new RootStore();

function MyApp({ Component, pageProps }: AppProps) {
  const getLayoutMobile =
    (Component as any).getLayoutMobile || ((page: NextPage) => <>{page}</>);

  return (
    <ContextStores.Provider value={{ rootStore: rootStore }}>
      <MobileDefaultLayout>
        {getLayoutMobile(<Component {...pageProps} />)}
      </MobileDefaultLayout>
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
