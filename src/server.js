import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import chalk from "chalk";
import { typeDefs, resolvers } from "./server/graphql";
import { ApolloServer } from "apollo-server-express";
import { connect, dbUrl } from "./server/db";
import { createSampleDataIfDbEmpty } from "./server/db/utils/createSampleData";
import { getUserFromReqHeaders } from "./server/utils/auth";
import { AuthenticationDirective } from "./server/graphql/directives";

const { PORT, NODE_ENV } = process.env;
const IS_DEV = NODE_ENV === "development";

const startServer = async () => {
  const app = polka(); // You can also use Express

  // Database
  let databaseConnection;
  try {
    databaseConnection = await connect(dbUrl);
    console.log(chalk.green("✔ Database connected!"));
  } catch (error) {
    console.error("❌ could not connect to database.");
    console.error("Reason: " + error);
  }

  if (IS_DEV && databaseConnection) {
    createSampleDataIfDbEmpty();
  }

  // GraphQL
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
      signin: AuthenticationDirective,
    },
    context: async ({ req, res }) => {
      const context = { ...req, ...res, db: null, user: null };
      if (databaseConnection) {
        context.db = databaseConnection;
        const user = await getUserFromReqHeaders(req.headers);
        context.user = user;
      }
      return context;
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
