import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { returnVirtuals } from "../../utils/returnVirtuals";

const userSchema = new mongoose.Schema(
  {
    // no `id` because mongo adds a _id field by default
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      default: "https://placekitten.com/300/300",
    },
    // These could be in a separate schema
    // This approach is fairly straightforward since it doesn't utilize roles.
    permissions: {
      createPost: {
        type: Boolean,
        default: true,
        required: true,
      },
      // edit the posts that this user posted themselves
      editOwnPost: {
        type: Boolean,
        default: true,
        required: true,
      },
      // edit other people's posts too
      editAnyPost: {
        type: Boolean,
        default: false,
        required: true,
      },
      // delete the posts that this user posted themselves
      deleteOwnPost: {
        type: Boolean,
        default: true,
        required: true,
      },
      // delete other people's posts too
      deleteAnyPost: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("validate", function (next) {
  // TODO: validate valid avatar
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // TODO: add salt from config
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function (enteredPassword) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(enteredPassword, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

returnVirtuals(userSchema);

export const User = mongoose.model("User", userSchema);
