import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
// import schema from "./schema/index";
import typeDefs from "./schema/typeDefs/index";
import resolvers from "./schema/resolvers/index";
// import { v4 as uuidv4 } from 'uuid';
// console.log(uuidv4())

const  startApolloServer = async (typeDefs: any, resolvers: any) => {
  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // dataSources: () => {
    //   return {
    //     firestore: new FireSource({
    //       projectId: <Firestore-project-id>
    //       // ... other options
    //     }),
    //   };
    // },
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  // More required logic for integrating with Express
  // const app: Application = express(); cors: {credentials: true, origin: true}
  app.use(cors());
  app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));
  app.get("/healthz", (_req, res) => res.send("We are live 🚀"));
  // app.use('/', (_req, res, _next) => res.status(200).send('Hello Google App Engine'));
  await server.start();
  server.applyMiddleware({
    app,
    // cors: corsOptions,
    path: "/graphql",
  });
  await new Promise<void>(resolve => httpServer.listen({ port: 8080 }, resolve));
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers).catch((err) => console.error(err));