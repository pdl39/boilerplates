const jwt = require('jsonwebtoken');
const { REFRESH_TOKEN_SECRET_KEY } = process.env;
const { User } = require('../../db/models');
const { throwErr } = require('../../utils');

/* AUTH LOGIC */
// Access Token set to expire in 30 seconds (for testing purpose)
// Refresh Token set to expire in 7 days
// loggin in generates new Access Token & Refresh Token
// Use Refresh Token to re-generate Access Token
// logging out removes Refresh Token

let refreshTokens = []; // this should be stored in the db. Just directly assigning an array here for simplicity.

exports.getUser = async (req, res, next) => {
  try {
    res.json(req.user);
  }
  catch (err) {
    next(err);
  }
}

exports.login = async (req, res, next) => {
  try {
    const [accessToken, refreshToken] = await User.authenticate(req.body);
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken });
  }
  catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    // add validations for input fields (username, password, email, etc.)

    // if input validations all pass, create user.
    const [user, isCreated] = await User.findOrCreate({
      where: {
        username: req.body.username
      },
      defaults: req.body
    });
    if (!isCreated) {
      throwErr(401, `username ${user.username} already exists.`);
    }

    res.status(201).send(`Signup success. Please log in to access user profile.`);
  }
  catch (err) {
    next(err);
  }
};

exports.regenerateAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      throwErr(401, `Please provide refresh token.`);
    }

    if (!refreshTokens.includes(refreshToken)) {
      throwErr(403, `Invalid refresh token.`);
    }

    const user = await User.findByToken(refreshToken, 'refresh');

    const accessToken = await user.generateAccessToken();
    res.json({ accessToken });
  }
  catch (err) {
    next(err);
  }
}

exports.logout = async (req, res, next) => {
  try {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
  }
  catch (err) {
    next(err);
  }
}


// middleware
exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      throwErr(401, `Token not found in request header`);
    }

    req.user = await User.findByToken(token);
    next();
  }
  catch (err) {
    next(err);
  }
}

