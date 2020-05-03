import { Post } from "../db/resources/post/post.model";
import { postsForAuthor, getAuthorFromPost } from "../db/queries/queries";
import { User } from "../db/resources/user/user.model";

export const resolvers = {
  Query: {
    me: (_root, _args, _ctx, _info) => {
      // TODO: auth
      return {
        email: "borat@email.gql",
        avatar: "great-success.png",
      };
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
