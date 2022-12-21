const nganHangDoiTacModel = require('../models/nganHangDoiTac.model');

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
