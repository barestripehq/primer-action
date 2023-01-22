import { mergeResolvers } from '@graphql-tools/merge';
// import * as typeDefs from './schema.graphql';
import BlogResolver from "./BlogResolver";
import CareerResolver from "./CareerResolver";
import ContactResolver from "./ContactResolver";
import DemoResolver from "./DemoResolver";
import UserResolver from "./UserResolver";
import SubscriptionResolver from "./SubscriptionResolver";

const resolvers = [BlogResolver, CareerResolver, ContactResolver, DemoResolver, UserResolver, SubscriptionResolver];

export default mergeResolvers(resolvers);
// export {
//   BlogResolver,
//   CareerType,
//   DemoType,
//   ContactType,
//   UserType,
// }