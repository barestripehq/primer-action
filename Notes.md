Data Types
- Blogs
- Careers
- Demos
- Messages

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
// import typeDefs from './schema/typeDefs/index';
// import { resolvers } from './schema/resolvers/index';
import schema from "./schema/index";
import typeDefs from "./schema/typeDefs/index";
import resolvers from "./schema/resolvers/index";
console.log(typeDefs)
import http from 'http';

import path from 'path';
import cors from 'cors';
// import * as graphqlHTTP from 'express-graphql';
// import { graphqlUploadExpress, } from 'graphql-upload';
// import { schema } from "./graphql/schema";
// import { db } from "./database";

// const app: Application = express();
// app.use(cors());
// app.use(express.json());

// declare global {
//   var dirname: string;
// }

// Assignement works fine now
// https://marcinbiernat.pl/2020/03/nodejs-globals/
// global.dirname = path.join(__dirname);
const  startApolloServer = async (typeDefs: any, resolvers: any) => {
  // Required logic for integrating with Express
  const app = express();
  // app.use(cors());
  // app.use(express.json());
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  // More required logic for integrating with Express
  // const app: Application = express();
  app.use(cors());
  app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));
  await server.start();
  server.applyMiddleware({
    app,
    // cors: corsOptions,
    path: "/graphql",
  });
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')))

// app.use(
//   "/graphql",
//   graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
//   graphqlHTTP.graphqlHTTP({
//     schema,
//     graphiql: true,
//     context: { db },
//   }),
// );

// Set up port and start the server
// app.listen( process.env.PORT, () => {
//   console.log(`Server running at:`);
//   console.log(`- Local: http://localhost:${process.env.PORT}/graphql`);
//   console.log(`- Network: http://000.000.0.000:${process.env.PORT}/graphql`);
// });

// export default app;

startApolloServer(typeDefs, resolvers).catch((err) => console.error(err));

"scripts": {
  "start": "node 'dist/server.js'",
  "build": "tsc -p . && ncp src/schema dist/schema",
  "start:dev": "npm run build:dev",
  "build:dev": "nodemon 'src/server.ts' --exec 'ts-node' src/server.ts -e ts,graphql"
}

# mutation addBlog($input: CreateBlogInput!) {
#   addBlog(input: $input) {
#     id
#     title
#     content
#     photoURL
#     created_at
#     updated_at
#     published_at
#     isPublished
#   }
# }
query getBlogs {
  getBlogs {
    id
    title
    content
    photoURL
    created_at
    updated_at
    published_at
    isPublished
  }
}

{
  "input": {
    "title": "This is a test",
    "content": "Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus.",
    "photoURL": "photoURL",
    "created_at": "177718530000",
    "updated_at": "177718530000",
    "published_at": "177718530000",
    "isPublished": true,
  },
}

### Develop Resources
- https://github.com/thmsgbrt/nodejs-typescript-express-apollo-graphql-starter
- https://github.com/meshboy/recipe
- https://blog.logrocket.com/demonstration-on-how-to-use-graphql-with-node-and-vue-in-bits-8981f0d65f94/
- https://github.com/g00glen00b/apollo-express-vue-example
- https://github.com/shoNagai/apollo-server-with-firestore/tree/b0bdb1006023103d08b7ce3c0d198a219ef4acb0
- https://github.com/shoNagai/apollo-server-with-firestore
- https://github.com/search?l=TypeScript&q=FirestoreDataSource&type=Code

### Deploy Resources
- https://cloud.google.com/appengine/docs/standard/nodejs/runtime
- https://github.com/jharrilim/app-engine-typescript
- https://www.codingdeft.com/posts/react-deploy-google-cloud-app-engine/