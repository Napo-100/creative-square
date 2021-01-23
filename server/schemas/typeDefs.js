const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    subscriptionCount: Int
    posts: [Post]
    subscriptions: [User]
    subscribers: [User]
  }
  type Post {
    _id: ID
    postType: String
    postDescription: String
    postLink: String
    username: String
    createdAt: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(
      postType: String!
      postDescription: String!
      postLink: String
    ): Post
    subscribe(subscriptionId: ID!): User
  }
  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
