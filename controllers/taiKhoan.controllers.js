const taiKhoanModel = require('../models/taiKhoan.model');
const crypto = require("crypto");
exports.getAll = async (req, res) => {
  const result = await taiKhoanModel.getAll();
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await taiKhoanModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't not find customer" });
  }
  res.json(result);
};

exports.insert = async (req, res) => {
  const taiKhoan = req.body;
  let generated_hash = crypto.createHash("md5").update(taiKhoan['password']).digest("hex");
  taiKhoan['password'] = generated_hash;
  const result = await taiKhoanModel.add(taiKhoan);
  taiKhoan.id = result;
  res.status(201).json(taiKhoan);
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
    res.json({ Message: 'Remove customer successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};
