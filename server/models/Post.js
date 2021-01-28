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
    postImage: {
      type: String,
    },
    postPaywall: {
      type: Boolean,
      required: true,
      default: false,
    },
    creator: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pins: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

postSchema.virtual("pinCount").get(function () {
  return this.pins.length;
});

const Post = model("Post", postSchema);

module.exports = Post;
