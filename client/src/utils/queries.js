import gql from "graphql-tag";

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
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
      featuredPosts {
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

export const QUERY_FEATURED_POSTS = gql`
{
  featuredPosts{
  posts {
    _id
    username
    postMediaType
    postDescription
    postLink
    postPrimaryMedia
    postSecondaryMedia
    postPaywall
    postIsFeatured
    createdAt
    pinCount
    pins {
      username
    }
    likes {
      username
    }
    likeCount
    comments {
      _id
      username
      commentText
    }
    commentCount
  }
  }
}
`

export const QUERY_ME = gql`
  {
    me {
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
      featuredPosts {
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

export const QUERY_ME_POSTS = gql`
  {
    me {
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
    }
  }
`;

export const QUERY_ME_PROFILE = gql`
  {
    me {
      _id
      username
      firstName
      lastName
      email
      profilePic
      bio
      creatorType
      subscriberCount
      followerCount
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      username
      postMediaType
      postDescription
      postLink
      postPrimaryMedia
      postSecondaryMedia
      postPaywall
      createdAt
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
  query {
    posts {
      _id
      username
      postMediaType
      postDescription
      postLink
      postPrimaryMedia
      postSecondaryMedia
      postPaywall
      createdAt
      pinCount
      pins {
        username
      }
      likes {
        username
      }
      likeCount
      comments {
        _id
        username
        commentText
      }
      commentCount
    }
  }
`;

export const QUERY_COMMENT = gql`
  query comment($id: ID!) {
    comment(_id: $id)
    _id
    commentText
    username
    createdAt
  }
`;

export const QUERY_COMMENTS = gql`
  query {
    comments{
    _id
    commentText
    username
    createdAt
  }
}
`;
