import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import chalk from "chalk";
import { typeDefs, resolvers } from "./server/graphql";
import { ApolloServer } from "apollo-server-express";
import { connect, dbUrl } from "./server/db";
import { createSampleDataIfDbEmpty } from "./server/db/utils/createSampleData";

const { PORT, NODE_ENV } = process.env;
const IS_DEV = NODE_ENV === "development";

const startServer = async () => {
  const app = polka(); // You can also use Express

  // Database
  let connection;
  try {
    connection = await connect(dbUrl);
    console.log(chalk.green("✔ Database connected!"));
  } catch (error) {
    console.error("❌ could not connect to database.");
    console.error("Reason: " + error);
  }

  if (IS_DEV && connection) {
    createSampleDataIfDbEmpty();
  }

  // GraphQL
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      return { req, res, db: connection };
    },
  });
  server.applyMiddleware({ app, path: "/graphql" });

  // Server
  app
    .use(
      compression({ threshold: 0 }),
      sirv("static", { dev: IS_DEV }),
      sapper.middleware({ ignore: "/graphql" })
    )
    .listen(PORT, (err) => {
      if (err) console.log("error", err);
    });
};

startServer();
