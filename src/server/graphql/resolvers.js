export const resolvers = {
  Query: {
    me: (_root, _args, _ctx, _info) => {
      return {
        email: "thisisfake@email.gql",
      };
    },
  },
};
