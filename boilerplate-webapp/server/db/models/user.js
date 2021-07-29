const { DataTypes, Op } = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY
} = process.env;
const { throwErr, changeErrStatus } = require('../../utils');

// This model functions as an example for handling user authentication
const User = db.define('user', {
  nameFirst: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nameLast: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


// CLASS METHODS
User.authenticate = async function ({ username, password }) {
  const user = await User.findOne({
    where: {
      username
    }
  });
  if (!user) {
    throwErr(401, `Username ${username} not found. Please check your username and try again.`)
  }

  const isCorrectPassword = await user.verifyPassword(password);
  if (!isCorrectPassword) {
    throwErr(401, `Incorrect password. Please check your password and try again.`);
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  return [accessToken, refreshToken];
};

User.findByToken = async function (token, tokenType = 'access') {
  const tokenSecretKey = tokenType === 'refresh' ? REFRESH_TOKEN_SECRET_KEY : ACCESS_TOKEN_SECRET_KEY;
  try {
    console.log(tokenSecretKey);
    const { id } = await jwt.verify(token, tokenSecretKey);
    const user = await User.findByPk(id);
    return user;
  }
  catch (err) {
    throw changeErrStatus(403, err);
  }
};

// INSTANCE METHODS
User.prototype.verifyPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

User.prototype.generateAccessToken = async function (payload = null, options = null) {
  const defaultPayload = {
    id: this.id
  };
  const defaultOptions = {
    expiresIn: '30s'
  }

  payload = payload ? payload : defaultPayload;
  options = options ? options : defaultOptions;

  return await jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, options);
};

User.prototype.generateRefreshToken = async function (payload = null, options = null) {
  const defaultPaylod = {
    id: this.id
  };
  const defaultOptions = {
    expiresIn: '7d'
  }

  payload = payload ? payload : defaultPaylod;
  options = options ? options : defaultOptions;

  return await jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options);
}

// HOOKS
const hashPassword = async function (user) {
  if (user.changed('password')) {
    const SALT_ROUNDS = 10;
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)));

module.exports = User;
