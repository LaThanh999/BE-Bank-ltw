const danhSachNguoGuiModel = require('../models/danhSachNguoiNo.model');

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

exports.insert = async (req, res) => {
  const danhSachNguoiNo = req.body;
  const result = await danhSachNguoGuiModel.add(danhSachNguoiNo);
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
