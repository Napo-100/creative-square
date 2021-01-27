const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const commentSchema = new Schema(
  {
    commentText: {
        type: String,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = commentSchema;
