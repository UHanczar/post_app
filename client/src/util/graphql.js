import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation registerUser ($userName: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register ( registerInput: { userName: $userName, email: $email, password: $password, confirmPassword: $confirmPassword} ) {
      id
      userName
      email
      token
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser ($userName: String!, $password: String!) {
    login (userName: $userName, password: $password ) {
      id
      userName
      email
      token
      createdAt
    }
  }
`;

export const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      userName
      likeCount
      likes {
        userId
        userName
      }
      commentCount
      comments {
        id
        body
        userId
        userName
      }
    }
  }
`;

export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      userName
      likeCount
      likes {
        userId
        userName
      }
      commentCount
      comments {
        id
        body
        userId
        userName
      }
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      createdAt
      body
      userName
      comments {
        id
        userId
        userName
        body
      }
      commentCount
      likes {
        id
        userId
        userName
      }
      likeCount
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        userId
        userName
      }
      likeCount
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
