const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGO_DB_KEY } = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
});

mongoose.connect(MONGO_DB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen({ port: 5000 }))
  .then(res => console.log(`Server runs on http://localhost:${res.port}`));
