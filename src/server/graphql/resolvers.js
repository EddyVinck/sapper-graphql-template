import posts from "../../routes/blog/_posts";

export const resolvers = {
  Query: {
    me: (_root, _args, _ctx, _info) => {
      return {
        email: "borat@email.gql",
        avatar: "great-success.png",
      };
    },
    posts: (_root, _args, _ctx, _info) => {
      return posts;
    },
    post: (_root, _args, _ctx, _info) => {
      return {
        email: "borat@email.gql",
        avatar: "great-success.png",
      };
    },
  },
};
