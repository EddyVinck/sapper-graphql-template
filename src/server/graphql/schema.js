import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    me: User!
    posts: [Post]!
    user(id: ID!): User!
    post(input: PostInput!): Post
  }
  type Mutation {
    signIn(input: SignInInput!): AuthUser!
    signUp(input: SignUpInput!): AuthUser!
    changePermissions(input: PermissionsInput): User
  }

  type User {
    id: ID!
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
  input PermissionsInput {
    user: ID!
    createPost: Boolean
    editOwnPost: Boolean
    editAnyPost: Boolean
    deleteOwnPost: Boolean
    deleteAnyPost: Boolean
  }

  # Authentication
  type AuthUser {
    token: String!
    user: User!
  }
  input SignUpInput {
    email: String!
    password: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }

  # Could implement this in the future: make it possible to group users in something like an organization
  type OrganizationUser {
    user: User!
    organization: [Organization]! # users can belong to more than one organization
  }
  type Organization {
    name: String!
    plan: String!
    admins: [OrganizationUser!]! # an organization should have at least one admin
    users: [OrganizationUser]!
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
