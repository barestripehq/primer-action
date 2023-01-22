import { gql } from "apollo-server-express";

// This Subscription type has seven fields
export const SubscriptionType = gql`
  type Subscription {
    id: ID,
    subscriptionId: String!,
    email: String!,
    created_at: String!,
    updated_at: String!,
    isActive: Boolean!,
  }

  type Query {
    subscriptions: [Subscription!]!
    subscription(id: ID!): Subscription!
  }

  type Mutation {
    addSubscription(input: addSubscriptionInput!): Subscription!
    updateSubscription(input: UpdateSubscriptionInput!): Subscription!
    deleteSubscription(id: ID!): String!
  }

  input addSubscriptionInput {
    subscriptionId: String!,
    email: String!,
    created_at: String!,
    updated_at: String!,
    isActive: Boolean!,
  }
  input UpdateSubscriptionInput {
    subscriptionId: String!,
    email: String!,
    created_at: String!,
    updated_at: String!,
    isActive: Boolean!,
  }
`;

export default SubscriptionType;