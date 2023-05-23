import "reflect-metadata";
import http from "http";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { env } from "./env";
import { initializeDatabase } from "./db";

import { CountryResolver } from "./resolvers/CountryResolver";

const start = async (): Promise<void> => {
  await initializeDatabase();

  const app = express();
  const httpServer = http.createServer(app);

  app.use(cors());

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  // https://www.apollographql.com/docs/apollo-server/v3/integrations/middleware#apollo-server-express
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    // https://www.apollographql.com/docs/apollo-server/v3/security/authentication/#putting-authenticated-user-info-on-the-context
    context: ({ req, res }) => {
      return { req, res };
    },
  });

  await server.start();
  server.applyMiddleware({ app, cors: false, path: "/" });
  httpServer.listen({ port: env.SERVER_PORT }, () =>
    console.log(
      `🚀 Server ready at ${env.SERVER_HOST}:${env.SERVER_PORT}${server.graphqlPath}`
    )
  );
};

void start();
