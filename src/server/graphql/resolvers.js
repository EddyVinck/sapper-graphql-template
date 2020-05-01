export const resolvers = {
  Query: {
    me: (_root, _args, _ctx, _info) => {
      return {
        email: "borat@email.gql",
        avatar: "great-success.png",
      };
    },
  },
};
