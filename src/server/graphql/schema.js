import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    me: User
    posts: [Post]!
    post(id: ID!): Post
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
`;
