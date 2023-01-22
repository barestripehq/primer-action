import typeDefs from "./typeDefs/index";
import resolvers from "./resolvers/index";
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema'; 

const schema: GraphQLSchema = makeExecutableSchema({ 
  typeDefs, 
  resolvers,
}); 

export default schema;

export {
  typeDefs,
  resolvers,
}