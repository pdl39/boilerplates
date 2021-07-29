const jwt = require('jsonwebtoken');
const { REFRESH_TOKEN_SECRET_KEY } = process.env;
const { User } = require('../../db/models');
const { throwErr, returnErr } = require('../../utils');


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

    const refreshTokens = []; // this should be stored in the db. Just directly assigning an array here for simplicity.
    if (!refreshTokens.includes(refreshToken)) {
      throwErr(403, `Invalid refresh token.`);
    }

    try {
      const payload = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);
    }
    catch (err) {
      throwErr(403, 'Refresh token verification failed.');
    }

    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    const accessToken = await user.generateAccessToken();
    res.json({ accessToken });
  }
  catch (err) {
    next(err);
  }
}


// middleware functions
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

