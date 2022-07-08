import "~/styles/reset.css";
import "~/styles/globals.scss";
import "~/styles/slick.scss";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/graphql/apolloClient";
import { AppProps } from "next/app";
import { init as sentryInit } from "../lib/sentry";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { pageview } from "../lib/gtag";
import PageLoading from "~/components/commons/PageLoading";
import { usePageLoadingStatus } from "~/lib/usePageLoadingStatus";
import PopupContextProvider from "~/components/Context/PopupContext";

sentryInit();

function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  const isLoading = usePageLoadingStatus();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ApolloProvider client={apolloClient}>
      <PopupContextProvider>
        <Component {...pageProps} />
        {isLoading && <PageLoading />}
      </PopupContextProvider>
    </ApolloProvider>
  );
}

export default App;
