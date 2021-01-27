import gql from 'graphql-tag';

export const QUERY_USER = gql`
{
  user {
    firstName
    lastName
    username
    posts {
      _id
      createdAt
      postDescription
      postType
      postLink
      postImage
    }
  }
}
`;