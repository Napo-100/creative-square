const { Schema, model } = require("mongoose");
const commentSchema = require('./Comment');
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
    postImage: {
      type: String,
    },
    postPaywall: {
      type: Boolean,
      required: true,
      default: false,
    },
    comments: [
      commentSchema
    ],
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
      virtuals: true
    },
  }
);

postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Post = model("Post", postSchema);

module.exports = Post;
