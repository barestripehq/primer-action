import { gql } from "apollo-server-express";

// This Career type has nine fields
export const CareerType = gql`
  type Career {
    id: ID,
    title: String!,
    description: String!,
    photoURL: String!,    
    created_at: Int!,
    updated_at: Int!,
    published_at: Int!,
    expired_at: Int!,
    isPublished: Boolean!,
    isExpired: Boolean!,
    userId: ID,
  }

  type Query {
    getCareers: [Career!]!
    getCareer(id: ID!): Career!
  }

  type Mutation {
    addCareer(input: CreateCareerInput!): Career
    updateCareer(input: UpdateCareerInput!): Career
    deleteCareer(id: ID!): Career
  }

  input CreateCareerInput {
    title: String!,
    description: String!,
    photoURL: String!,    
    created_at: Int!,
    updated_at: Int!,
    published_at: Int!,
    expired_at: Int!,
    isPublished: Boolean!,
    isExpired: Boolean!,
    userId: ID,
  }
  input UpdateCareerInput {
    title: String!,
    description: String!,
    photoURL: String!,    
    created_at: Int!,
    updated_at: Int!,
    published_at: Int!,
    expired_at: Int!,
    isPublished: Boolean!,
    isExpired: Boolean!,
    userId: ID,
  }
`;

export default CareerType;