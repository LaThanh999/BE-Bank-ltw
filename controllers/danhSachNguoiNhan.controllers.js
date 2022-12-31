const danhSachNguoiNhanModel = require('../models/danhSachNguoiNhan.model');

exports.getAll = async (req, res) => {
  const result = await danhSachNguoiNhanModel.getAll();
  res.json(result);
};

exports.getByAccountNumber = async (req, res) => {
  let accountNumber = req.params.accountNumber;
  if (accountNumber === '' || accountNumber === null) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await danhSachNguoiNhanModel.getByAccountNumber(accountNumber);
  if (!result) {
    return res.json({ Message: "Can't find" });
  }
  res.json(result);
};

exports.getByAccountNumberUser = async (req, res) => {
  let accountFrom = req.body.accountFrom;
  let accountTo = req.body.accountTo;
  if (!accountFrom || !accountTo) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await danhSachNguoiNhanModel.getByAccountNumberUser(accountFrom, accountTo);
  if (!result) {
    return res.json({ Message: "Can't find" });
  }
  res.json(result);
};

exports.insert = async (req, res) => {
  const danhSachNguoiNhan = req.body;

  const result = await danhSachNguoiNhanModel.add(danhSachNguoiNhan);
  danhSachNguoiNhan.id = result;
  return res.status(201).json(danhSachNguoiNhan);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const danhSachNguoiNhan = req.body;
  const result = await danhSachNguoiNhanModel.update(id, danhSachNguoiNhan);
  if (result === 0) {
    return res.status(304).json({ Message: 'Update failed', Status: 4 });
  }
  res.json({ Message: 'Update successfully', Status: 2 });
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await danhSachNguoiNhanModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove successfully', Status: 2 });
  } else {
    return res.json({ Message: 'Please check input', Status: 4 });
  }
};
