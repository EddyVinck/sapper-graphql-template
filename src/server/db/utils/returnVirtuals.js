/**
 * in GraphQL we query for `id`, not `_id`.
 * Since Mongoose virtualizes an `id` field, we need to return it too after the Mongo document is converted to something else.
 */
export const returnVirtuals = (schema) => {
  schema.set("toJSON", {
    virtuals: true,
  });
  schema.set("toObject", {
    virtuals: true,
  });
};
