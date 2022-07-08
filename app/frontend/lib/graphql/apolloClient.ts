// 参考
// https://github.com/vercel/next.js/tree/canary/examples/with-apollo

import { useMemo } from "react";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { from } from "apollo-link";
import { createFragmentArgumentLink } from "apollo-link-fragment-argument";
import { mergeDeep, relayStylePagination } from "@apollo/client/utilities";
import { isSSR } from "~/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any -- キャッシュの型を事前に決められないため */
type CacheState = Record<string, any> | null;
/* eslint-enable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/naming-convention -- GraphQLのタイプ名 (このconventionに従わない)を指定したいので */
const createCache = () =>
  new InMemoryCache({
    typePolicies: {
      Mansion: {
        keyFields: ["uniqueCode"],
        fields: {
          salesHistories: relayStylePagination(),
        },
      },
    },
  });
/* eslint-enable @typescript-eslint/naming-convention */

const link = from([
  createFragmentArgumentLink(),
  createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_CORE_API_URL}/consumer/graphql`,
    fetchOptions: {
      mode: "cors",
    },
  }),
]);

function createApolloClient() {
  return new ApolloClient({
    ssrMode: isSSR(),
    // See: https://github.com/apollographql/apollo-link/issues/1258#issuecomment-604031488
    // TODO: @apollo/clientバージョン上げたら直るかも
    link: (link as unknown) as ApolloLink,
    cache: createCache(),
    defaultOptions: {
      watchQuery: {
        // SSR時にuseQueryによってリクエストしてレンダリングする場合、
        // getServerSidePropsからキャッシュが渡っている必要がある。(でないと描画されない)
        // そのため、SSR時は常にcacheから取得されるべきで、実装意図を明確にするためPolicyも設定しておく
        // (エラーになるわけではない)
        fetchPolicy: isSSR() ? "cache-only" : "cache-first",
      },
    },
  });
}

let apolloClient: ReturnType<typeof createApolloClient>;

export function initializeApollo(
  initialState: CacheState = null
): ApolloClient<CacheState> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = mergeDeep(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (isSSR()) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: CacheState): ApolloClient<CacheState> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
