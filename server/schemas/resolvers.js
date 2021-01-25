const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Post } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__V -password")
          .populate("posts")
          .populate("subscriptions")
          .populate("subscribers")
          .populate("following")
          .populate("followers");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("posts")
        .populate("subscriptions")
        .populate("subscribers")
        .populate("following")
        .populate("followers");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("posts")
        .populate("subscriptions")
        .populate("subscribers")
        .populate("following")
        .populate("followers");
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(args)
        .select("-__v -password")
        console.log(context.user)
        console.log(updatedUser)
        return updatedUser;
      }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );

        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    subscribe: async (parent, { subscriptionId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              subscriptions: subscriptionId,
              following: subscriptionId,
            },
          },
          { new: true }
        )
          .populate("subscriptions")
          .populate("following");

        const updatedCreator = await User.findOneAndUpdate(
          { _id: subscriptionId },
          {
            $addToSet: {
              subscribers: context.user._id,
              followers: context.user._id,
            },
          },
          { new: true }
        )
          .populate("subscribers")
          .populate("followers");

        console.log(context.user);
        console.log(subscriptionId);
        console.log(context.user._id);

        return { updatedUser, updatedCreator };
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    follow: async (parent, { followId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { following: followId } },
          { new: true }
        ).populate("following");

        const updatedCreator = await User.findOneAndUpdate(
          { _id: followId },
          { $addToSet: { followers: context.user._id } },
          { new: true }
        ).populate("followers");

        console.log(context.user);
        console.log(followId);
        console.log(context.user._id);

        return { updatedUser, updatedCreator };
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
