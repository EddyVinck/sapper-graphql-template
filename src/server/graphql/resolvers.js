import posts from "../../routes/blog/_posts";

export const resolvers = {
  Query: {
    me: (_root, _args, _ctx, _info) => {
      return {
        email: "borat@email.gql",
        avatar: "great-success.png",
      };
    },
    posts: () => {
      return posts;
    },
    post: (_, { input }) => {
      const key = input.id ? "id" : input.slug ? "slug" : false;
      if (!key) {
        throw new Error(
          "Slug or ID required. Received invalid PostInput: " +
            JSON.stringify(input)
        );
      }
      const post = posts.find((p) => p[key] === input[key]);
      if (post) {
        return post;
      }
      throw new Error(`No post found with "${key}" of "${input[key]}"`);
    },
  },
};
