import { gql } from "apollo-server-express";
import { BlogType } from "./BlogType";
import { CareerType } from "./CareerType";
import { ContactType } from "./ContactType";
import { DemoType } from "./DemoType";
import { UserType } from "./UserType";
import { SubscriptionType } from "./SubscriptionType";

const typeDefs = gql`${BlogType}${CareerType}${ContactType}${DemoType}${UserType}${SubscriptionType}`;

export default typeDefs;

export {
  BlogType,
  CareerType,
  DemoType,
  ContactType,
  UserType,
  SubscriptionType,
}