import gql from "graphql-tag";

export const QUERY_USER = gql`
query user ($username: String!) {
  user (username: $username) {
    _id
    username
    email
    creator
    creatorType
    firstName
    lastName
    bio
    posts {
      _id
      postMediaType
      postDescription
      postLink
      postPrimaryMedia
      postSecondaryMedia
      postPaywall
      likeCount
      pinCount
      createdAt
    }
    subscriptionCount
    subscriptions {
      username
      _id
    }
    subscriberCount
    subscribers {
      username
      _id
    }
    followerCount
    followers {
      username
      _id
    }
    followingCount
    following {
      username
      _id
    }
  }
}
`;

export const QUERY_POST = gql`
query posts($username: String) {
  posts(username: $username) {
    username
    postMediaType
    postDescription
    postLink
    postPrimaryMedia
    postSecondaryMedia
    postPaywall
    comments {
      _id
      commentText
      username
      createdAt
    }
    commentCount
    likeCount
    likes {
      username
    }
    pinCount
    pins {
      username
    }
  }
}
`;

export const QUERY_POSTS = gql`
  username
  postMediaType
  postDescription
  postLink
  postPrimaryMedia
  postSecondaryMedia
  postPaywall
  comments {
    _id
    commentText
    username
    createdAt
  }
  commentCount
  likeCount
  likes {
    username
  }
  pinCount
  pins {
    username
  }
`;

export const QUERY_COMMENT = gql`
  _id
  commentText
  username
  createdAt
`;
