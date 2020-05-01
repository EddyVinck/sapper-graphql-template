import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import { typeDefs, resolvers } from "./server/graphql";
import { ApolloServer } from "apollo-server-express";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const startServer = async () => {
  const app = polka(); // You can also use Express
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app, path: "/graphql" });

  app
    .use(
      compression({ threshold: 0 }),
      sirv("static", { dev }),
      sapper.middleware({ ignore: "/graphql" })
    )
    .listen(PORT, (err) => {
      if (err) console.log("error", err);
    });
};

startServer();
