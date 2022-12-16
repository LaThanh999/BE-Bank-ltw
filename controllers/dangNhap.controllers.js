const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const taiKhoanModel = require('../models/taiKhoan.model');
const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const taiKhoan = await taiKhoanModel.getWithUsernameOrEmail(username);
  if (_.isEmpty(taiKhoan)) {
    return res.status(401).json({
      Authorization: false,
    });
  }
  if (!bcrypt.hashSync(password, taiKhoan.matKhau)) {
    return res.status(401).json({
      Authorization: false,
    });
  }

  const payload = {
    id: taiKhoan.id,
  };

  const opts = {
    expiresIn: 60 * 60 * 30,
  };

  const accessToken = jwt.sign(payload, process.env.SECRET_KEY, opts);

  const refreshToken = randomString.generate(80);
  await taiKhoanModel.update(taiKhoan.id, { refreshToken: refreshToken });

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
    const result = await taiKhoanModel.isValidRefreshToken(userId, refreshToken);
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
    console.log(err);
    return res.status(401).json({ Message: 'Invalid accessToken' });
  }
};
