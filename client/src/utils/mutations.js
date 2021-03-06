import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $_id: ID!
    $username: String
    $firstName: String
    $lastName: String
    $profilePic: String
    $bio: String
    $creator: Boolean
    $creatorType: String
  ) {
    updateUser(
      _id: $_id
      username: $username
      firstName: $firstName
      lastName: $lastName
      profilePic: $profilePic
      bio: $bio
      creator: $creator
      creatorType: $creatorType
    ) {
      _id
      username
      firstName
      lastName
      profilePic
      bio
      creator
      creatorType
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost(
    $postMediaType: String!
    $postDescription: String
    $postLink: String
    $postPrimaryMedia: String
    $postSecondaryMedia: String
    $postPaywall: Boolean
  ) {
    addPost(
      postMediaType: $postMediaType
      postDescription: $postDescription
      postLink: $postLink
      postPrimaryMedia: $postPrimaryMedia
      postSecondaryMedia: $postSecondaryMedia
      postPaywall: $postPaywall
    ) {
      _id
      postMediaType
      postDescription
      postLink
      postPrimaryMedia
      postSecondaryMedia
      postPaywall
    }
  }
`;

//likePost(postId: ID!): UserAndPost
export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      updatedPost {
        _id
        username
        postMediaType
        postDescription
        postLink
        postPrimaryMedia
        postSecondaryMedia
        postPaywall
        createdAt
        likes {
          username
        }
        likeCount
      }
      updatedUser {
        username
        likedPosts {
          postDescription
        }
        likedPostCount
      }
    }
  }
`;

//likePost(postId: ID!): UserAndPost
export const PIN_POST = gql`
  mutation pinPost($postId: ID!) {
    pinPost(postId: $postId) {
      updatedPost {
        _id
        username
        postMediaType
        postDescription
        postLink
        postPrimaryMedia
        postSecondaryMedia
        postPaywall
        createdAt
        pins {
          username
        }
        pinCount
      }
      updatedUser {
        username
        pinnedPosts {
          postDescription
        }
        pinnedPostCount
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      comments {
        _id
        commentText
        username
        createdAt
      }
    }
  }
`;
