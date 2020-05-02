import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 3000,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user", // this has to be populated with mongoose
    },
    // For "soft deleting"
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// using a good ol' function so we can utilize `this`
// `this` refers to the instance of a post.
postSchema.virtual("contentLength").get(function () {
  return this.content.length;
});

// Multiple posts with the same title for the same author not allowed
postSchema.index(
  {
    author: 1,
    title: 1,
  },
  {
    unique: true,
  }
);

export const Post = mongoose.model("post", postSchema);
