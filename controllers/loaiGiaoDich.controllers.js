const loaiGiaoDichModel = require('../models/loaiGiaoDich.model');

exports.getAll = async (req, res) => {
  const result = await loaiGiaoDichModel.getAll();
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await loaiGiaoDichModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't find " });
  }
  res.json(result);
};

exports.insert = async (req, res) => {
  const loaiGiaoDich = req.body;
  const result = await loaiGiaoDichModel.add(loaiGiaoDich);
  loaiGiaoDich.id = result;
  res.status(201).json(loaiGiaoDich);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const loaiGiaoDich = req.body;
  const result = await loaiGiaoDichModel.update(id, loaiGiaoDich);
  if (result === 0) {
    return res.status(304).end();
  }
  res.json(loaiGiaoDich);
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await loaiGiaoDichModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};
