const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../config');

const validateUserRegisterInput = (userName, password, confirmPassword, email) => {
  const errors = {};

  if (userName.trim() === '') {
    errors.userName = 'User name must not be empty';
  }

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  }

  const emailValidator = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

  if (!email.match(emailValidator)) {
    errors.email = 'Email must be a valid email address';
  }

  if (email === '') {
    errors.password = 'Password must not be empty';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Password and confirm password must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
};

const validateUserLoginInput = (userName, password) => {
  const errors = {};

  if (userName.trim() === '') {
    errors.userName = 'User name must not be empty';
  }

  if (password === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
};

const generateUserToken = (userData) => {
  return jwt.sign({
    id: userData.id,
    userName: userData.userName,
    email: userData.email,
  }, JWT_SECRET_KEY, { expiresIn: '1h'});
}

module.exports = {
  validateUserRegisterInput,
  validateUserLoginInput,
  generateUserToken,
};
