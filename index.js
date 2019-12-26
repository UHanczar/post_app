const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const { MONGO_DB_KEY } = require('./config');
const Post = require('./models/Post');
const User= require('./models/User');

const typeDefs = `
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
  }
  type Query {
    getPosts: [Post]!
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => await Post.find(),
  },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

mongoose.connect(MONGO_DB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen({ port: 5000 }))
  .then(res => console.log(`Server runs on ${res.port}`));
