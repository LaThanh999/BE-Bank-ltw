const historyModel = require('../models/history.model');

exports.getAll = async (req, res) => {
  const result = await historyModel.getAll();
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;

  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }

  const result = await historyModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't not find customer" });
  }

  res.json(result);
};
exports.getByAccountNumber = async (req, res) => {
  let accountNumber = req.params.accountNumber;
  if (accountNumber === '' || accountNumber === null) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await historyModel.getByAccountNumber(accountNumber);
  if (!result) {
    return res.json({ Message: "Can't find" });
  }
  if (result.length !== 0) {
    result.forEach((item) => {
      if (item.taiKhoanNguoiGui === accountNumber) {
        item.type = 1;
      }
      if (item.taiKhoanNguoiNhan === accountNumber) {
        item.type = 2;
      }
      // print(temp)
    });
  }
  res.json(result);
};
exports.receiveMoney = async (req, res) => {
  let accountNumber = req.params.accountNumber;
  if (accountNumber === '' || accountNumber === null) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await historyModel.receiveMoney(accountNumber);
  if (!result) {
    return res.json({ Message: "Can't find" });
  }
  res.json(result);
};

exports.insert = async (req, res) => {
  const lichSuGiaoDich = req.body;
  const result = await historyModel.add(lichSuGiaoDich);
  lichSuGiaoDich.id = result;
  res.status(201).json(lichSuGiaoDich);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const lichSuGiaoDich = req.body;
  const result = await historyModel.update(id, lichSuGiaoDich);
  if (result === 0) {
    return res.status(304).end();
  }
  res.json(lichSuGiaoDich);
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await historyModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove  successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};
