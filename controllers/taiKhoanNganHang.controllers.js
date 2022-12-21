const taiKhoanNganHangModel = require('../models/taiKhoanNganHang.model');

exports.getAll = async (req, res) => {
  const result = await taiKhoanNganHangModel.getAll();
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanNganHangModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't find" });
  }
  res.json(result);
};

exports.insert = async (req, res) => {
  const taiKhoanNganHang = req.body;
  const result = await taiKhoanNganHangModel.add(taiKhoanNganHang);
  taiKhoanNganHang.id = result;
  res.status(201).json(taiKhoanNganHang);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const taiKhoanNganHang = req.body;
  const result = await taiKhoanNganHangModel.update(id, taiKhoanNganHang);
  if (result === 0) {
    return res.status(304).end();
  }
  res.json(taiKhoanNganHang);
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanNganHangModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};
