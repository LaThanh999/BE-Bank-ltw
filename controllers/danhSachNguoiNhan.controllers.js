const danhSachNguoiNhanModel = require('../models/danhSachNguoiNhan.model');

exports.getAll = async (req, res) => {
  const result = await danhSachNguoiNhanModel.getAll();
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await danhSachNguoiNhanModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't not find customer" });
  }
  res.json(result);
};

exports.insert = async (req, res) => {
  const danhSachNguoiNhan = req.body;
  const result = await danhSachNguoiNhanModel.add(danhSachNguoiNhan);
  danhSachNguoiNhan.id = result;
  res.status(201).json(danhSachNguoiNhan);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const danhSachNguoiNhan = req.body;
  const result = await danhSachNguoiNhanModel.update(id, danhSachNguoiNhan);
  if (result === 0) {
    return res.status(304).end();
  }
  res.json(danhSachNguoiNhan);
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await danhSachNguoiNhanModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove customer successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};
