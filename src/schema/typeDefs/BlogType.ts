import { gql } from "apollo-server-express";

// This Blog type has seven fields
export const BlogType = gql`
  # A blog type has seven fields
  type Blog {
    id: ID,
    title: String!,
    content: String!,
    image_url: String!,
    image_source: String,
    created_at: String!,
    updated_at: String!,
    published_at: String!,
    isPublished: Boolean!,
    blogId: String!,
    userId: ID,
    tags: [String!],
  }

  type Query {
    blogs: [Blog!]!
    blog(id: ID!): Blog!
  }

  type Mutation {
    addBlog(input: CreateBlogInput!): Blog
    updateBlog(input: UpdateBlogInput!): Blog
    deleteBlog(id: ID!): Blog
  }

  input CreateBlogInput {
    blogId: String!,
    title: String!,
    content: String!,
    image_url: String!,
    image_source: String,
    created_at: String!,
    updated_at: String!,
    published_at: String!,
    isPublished: Boolean!,
    tags: [String!],
  }
  input UpdateBlogInput {
    blogId: String!,
    title: String!,
    content: String!,
    image_url: String!,
    image_source: String,
    updated_at: String!,
    published_at: String!,
    isPublished: Boolean!,
    tags: [String!],
  }

`;

export default BlogType;