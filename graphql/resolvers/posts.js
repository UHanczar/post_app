const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');

const postsResolvers = {
  Query: {
    getPosts: async () => await Post.find().sort({ createdAt: -1 }),

    getPost: async (parent, args, context, info) => {
      try {
        const post = await Post.findById(args.postId);

        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    createPost: async (parent, args, context, info) => {
      const user = checkAuth(context);
      const newPost = new Post({
        body: args.body,
        user: user.id,
        userName: user.userName,
        createdAt: new Date().toISOString(),
      });

      context.pubSub.publish('NEW_POST', { newPost });

      return  await newPost.save();
    },

    deletePost: async (parent, args, context, info) => {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(args.postId);
        if (user.id === post.user.toString()) {
          await post.delete();

          return 'Post was deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    likePost: async (parent, args, context, info) => {
      const user = checkAuth(context);
      const post = await Post.findById(args.postId);

      if (post) {
        if (post.likes.find(like => like.userId === user.id)) {
          post.likes = post.likes.filter(like => like.userId !== user.id);
        } else {
          post.likes.push({
            userName: user.userName,
            userId: user.id,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();

        return post;
      } else {
        throw new UserInputError('Post not found');
      }
    },
  },

  Subscription: {
    newPost: {
      subscribe: (parent, args, context, info) => context.pubSub.asyncIterator('NEW_POST'),
    }
  }
};

module.exports = postsResolvers;
