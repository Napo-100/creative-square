const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Post, Comment } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__V -password")
          .populate({
            path: "posts",
            populate: {
              path: "comments likes pins",
            },
          })
          .populate("subscriptions")
          .populate("subscribers")
          .populate({
            path: "following",
            populate: {
              path: "posts",
            },
          })
          .populate("followers")
          .populate("likedPosts")
          .populate("pinnedPosts");
        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    featuredPosts: async (parent, args, context) => {
      if (context.user) {
        const postData = await User.findById({ _id: context.user._id })
          .select("posts")
          .populate({
            path: "posts",
            match: {
              postIsFeatured: true,
            },
          });
        console.log(postData);
        return postData;
      }
      throw new AuthenticationError("Not logged in");
    },

    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate({
          path: "posts",
          populate: {
            path: "comments likes pins",
          },
        })
        .populate("subscriptions")
        .populate("subscribers")
        .populate("following")
        .populate("followers")
        .populate("likedPosts")
        .populate("pinnedPosts");
    },
    // get a user by username or id
    user: async (parent, { _id }) => {
      return User.findById({ _id })
        .select("-__v -password")
        .populate({
          path: "posts",
          populate: {
            path: "comments likes pins",
          },
        })
        .populate("subscriptions")
        .populate("subscribers")
        .populate("following")
        .populate("followers")
        .populate("likedPosts")
        .populate("pinnedPosts");
    },
    posts: async () => {
      return Post.find()
        .sort({ createdAt: -1 })
        .populate("comments")
        .populate("pins")
        .populate("likes");
    },
    post: async (parent, { _id }) => {
      return await Post.findById({ _id })
        .populate("comments")
        .populate("pins")
        .populate("likes");
    },
    comments: async () => {
      return Comment.find().sort({ createdAt: -1 });
    },
    comment: async (parent, { _id }) => {
      return Comment.findOne({ _id });
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
        const originalUser = await User.findById(context.user._id);
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          args,
          { new: true }
        ).select("-__v -password");
        console.log(updatedUser.username);
        if (originalUser.username !== updatedUser.username) {
          const updatedPosts = await Post.updateMany(
            { username: originalUser.username },
            { $set: { username: updatedUser.username } }
          );
          return { updatedUser, updatedPosts };
        }
        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
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
        const user = await User.findById(context.user._id);
        const post = await Post.create({
          ...args,
          username: user.username,
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
    // updatePost: async (parent, args, context) => {
    //   if (context.user) {
    //     const updatedPost = await Post.findByIdAndUpdate(
    //       { _id: postId },
    //       { ...args },
    //       { new: true }
    //     );
    //     const updatedUser = await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { posts: post._id } },
    //       { new: true }
    //     );

    //     return {updatedPost, updatedUser};
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const newComment = await Comment.create({
          commentText,
          username: user.username,
        });
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { comments: newComment } },

          { new: true, runValidators: true }
        ).populate("comments");

        return updatedPost;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateComment: async (parent, { commentId, commentText }, context) => {
      if (context.user) {
        const updatedComment = await Comment.findByIdAndUpdate(
          { _id: commentId },
          { commentText },
          { new: true, runValidators: true }
        );
        return updatedComment;
      }
    },
    likePost: async (parent, { postId }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const updatedPost = await Post.findByIdAndUpdate(
          { _id: postId },
          { $addToSet: { likes: user } },
          { new: true }
        ).populate("likes");
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { $addToSet: { likedPosts: updatedPost } },
          { new: true }
        ).populate("likedPosts");
        return { updatedPost, updatedUser };
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    pinPost: async (parent, { postId }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const updatedPost = await Post.findByIdAndUpdate(
          { _id: postId },
          { $addToSet: { pins: user } },
          { new: true }
        ).populate("pins");
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { $addToSet: { pinnedPosts: updatedPost } },
          { new: true }
        ).populate("pinnedPosts");
        return { updatedPost, updatedUser };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    subscribe: async (parent, { subscriptionId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
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

        const updatedCreator = await User.findByIdAndUpdate(
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

        // console.log(context.user);
        // console.log(subscriptionId);
        // console.log(context.user._id);

        return { updatedUser, updatedCreator };
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    follow: async (parent, { followId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { following: followId } },
          { new: true }
        ).populate("following");

        const updatedCreator = await User.findByIdAndUpdate(
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
