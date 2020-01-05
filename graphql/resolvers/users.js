const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const { validateUserRegisterInput, validateUserLoginInput, generateUserToken } = require('../../utils/validators');

const usersResolvers = {
  Mutation: {
    register: async (parent, args, context, info) => {
      const { registerInput: { userName, password, email, confirmPassword }} = args;
      const { valid, errors } = validateUserRegisterInput(userName, password, confirmPassword, email);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ userName });

      if (user) {
        throw new UserInputError('User name is taken', {
          errors: {
            userName: 'This user name is taken'
          }
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await new User({
        userName,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = generateUserToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    login: async (parent, args, context, info) => {
      const { userName, password} = args;

      const { valid, errors } = validateUserLoginInput(userName, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ userName });

      if (!user) {
        errors.general = 'User not found';

        throw new UserInputError('User not found', errors);
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = 'Wrong credentials';

        throw new UserInputError('Wrong credentials', errors);
      }

      const token = generateUserToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  }
};

module.exports = usersResolvers;
