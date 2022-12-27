const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const userModel = require('../models/users.model');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const _ = require('lodash');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.getFindByUsername(username);
  if (_.isEmpty(user)) {
    return res.status(401).json({
      Authorization: false,
    });
  }
  if (!bcrypt.hashSync(password, user.password)) {
    return res.status(401).json({
      Authorization: false,
    });
  }

  const payload = {
    userId: user.id,
  };

  const opts = {
    expiresIn: 60,
  };

  const accessToken = jwt.sign(payload, process.env.SECRET_KEY, opts);

  const refreshToken = randomString.generate(80);
  await userModel.update(user.id, { refreshToken: refreshToken });

  res.json({
    Authorization: true,
    accessToken,
    refreshToken,
  });
};

exports.refreshToken = async (req, res) => {
  const { accessToken, refreshToken } = req.body;
  try {
    const { userId } = jwt.verify(accessToken, process.env.SECRET_KEY, { ignoreExpiration: true });
    const result = await userModel.isValidRefreshToken(userId, refreshToken);
    if (result) {
      const payload = {
        userId,
      };
      const opts = {
        expiresIn: 60,
      };

      const newAccessToken = jwt.sign(payload, process.env.SECRET_KEY, opts);

      return res.json({
        accessToken: newAccessToken,
      });
    }
    return res.status(401).json({
      Message: 'Invalid refresh Token',
    });
  } catch (err) {
    return res.status(401).json({ Message: 'Invalid accessToken' });
  }
};
