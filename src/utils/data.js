import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import nodeFetch from "node-fetch";
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:3000/graphql",
  fetch: nodeFetch,
});
export const client = new ApolloClient({
  cache,
  link,
});
