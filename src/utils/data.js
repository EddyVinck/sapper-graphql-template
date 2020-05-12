import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import nodeFetch from "node-fetch";

const cache = new InMemoryCache();
const link = new HttpLink(
  // TODO: test which credentials: "include" I can remove
  {
    uri: "http://localhost:3000/graphql",
    fetch: nodeFetch,
    fetchOptions: {
      credentials: "include",
    },
    credentials: "include",
  }
);
export const client = new ApolloClient({
  cache,
  link,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
  credentials: "include",
});
