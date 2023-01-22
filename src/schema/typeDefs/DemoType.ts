import { gql } from "apollo-server-express";

// This Demo type has seven fields
export const DemoType = gql`
  type Demo {
    id: ID,
    demoId: String!,
    first_name: String!,
    last_name: String!,
    email: String!,
    phone_number: String!,
    created_at: String!,
    platform: String!,
  }

  type Query {
    demos: [Demo!]!
    demo(id: ID!): Demo!
  }

  type Mutation {
    addDemo(input: addDemoInput!): Demo!
    updateDemo(input: UpdateDemoInput!): Demo!
    deleteDemo(id: ID!): String!
  }

  input addDemoInput {
    demoId: String!,
    first_name: String!,
    last_name: String!,
    email: String!,
    phone_number: String!,
    created_at: String!,
    platform: String!,
  }
  input UpdateDemoInput {
    demoId: String!,
    first_name: String!,
    last_name: String!,
    email: String!,
    phone_number: String!,
    created_at: String!,
    platform: String!,
  }
`;

export default DemoType;