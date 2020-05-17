import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import fetch from "cross-fetch";

const cache = new InMemoryCache();

// Sapper provides this.fetch in the preloada functions for server-side rendering. It is useful to be able to pass that in.
export function createClient(fetch) {
  const link = new HttpLink(
    // TODO: test which credentials: "include" I can remove
    {
      uri: "http://localhost:3000/graphql",
      fetch: fetch,
      fetchOptions: {
        credentials: "include",
      },
      credentials: "include",
    }
  );
  return new ApolloClient({
    cache,
    link,
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    },
    credentials: "include",
  });
}

export const client = createClient(fetch);
