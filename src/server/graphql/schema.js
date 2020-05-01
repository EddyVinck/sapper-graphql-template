import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    me: User
    posts: [Post]!
    post(input: PostInput!): Post
  }
  type User {
    email: String!
    avatar: String!
  }
  type Post {
    id: ID!
    title: String!
    slug: String!
    html: String!
  }
  input PostInput {
    id: ID
    slug: String
  }
`;
