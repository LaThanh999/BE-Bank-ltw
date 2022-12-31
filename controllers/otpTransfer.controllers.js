const otpModel = require('../models/otpTransfer.model');
const taiKhoanModel = require('../models/taiKhoan.model');
const helper = require('../helper/email');
const bcrypt = require('bcryptjs');

exports.sendOTP = async (req, res) => {
  const { numberCardFrom, numberCardTo } = req.body;
  const otp = Math.floor(Math.random() * 9999) + 1000;
  // add OTP
  const result = await otpModel.add({ numberCardFrom, numberCardTo, otp });
  // get tai khoan
  const account = await taiKhoanModel.getFindByNumberCard(numberCardFrom);
  helper.sendMai(account.email, account.hoTen, otp);

  res.status(201).json(result);
};

exports.checkOTP = async (req, res) => {
  const { numberCardFrom, numberCardTo, inputOtp } = req.body;
  const result = await otpModel.getFindByNumberCard(numberCardFrom, numberCardTo);
  if (result.otp == inputOtp) {
    return res.status(201).json({
      otpVerified: true,
    });
  } else {
    return res.status(201).json({
      otpVerified: false,
    });
  }
};
