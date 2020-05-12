import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import cors from "cors";
import { typeDefs, resolvers } from "./server/graphql";
import { ApolloServer } from "apollo-server-express";
import { connect, dbUrl } from "./server/db";
import { createSampleDataIfDbEmpty } from "./server/db/utils/createSampleData";
import { getUserFromReq } from "./server/utils/auth";
import { AuthenticationDirective } from "./server/graphql/directives";
import config from "config";
import session from "express-session";

const { PORT, NODE_ENV } = process.env;
const IS_DEV = NODE_ENV === "development";
const IS_PROD = NODE_ENV === "production";
const SESSION_SECRET = config.get("sessionSecret");

/**
 * ! currently working on:
 * Getting the cookies readable with SSR
 */

// TODO: learn if these settings are right for cors
const corsOptions = {
  origin: "*",
  credentials: true,
};
// all the data is stored in the cookie with the specified name
// you can then access it with req.session.jwt in the code.
const sessionOptions = {
  name: "qid", // this is the cookie name in the devtools
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: IS_PROD,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
};

const startServer = async () => {
  const app = polka(); // You can also use Express

  app.use(cors(corsOptions));
  app.use(session(sessionOptions));

  // Database
  let databaseConnection;
  try {
    databaseConnection = await connect(dbUrl);
    console.log("✔ Database connected!");
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
      console.log("🍪 context function 🍪");
      console.log({ jwt: req.session.jwt });

      const context = { req, res, db: null, user: null };

      context.db = databaseConnection;
      const user = await getUserFromReq(req);
      context.user = user;

      return context;
    },
  });
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: true,
  });

  // Server
  app
    .use(
      compression({ threshold: 0 }),
      sirv("static", { dev: IS_DEV }),
      (req, res, next) => {
        if (req.session.jwt) {
          console.log({ middlewareJwt: req.session.jwt });
        }
        next();
      },
      sapper.middleware({ ignore: "/graphql" })
    )
    .listen(PORT, (err) => {
      if (err) console.log("error", err);
    });
};

startServer();
