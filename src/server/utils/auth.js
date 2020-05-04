import jwt from "jsonwebtoken";
import config from "config";
import { AuthenticationError } from "apollo-server-express";
import { User } from "../db/resources/user/user.model";
const secret = config.get("jwtSecret");

/**
 * Takes a user and creates a jwt
 */
export const createToken = (user) => {
  const safe = user;
  // TODO: strip sensitive data so it doesn't go on the jwt
  return jwt.sign(user, secret);
};

const getUserFromToken = (token) => {
  try {
    const user = jwt.verify(token, secret);
    return User.findById(user.id);
  } catch (error) {
    return null;
  }
};

export const getUserFromReqHeaders = (requestHeaders) => {
  const token = requestHeaders.authorization || "";
  const user = getUserFromToken(token);
  return user;
};
