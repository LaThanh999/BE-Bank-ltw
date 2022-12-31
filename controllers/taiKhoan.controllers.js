const taiKhoanModel = require('../models/taiKhoan.model');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.getAll = async (req, res) => {
  const result = await taiKhoanModel.getAll();
  res.json(result);
};

exports.getByNumberCard = async (req, res) => {
  const numberCard = +req.params.numberCard || 0;
  if (numberCard === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanModel.getFindByNumberCard(numberCard);
  if (!result) {
    return res.json({ Message: "Can't find " });
  }
  res.json(result);
};

exports.getByNumberCardAndBankId = async (req, res) => {
  const numberCard = +req.body.numberCard;
  const bankId = +req.body.bankId;
  if (!numberCard || !bankId) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanModel.getFindByNumberCardAndBankId(numberCard, bankId);
  if (!result) {
    return res.json({ Message: "Can't find " });
  }
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't find " });
  }
  res.json(result);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const taiKhoan = req.body;
  const result = await taiKhoanModel.update(id, taiKhoan);
  if (result === 0) {
    return res.status(304).end();
  }
  res.json(taiKhoan);
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};

exports.register = async (req, res) => {
  const user = req.body;
  user.matKhau = bcrypt.hashSync(user.matKhau, 10);
  const temp = await taiKhoanModel.getWithUsernameOrEmail(user.taiKhoan);
  if (temp) {
    res.status(409).json({ message: 'Bạn đã đăng ký rồi' });
  }
  const result = await taiKhoanModel.add(user);
  user.id = result[0];
  res.status(201).json(user);
};

exports.insert = async (req, res) => {
  const customer = req.body;
  const result = await taiKhoanModel.add(customer);
  customer.customer_id = result;
  res.status(201).json(customer);
};

exports.getNumberMoney = async (req, res) => {
  const id = +req.params.id || 0;
  const result = await taiKhoanModel.getNumberMoneyWithId(id);
  res.status(201).json(result);
};
