import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    me: User
    posts: [Post]!
    user(id: ID!): User
    post(input: PostInput!): Post
  }
  type User {
    email: String!
    avatar: String!
    permissions: Permissions!
    posts: [Post]!
  }
  type Permissions {
    createPost: Boolean!
    editOwnPost: Boolean!
    editAnyPost: Boolean!
    deleteOwnPost: Boolean!
    deleteAnyPost: Boolean!
  }
  type Post {
    id: ID!
    title: String!
    slug: String!
    html: String!
    isFeatured: Boolean!
    author: User!
    isDeleted: Boolean!
  }
  input PostInput {
    id: ID
    slug: String
  }
`;
