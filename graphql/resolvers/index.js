const postsResolvers = require('./posts');
const usersResolvers = require('./users');

const resolvers = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  }
};

module.exports = resolvers;
