const gql = require('graphql-tag');

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
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
  }
`;

module.exports = typeDefs;
