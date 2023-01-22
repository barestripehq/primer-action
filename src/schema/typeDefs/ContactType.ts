import { gql } from "apollo-server-express";

// This Contact type has nine fields
export const ContactType = gql`
  type Contact {
    id: ID,
    contactId: String!,
    first_name: String!,
    last_name: String!,
    email: String!,
    phone_number: String!,
    organization: String!,
    country: String!,
    message: String!,
    isRead: Boolean!,
    created_at: String!,
  }

  type Query {
    contacts: [Contact!]!
    contact(id: ID!): Contact!
  }

  type Mutation {
    addContact(input: addContactInput!): Contact!
    updateContact(input: UpdateContactInput!): Contact!
    deleteContact(id: ID!): String!
  }

  input addContactInput {
    contactId: String!,
    first_name: String!,
    last_name: String!,
    email: String!,
    phone_number: String!,
    organization: String!,
    country: String!,
    message: String!,
    isRead: Boolean!,
    created_at: String!,
  }
  input UpdateContactInput {
    contactId: String!,
    first_name: String!,
    last_name: String!,
    email: String!,
    phone_number: String!,
    organization: String!,
    country: String!,
    message: String!,
    isRead: Boolean!,
    created_at: String!,
  }
`;

export default ContactType;