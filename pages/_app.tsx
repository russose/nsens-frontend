import "gestalt/dist/gestalt.css";
import { configure } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { AppProps } from "next/app";
import Head from "next/head";
import PageLayout from "../src/components/layout/PageLayout";
import rootStore from "../src/stores/_RootStore";
import { ContextStores } from "../src/stores/_RootStoreHook";
import "../styles.css";

// enable MobX strict mode
configure({ enforceActions: "observed" });

const head = (
  <Head>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicon/apple-touch-icon.png"
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
      sizes="16x16"
      href="/favicon/favicon-16x16.png"
    />
    <link rel="manifest" href="/favicon/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/favicon/safari-pinned-tab.svg"
      color="#5bbad5"
    />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />
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
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ContextStores.Provider>
    </>
  );
}

export default MyApp;
