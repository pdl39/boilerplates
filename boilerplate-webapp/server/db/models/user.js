const { DataTypes, Op } = require('sequelize');
const db = require('../db');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AUTH_PRIVATE_KEY } = process.env;
const { throwErr } = require('../../utils');

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
  const isCorrectPassword = await user.verifyPassword(password);

  if (!user || !isCorrectPassword) {
    throwErr(401, `Incorrect password. Please check your password and try again.`);
  }

  return user.generateToken();
}

User.findByToken = async function (token) {
  const { id } = await jwt.verify(token, process.env.JWT);
  const user = User.findByPk(id);

  if (!user) {
    throwErr(401, 'Bad token.');
  }

  return user;
}

// INSTANCE METHODS
User.prototype.verifyPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
}

User.prototype.generateToken = async function () {
  return await jwt.sign({
    id: this.id
  }, process.env.JWT);
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
