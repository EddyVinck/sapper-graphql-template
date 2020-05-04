import {
  SchemaDirectiveVisitor,
  AuthenticationError,
} from "apollo-server-express";
import { defaultFieldResolver } from "graphql";

export class AuthenticationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (root, args, ctx, info) => {
      if (!ctx.user || !ctx.user.id) {
        throw new AuthenticationError("You must be logged in to do this");
      }
      return resolve(root, args, ctx, info);
    };
  }
}
