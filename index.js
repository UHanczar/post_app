const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGO_DB_KEY } = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.PORT || 5000;
const pubSub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubSub }),
});

mongoose.connect(MONGO_DB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen({ port: PORT }))
  .then(res => console.log(`Server runs on http://localhost:${res.port}`))
  .catch(error => console.error('Database connection error'));
