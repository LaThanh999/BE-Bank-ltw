const loaiTaiKhoanModel = require('../models/loaiTaiKhoan.model');

exports.getAll = async (req, res) => {
  const result = await loaiTaiKhoanModel.getAll();
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await loaiTaiKhoanModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't find " });
  }
  res.json(result);
};

exports.insert = async (req, res) => {
  const loaiTaiKhoan = req.body;
  const result = await loaiTaiKhoanModel.add(loaiTaiKhoan);
  loaiTaiKhoan.id = result;
  res.status(201).json(loaiTaiKhoan);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const loaiTaiKhoan = req.body;
  const result = await loaiTaiKhoanModel.update(id, loaiTaiKhoan);
  if (result === 0) {
    return res.status(304).end();
  }
  res.json(loaiTaiKhoan);
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await loaiTaiKhoanModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};
