import mongoose from "mongoose";

export const connect = (url, options) => {
  return mongoose.connect(url, { useNewUrlParser: true, ...options });
};
