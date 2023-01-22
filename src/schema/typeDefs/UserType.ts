import { gql } from "apollo-server-express";

// This User type has seven fields
export const UserType = gql`
  type User {
    id: ID,
    first_name: String!,
    last_name: String!,
    email: String!,
    phone_number: String!,
    created_at: Int!,
    updated_at: Int!,
    isAdmin: Boolean!,
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User!
  }

  type Mutation {
    addUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): User
  }

  input CreateUserInput {
    first_name: String!,
    last_name: String!,
    email: String!,
    phone_number: String!,
    created_at: Int!,
    updated_at: Int!,
    isAdmin: Boolean!,
  }
  input UpdateUserInput {
    first_name: String!,
    last_name: String!,
    email: String!,
    phone_number: String!,
    created_at: Int!,
    updated_at: Int!,
    isAdmin: Boolean!,
  }
`;

export default UserType;