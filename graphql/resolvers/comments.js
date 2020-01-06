const { UserInputError, AuthenticationError } = require('apollo-server');

const Post = require('./../../models/Post');
const checkAuth = require('../../utils/checkAuth');

const commentsResolver = {
  Mutation: {
    createComment: async (parent, args, context, info) => {
      const user = checkAuth(context);

      if (args.body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment must not be empty',
          }
        });
      } else {
        const post = await Post.findById(args.postId);

        if (post) {
          post.comments.unshift({
            body: args.body,
            userId: user.id,
            userName: user.userName,
            createdAt: new Date().toISOString(),
          });
          await post.save();

          return post;
        } else {
          throw new UserInputError('Post no found');
        }
      }
    },

    deleteComment: async (parent, args, context, info) => {
      const user = checkAuth(context);
      const post = await Post.findById(args.postId);

      if (post) {
        const commentIndex = post.comments.findIndex(comment => comment.id === args.commentId);

        if (post.comments[commentIndex].userId === user.id) {
          post.comments.splice(commentIndex, 1);
          await post.save();

          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Post not found');
      }
    },
  }
};

module.exports = commentsResolver;
