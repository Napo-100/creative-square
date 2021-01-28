const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    creator: Boolean
    firstName: String
    lastName: String
    bio: String
    posts: [Post]
    pinnedPosts: [Post]
    pinnedPostCount: Int
    likedPosts: [Post]
    likedPostCount: Int
    contentType: String
    profilePic: String
    subscriptions: [User]
    subscriptionCount: Int
    subscribers: [User]
    subscriberCount: Int
    following: [User]
    followingCount: Int
    followers: [User]
    followerCount: Int
  }
  type Post {
    _id: ID
    creator: String
    postType: String
    postDescription: String
    postLink: String
    postImage: String
    postPaywall: Boolean
    comments: [Comment]
    commentCount: Int
    likes: [User]
    likeCount: Int
    pins: [User]
    pinCount: Int
    createdAt: String
  }

  type Comment {
    _id: ID
    commentText: String
    username: String
    createdAt: String
  }

  type Query {
    me: User
    users: [User]
    user(_id: ID!): User
    posts: [Post]
    post(_id: ID!): Post
    comments: [Comment]
    comment(_id: ID!): Comment
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(
      username: String!
      email: String!
      password: String!
    ): Auth

    updateUser(
      email: String
      password: String
      firstName: String
      lastName: String
      profilePic: String
      bio: String
      creator: Boolean
      contentType: String
    ): User

    addPost(
      postType: String!
      postDescription: String!
      postLink: String
      postImage: String
      postPaywall: Boolean!
    ): Post

    likePost(postId: ID!): UserAndPost

    addComment(postId: ID!, commentText: String): Post

    updateComment(commentId: ID!, commentText: String): Comment

    subscribe(subscriptionId: ID!): ConnectedUsers
    follow(followId: ID!): ConnectedUsers
  }
  type Auth {
    token: ID!
    user: User
  }
  type ConnectedUsers {
    updatedUser: User
    updatedCreator: User
  }
  type UserAndPost {
    updatedPost: Post
    updatedUser: User
  }
`;

module.exports = typeDefs;
