const nganHangDoiTacModel = require('../models/nganHangDoiTac.model');
const taiKhoanModel = require('../models/taiKhoan.model');
const taiKhoanNganHangModel = require('../models/taiKhoanNganHang.model');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

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
    const { numberCard, numberMoney } = req.body;
    const taiKhoan = await taiKhoanNganHangModel.getFindByAccountNumber(numberCard);
    if (taiKhoan.id) {
      await taiKhoanNganHangModel.updateAccount(taiKhoan.id, +taiKhoan.soDu + +numberMoney);
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
    res.status(401).json({
      status: 2,
      message: 'Giao dịch thất bại',
    });
    return console.log('err', error);
  }
};
