const jwt = require('jsonwebtoken');
const { AuthenticationError} = require('apollo-server');

const { JWT_SECRET_KEY } = require('../config');

const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        const user = jwt.verify(token, JWT_SECRET_KEY);

        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid or expired token');
      }
    } else {
      throw new Error('Authentication token must be "Bearer [token]"');
    }
  } else {
    throw new Error('Authorization header must be provided');
  }
};

module.exports = checkAuth;
