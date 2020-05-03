import mongoose from "mongoose";

const deprecationOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

export const connect = (url, options) => {
  return mongoose.connect(url, {
    ...deprecationOptions,
    ...options,
  });
};
