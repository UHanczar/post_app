const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

const resolvers = {
  Post: {
    likeCount: async (parent, args, context, info) => parent.likes.length,
    commentCount: async (parent, args, context, info) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};

module.exports = resolvers;
