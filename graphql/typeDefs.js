const gql = require('graphql-tag');

const typeDefs = gql`
  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
    userId: String!
  }
  
  type Like {
    id: ID!
    createdAt: String!
    userName: String!
    userId: String!
  }

  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  
  type User {
    id: ID!
    email: String!
    userName: String!
    token: String!
    createdAt: String!
  }
  
  input RegisterInput {
    userName: String!
    password: String!
    confirmPassword: String!
    email: String!  
  }
  
  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post!
  }
  
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(userName: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  
  type Subscription {
    newPost: Post!
  }
`;

module.exports = typeDefs;
