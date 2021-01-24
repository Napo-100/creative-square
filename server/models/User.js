const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    creator: {
      type: Boolean,
      required: true
    },

    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    subscriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    subscribers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("subscriptionCount").get(function () {
  return this.subscriptions.length;
});

userSchema.virtual("subscriberCount").get(function () {
  return this.subscribers.length;
});

const User = model("User", userSchema);

module.exports = User;
