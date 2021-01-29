import gql from 'graphql-tag';

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
  mutation updateUser($username: String, $email: String, $password: String, $firstName: String, $lastName: String, $profilePic : String, $bio: String, $creator: Boolean, $creatorType: String){
      updateUser($username: username, $email: email, password: password, firstName: firstName, lastName: lastName, profilePic : profilePic, bio: bio, creator: creator, creatorType: creatorType){
        username
        email
        password
        firstName
        lastName
        profilePic
        bio
        creator
        creatorType
      }
  }
`

export const ADD_POST = gql`
  mutation addPost($postType: String!, $postDescription: String!, $postLink: String, $postPaywall: Boolean!, $postImage: String) {
    addPost(postType: $postType, postDescription: $postDescription, postLink: $postLink, postPaywall: $postPaywall, postImage: $postImage) {
      postType
      postDescription
      postLink
      postImage
      postPaywall
    }
  }
`