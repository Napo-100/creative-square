const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const postSchema = new Schema(
  {
    postType: {
      type: String,
      required: "You must specify a media type",
      minlength: 1,
      maxlength: 280,
    },

    postDescription: {
      type: String,
      required: "You need to describe your post",
      minlength: 1,
      maxlength: 280,
    },
    postLink: {
      type: String,
      minlength: 1,
      maxlength: 280,
    },
    postPaywall: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Post = model("Post", postSchema);

module.exports = Post;
