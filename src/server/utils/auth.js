import jwt from "jsonwebtoken";
import config from "config";
import { User } from "../db/resources/user/user.model";
const secret = config.get("jwtSecret");

/**
 * Takes a user object (not a Mongoose Document!) and creates a jwt
 */
export const createToken = (user) => {
  const safe = user;
  // TODO: strip sensitive data so it doesn't go on the jwt
  return jwt.sign(safe, secret);
};

const getUserFromToken = async (token) => {
  try {
    const jwtUser = jwt.verify(token, secret);
    let user = await User.findById(jwtUser.id).exec();
    return user.toObject();
  } catch (error) {
    return null;
  }
};

export const getUserFromReqHeaders = async (requestHeaders) => {
  const token = requestHeaders.authorization || "";
  const user = await getUserFromToken(token);

  return user;
};
