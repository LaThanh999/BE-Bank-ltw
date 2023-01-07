const danhSachNguoGuiModel = require('../models/danhSachNguoiNo.model');
const notificationsModel = require('../models/notifications.model');
const moment = require('moment');

exports.getAll = async (req, res) => {
  const result = await danhSachNguoGuiModel.getAll();
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await danhSachNguoGuiModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't find " });
  }
  res.json(result);
};

exports.getByNumberCard = async (req, res) => {
  const numberCard = +req.body.numberCard;
  const type = +req.body.type;

  if (!numberCard || !type) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await danhSachNguoGuiModel.getFindByNumberCard(numberCard, type);
  if (!result) {
    return res.json({ Message: "Can't find " });
  }
  res.json(result);
};

exports.insert = async (req, res) => {
  const danhSachNguoiNo = req.body;
  // const { soTienChuyen, maTaiKhoanChuNo, maTaiKhoanNguoiNo } = danhSachNguoiNo;
  danhSachNguoiNo.create_at = moment().format('YYYY-MM-DD HH:mm:ss').toString();
  // await notificationsModel.add({
  //   numberCardForm: maTaiKhoanChuNo,
  //   numberCardTo: maTaiKhoanNguoiNo,
  //   message: `Thanh toán nhắc nợ ${soTienChuyen} VND`,
  //   type: 0,
  //   isSeen: 0,
  // });
  const result = await danhSachNguoGuiModel.addOwe(danhSachNguoiNo);
  danhSachNguoiNo.id = result;
  res.status(201).json(danhSachNguoiNo);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const danhSachNguoiNo = req.body;
  const result = await danhSachNguoGuiModel.update(id, danhSachNguoiNo);
  if (result === 0) {
    return res.status(304).end();
  }
  res.json(danhSachNguoiNo);
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await danhSachNguoGuiModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};
