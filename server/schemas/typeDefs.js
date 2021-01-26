const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    creator: Boolean
    contentType: String
    profilePic: String
    subscriptionCount: Int
    subscriberCount: Int
    followingCount: Int
    followerCount: Int
    posts: [Post]
    subscriptions: [User]
    subscribers: [User]
    following: [User]
    followers: [User]
  }
  type Post {
    _id: ID
    postType: String
    postDescription: String
    postLink: String
    postImage: String
    postPaywall: Boolean
    comments: [Comment]
    username: String
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
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
    comments(username: String): [Comment]
    comment(_id: ID!): Comment
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(
      username: String!
      email: String!
      password: String!
      profilePic: String
      creator: Boolean!
      contentType: String
    ): Auth

    updateUser(
      username: String
      email: String
      password: String
      profilePic: String
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

    addComment(postId: ID!, commentText: String): Post

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
`;

module.exports = typeDefs;
