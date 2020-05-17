import { AuthenticationError } from "apollo-server-express";
import { Post } from "../db/resources/post/post.model";
import { postsForAuthor, getAuthorFromPost } from "../db/queries/queries";
import { User } from "../db/resources/user/user.model";
import { createToken } from "../utils/auth";

export const resolvers = {
  Query: {
    borat: (_root, _args, _ctx, _info) => {
      return {
        email: "borat@email.gql",
        avatar: "great-success.png",
      };
    },
    me: (_, __, { user }) => {
      console.log("🆗 in `me` resolver: ");
      console.log({ id: user.id });
      return user;
    },
    user: async (_, { id }) => {
      return await User.findById(id).exec();
    },
    post: async (_, { input }) => {
      const key = input.id ? "id" : input.slug ? "slug" : false;
      if (!key) {
        throw new Error(
          "Slug or ID required. Received invalid PostInput: " +
            JSON.stringify(input)
        );
      }
      const value = input[key];
      const post = await Post.findOne({ [key]: value }).exec();
      if (post) {
        return post;
      }
      throw new Error(`No post found with "${key}" of "${input[key]}"`);
    },
    posts: async () => {
      const posts = await Post.find({}).exec();
      return posts;
    },
  },
  Mutation: {
    signUp: async (_, { input }, { req }) => {
      const isExistingUser = await User.findOne({ email: input.email })
        .lean()
        .exec();
      if (isExistingUser) {
        throw new AuthenticationError("This email address is already in use.");
      }
      const user = await User.create({
        ...input,
      });
      // TODO: extract to function since this is copied in signIn
      const userObj = user.toObject();
      const tokenData = { id: userObj.id, permissions: userObj.permissions };
      const token = createToken(tokenData);
      delete userObj.password;
      const authUser = { token, user: userObj };
      req.session.jwt = token;
      console.log(req.session);
      return authUser;
    },
    signIn: async (_, { input }, { req, user: alreadySignedIn }) => {
      if (alreadySignedIn) {
        throw new AuthenticationError("You are already signed in!");
      }
      const user = await User.findOne({ email: input.email }).exec();
      if (!user) {
        throw new AuthenticationError("Could not sign in.");
      }
      const correctPassword = await user.checkPassword(input.password);
      if (!correctPassword) {
        throw new AuthenticationError("Incorrect password.");
      }
      const userObj = user.toObject();
      const tokenData = { id: userObj.id, permissions: userObj.permissions };
      const token = createToken(tokenData);
      delete userObj.password;
      const authUser = { token, user: userObj };
      req.session.jwt = token;
      console.log(req.session);
      return authUser;
    },
    createPost: async (_, { input }, { user }) => {
      const postDetails = { ...input, author: user.id };
      const newPost = await Post.create(postDetails);

      return newPost.toJSON();
    },
    changePermissions: async (_, { input }) => {
      const { user: userId, ...permissions } = input;
      console.log({ userId, permissions });
      throw new Error("TODO");
    },
  },
  User: {
    posts: async (user) => {
      const posts = await postsForAuthor(user.id);
      return posts;
    },
  },
  Post: {
    author: async (post) => {
      const author = getAuthorFromPost(post.id);
      return author;
    },
  },
};
