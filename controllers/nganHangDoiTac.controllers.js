const nganHangDoiTacModel = require('../models/nganHangDoiTac.model');
const taiKhoanModel = require('../models/taiKhoan.model');
const taiKhoanNganHangModel = require('../models/taiKhoanNganHang.model');
const historyModel = require('../models/history.model');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const constant = require('../constants/common');

exports.getAll = async (req, res) => {
  const result = await nganHangDoiTacModel.getAll();
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await nganHangDoiTacModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't find " });
  }
  res.json(result);
};

exports.insert = async (req, res) => {
  const nganHangDoiTac = req.body;
  const result = await nganHangDoiTacModel.add(nganHangDoiTac);
  nganHangDoiTac.id = result;
  res.status(201).json(nganHangDoiTac);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const nganHangDoiTac = req.body;
  const result = await nganHangDoiTacModel.update(id, nganHangDoiTac);
  if (result === 0) {
    return res.status(304).end();
  }
  res.json(nganHangDoiTac);
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await nganHangDoiTacModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};

exports.connectBankPublic = async (req, res) => {
  const { nameBank } = req.body;
  const result = await nganHangDoiTacModel.add({
    tenNganHang: nameBank,
  });
  nganHangDoiTac.id = result;
  res.status(201).json(nganHangDoiTac);
};

exports.getPermissionConnectBank = async (req, res) => {
  try {
    const privateKey = fs.readFileSync(path.join(__dirname, 'keys', 'rsa.key'), 'utf8');
    const publicKey = fs.readFileSync(path.join(__dirname, 'keys', 'rsa.key.pub'), 'utf8');
    const token = jwt.sign({}, privateKey, { algorithm: 'RS256', expiresIn: 3 * 60 });
    res.status(201).json({
      token,
      publicKey,
    });
  } catch (error) {
    return console.log('err', error);
  }
};

exports.getInfoWithNumberCard = async (req, res) => {
  try {
    const { numberCard } = req.body;
    const result = await taiKhoanModel.getFindByNumberCard(numberCard);
    res.status(201).json({
      name: result.hoTen,
    });
  } catch (error) {
    return console.log('err', error);
  }
};

exports.transferMoney = async (req, res) => {
  try {
    const { numberCard, numberMoney, numberCardFrom, content } = req.body;
    console.log({ numberCard, numberMoney, numberCardFrom, content });
    const taiKhoan = await taiKhoanNganHangModel.getFindByAccountNumber(numberCard);
    if (taiKhoan.id) {
      await taiKhoanNganHangModel.updateAccount(taiKhoan.id, +taiKhoan.soDu + +numberMoney);

      //////////////  Add lịch sử giao dịch  //////////////
      let date_ob = new Date();
      // current date
      let date = ('0' + date_ob.getDate()).slice(-2);
      // current month
      let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
      // current year
      let year = date_ob.getFullYear();
      // current minutes
      let minutes = date_ob.getMinutes();
      // Tạo mã giao dịch
      let number = parseInt(year + month + date + minutes + '') || 0;
      let mts = moment().unix() + number;
      let maGiaoDich = mts.toString();

      let ngayGioGiaoDich = moment(date_ob).format('YYYY-MM-DD HH:mm:ss');

      var data = {
        maGiaoDich: maGiaoDich,
        taiKhoanNguoiNhan: numberCard,
        taiKhoanNguoiGui: numberCardFrom,
        soTienChuyen: numberMoney,
        tienThucNhan: numberMoney,
        phiGiaoDich: 10000,
        noiDung: content,
        idNganHangNhan: constant.ID_BANK_LTW,
        idNganHangGui: 5,
        idLoaiGiaoDich: 2,
        ngayGioGiaoDich: ngayGioGiaoDich,
        create_at: ngayGioGiaoDich,
      };
      await historyModel.add(data);
      res.status(201).json({
        status: 1,
        message: 'Giao dịch thành công',
      });
    } else {
      res.status(401).json({
        status: 2,
        message: 'Giao dịch thất bại',
      });
    }
  } catch (error) {
    console.log('error', error);
    res.status(401).json({
      status: 2,
      message: 'Giao dịch thất bại',
    });
    return console.log('err', error);
  }
};
