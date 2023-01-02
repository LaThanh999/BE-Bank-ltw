const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const taiKhoanModel = require('../models/taiKhoan.model');
const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const helper = require('../helper/email');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const taiKhoan = await taiKhoanModel.getWithUsernameOrEmail(username);
  if (_.isEmpty(taiKhoan)) {
    return res.status(401).json({
      Authorization: false,
    });
  }

  bcrypt.compare(password, taiKhoan.matKhau, async (err, success) => {
    if (!!err) {
      return res.status(401).json({
        Authorization: false,
      });
    }
    if (!!success) {
      const payload = {
        userId: taiKhoan.id,
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
        userId: taiKhoan.id,
        maTaiKhoan: taiKhoan.maTaiKhoan,
        type: taiKhoan.loaiTaiKhoan,
      });
      return;
    } else {
      return res.status(401).json({
        Authorization: false,
      });
    }
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
        expiresIn: 60 * 60 * 30,
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

exports.resetPassword = async (req, res) => {
  const { passwordOld, passwordNew, numberCard } = req.body;
  const taiKhoan = await taiKhoanModel.getFindByNumberCard(numberCard);
  if (_.isEmpty(taiKhoan)) {
    return res.status(401).json({});
  }

  bcrypt.compare(passwordOld, taiKhoan.matKhau, async (err, success) => {
    if (!!err) {
      return res.status(401).json({
        status: 2,
        message: 'Mật khẩu không đúng',
      });
    }
    if (!!success) {
      newPassword = bcrypt.hashSync(passwordNew, 10);

      await taiKhoanModel.update(taiKhoan.id, { matKhau: newPassword });

      return res.status(200).json({
        status: 1,
        message: 'Đổi mật khẩu thành công',
      });
    } else {
      return res.status(401).json({
        status: 2,
        message: 'Mật khẩu không đúng',
      });
    }
  });
};

exports.sendForgotPassWordOtp = async (req, res) => {
  const { username } = req.body;
  console.log('username', username);
  const taiKhoan = await taiKhoanModel.getWithUsernameOrEmail(username);
  if (_.isEmpty(taiKhoan)) {
    return res.status(401).json({
      status: 2,
      message: 'Không tìm thấy tài khoản !!',
    });
  }
  const otp = Math.floor(Math.random() * 9999) + 1000;
  helper.sendMail(taiKhoan.email, taiKhoan.hoTen, otp);
  await taiKhoanModel.update(taiKhoan.id, { OTP: otp });
  return res.status(200).json({
    status: 1,
    message: 'Đã gửi OTP',
  });
};

exports.checkForgotPassWordOtp = async (req, res) => {
  const { username, inputOtp } = req.body;
  const taiKhoan = await taiKhoanModel.getWithUsernameOrEmail(username);
  if (_.isEmpty(taiKhoan)) {
    return res.status(401).json({
      status: 2,
      message: 'Không tìm thấy tài khoản !!',
    });
  }
  if (taiKhoan.OTP == inputOtp) {
    return res.status(201).json({
      otpVerified: true,
    });
  } else {
    return res.status(201).json({
      otpVerified: false,
    });
  }
};

exports.updateForgotPassWord = async (req, res) => {
  const { username, password, inputOtp } = req.body;
  const taiKhoan = await taiKhoanModel.getWithUsernameOrEmail(username);
  if (_.isEmpty(taiKhoan)) {
    return res.status(401).json({
      status: 2,
      message: 'Không tìm thấy tài khoản !!',
    });
  }
  if (taiKhoan.OTP != inputOtp) {
    return res.status(401).json({
      status: 2,
      message: 'Thất bại!!',
    });
  }
  taiKhoan.matKhau = bcrypt.hashSync(password, 10);
  await taiKhoanModel.update(taiKhoan.id, taiKhoan);
  return res.status(200).json({
    status: 1,
    message: 'Cập nhật mật khẩu mới thành công',
  });
};
